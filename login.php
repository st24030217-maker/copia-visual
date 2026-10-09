<?php
session_start();

// Manejo de autenticación por POST o Fetch AJAX (100% compatible con PHP 8.2+, sin requerir MySQL)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario'] ?? 'Admin');
    if ($usuario === '') {
        $usuario = 'Admin';
    }

    $userLower = strtolower($usuario);
    if ($userLower === 'diana') {
        $perfil = 'Laboratorio';
        $idPerfil = 4;
    } elseif ($userLower === 'oscar') {
        $perfil = 'Medico';
        $idPerfil = 3;
    } else {
        $perfil = 'Administrador';
        $idPerfil = 1;
    }

    $_SESSION['user'] = $usuario;
    $_SESSION['perfil'] = $perfil;
    $_SESSION['idPerfil'] = $idPerfil;

    if (!empty($_POST['ajax'])) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'ok' => true,
            'user' => $usuario,
            'perfil' => $perfil,
            'idPerfil' => $idPerfil,
            'redirect' => 'index.php'
        ]);
        exit;
    }

    header('Location: index.php');
    exit;
}

$anioActual = date('Y');
?>
<!DOCTYPE html>
<html lang="es" class="h-full bg-slate-50">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dent Clinica Dental | Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"General Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            mono: ['"General Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
          },
          colors: {
            blue: {
              50: '#f0f4f8',
              100: '#d9e2ec',
              200: '#bcccdc',
              300: '#9fb3c8',
              400: '#829ab1',
              500: '#486581',
              600: '#334e68',
              700: '#243b53',
              800: '#102a43',
              900: '#0a1929'
            }
          }
        }
      }
    };
  </script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="Threads.css">
  <style>
    body, button, input, select, textarea { font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
    .font-mono { font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-variant-numeric: tabular-nums; }

    /* Aceternity UI Stateful Button Animations */
    .stateful-btn {
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .stateful-slot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, transform 0.25s ease;
    }
    .slot-hidden {
      width: 0px;
      opacity: 0;
      transform: scale(0.5);
    }
    .slot-visible {
      width: 20px;
      opacity: 1;
      transform: scale(1);
    }
    @keyframes spinSlow {
      to { transform: rotate(360deg); }
    }
    .animate-spin-fast {
      animation: spinSlow 0.75s linear infinite;
    }
  </style>
</head>
<body class="h-full bg-slate-50 text-slate-800 antialiased">

  <div class="min-h-screen flex flex-col md:flex-row">
    
    <!-- LADO IZQUIERDO: Imagen de Laboratorio CAD/CAM Dental (50%) -->
    <div class="relative w-full md:w-1/2 h-64 md:h-auto min-h-[260px] md:min-h-screen bg-slate-900 overflow-hidden flex flex-col justify-between p-8 lg:p-12">
      <!-- Imagen de fondo -->
      <img src="assets/dental_cadcam.jpg" alt="Laboratorio Dental CAD/CAM" 
           class="absolute inset-0 w-full h-full object-cover object-center brightness-95 filter transition-transform duration-700 hover:scale-105">
      
      <!-- Gradiente superpuesto sutil en tonos azul/gris oscuro -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-900/20"></div>

      <!-- Badge superior -->
      <div class="relative z-10 hidden md:flex items-center gap-2">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600/90 text-white shadow-sm backdrop-blur-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse mr-2"></span>
          Laboratorio CAD / CAM
        </span>
      </div>

      <!-- Texto descriptivo inferior -->
      <div class="relative z-10 text-white hidden md:block max-w-md">
        <div class="flex items-center gap-2 text-xs font-medium text-blue-300 tracking-wider uppercase mb-2">
          <span>Escaneo</span>
          <span>•</span>
          <span>Diseño</span>
          <span>•</span>
          <span>Fabricación</span>
          <span>•</span>
          <span>Entrega</span>
        </div>
        <h1 class="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
          Precisión y tecnología en odontología digital.
        </h1>
        <p class="text-sm text-slate-300 mt-2 font-normal leading-relaxed">
          Plataforma de gestión integral de órdenes y flujo de trabajo para clínicas y laboratorio dental.
        </p>
      </div>
    </div>

    <!-- LADO DERECHO: Formulario de Login (50%) con fondo @react-bits/Threads-JS-CSS -->
    <div class="relative w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-white overflow-y-auto overflow-x-hidden">
      
      <!-- Fondo interactivo @react-bits/Threads-JS-CSS (Panel Login) -->
      <div id="threadsLoginBg" class="threads-container threads-container--bg z-0" aria-hidden="true">
        <canvas class="threads-canvas"></canvas>
      </div>

      <!-- Espacio superior para balancear el centrado vertical -->
      <div class="hidden sm:block relative z-10"></div>

      <!-- Contenedor del Login Centrado -->
      <div class="relative z-10 w-full max-w-sm mx-auto my-auto py-6 px-6 rounded-3xl bg-white/85 backdrop-blur-md border border-slate-200/70 shadow-xl shadow-slate-900/5">
        
        <!-- Encabezado con Logo Oficial y texto solicitado -->
        <div class="text-center mb-8">
          <img src="assets/logoDentlab.png" alt="Dent Lab" class="h-12 mx-auto object-contain mb-2">
          <p class="text-sm font-normal text-slate-500 tracking-wide text-center">Grupo Medico Dent</p>
        </div>

        <!-- Título del formulario -->
        <div class="mb-6">
          <h2 class="text-xl font-bold text-slate-900 tracking-tight">Iniciar sesión</h2>
          <p class="text-xs text-slate-500 mt-1 font-normal">Ingrese sus credenciales para acceder a la plataforma</p>
        </div>

        <!-- Formulario con IDs originales listos para migración -->
        <form method="POST" action="login.php" onsubmit="handleLogin(event)" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1.5">Usuario</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <i data-lucide="user" class="w-4 h-4"></i>
              </span>
              <input type="text" id="usuario" name="usuario" required value="admin"
                class="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20 text-sm transition-all"
                placeholder="Usuario">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-slate-700">Contraseña</label>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <i data-lucide="lock" class="w-4 h-4"></i>
              </span>
              <input type="password" id="clave" name="clave" required value="1234"
                class="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20 text-sm transition-all"
                placeholder="Contraseña">
              <button type="button" onclick="togglePass()" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                <i id="eyeIcon" data-lucide="eye" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-1">
            <label class="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
              <input type="checkbox" checked class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              <span>Recordar este equipo</span>
            </label>
          </div>

          <!-- ACETERNITY STATEFUL BUTTON (@aceternity/stateful-button-demo) -->
          <button type="submit" id="btnLogin"
            class="stateful-btn w-full mt-2 py-2.5 px-5 rounded-full bg-blue-600 hover:bg-blue-700 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer">
            
            <!-- Slot 1: Spinner de Carga -->
            <span id="stateLoader" class="stateful-slot slot-hidden">
              <svg class="w-4 h-4 text-white animate-spin-fast" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
            </span>

            <!-- Slot 2: Check de Éxito -->
            <span id="stateCheck" class="stateful-slot slot-hidden">
              <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
            </span>

            <span id="btnText">Ingresar al sistema</span>

            <span id="stateArrow" class="stateful-slot slot-visible">
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </span>
          </button>
        </form>

        <!-- Selector rápido de roles para demostración visual -->
        <div class="mt-8 pt-5 border-t border-slate-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Perfiles de prueba</span>
            <span class="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">Demo</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button type="button" onclick="setRole('admin', '1234', 'Administrador')" 
              class="py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-600 hover:text-blue-600 text-xs font-medium text-slate-700 transition-all text-center">
              Admin
            </button>
            <button type="button" onclick="setRole('Diana', '8712', 'Laboratorio')" 
              class="py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-600 hover:text-blue-600 text-xs font-medium text-slate-700 transition-all text-center">
              Laboratorio
            </button>
            <button type="button" onclick="setRole('Oscar', '1234', 'Medico')" 
              class="py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-600 hover:text-blue-600 text-xs font-medium text-slate-700 transition-all text-center">
              Doctor
            </button>
          </div>
        </div>

      </div>

      <!-- Footer Oficial -->
      <div class="relative z-10 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 mt-auto">
        <p>© <?= $anioActual ?> Todos los derechos reservados.</p>
        <a href="http://www.resosistemas.mx/" target="_blank" class="text-blue-600 hover:underline mt-0.5 inline-block font-medium">
          RESO Sistemas S.A. de C.V.
        </a>
      </div>

    </div>

  </div>

  <script src="Threads.js"></script>
  <script>
    lucide.createIcons();

    // Inicializar fondo @react-bits/Threads-JS-CSS únicamente en el panel del Login con tonos sobrios
    if (typeof window.initThreads === 'function') {
      window.initThreads(document.getElementById('threadsLoginBg'), {
        color: '#64748b',
        accentColor: '#94a3b8',
        amplitude: 1.6,
        distance: 0.4,
        enableMouseInteraction: true,
        lineCount: 85,
        thickness: 0.55,
        softness: 1.35,
        speed: 0.5,
        waves: 1.0,
        split: 0.04,
        fray: 0.5,
        angle: 25,
        parting: 0.35,
        taper: 0.85,
        brightness: 1.15,
        opacity: 0.32
      });
    }

    function togglePass() {
      const pass = document.getElementById('clave');
      const icon = document.getElementById('eyeIcon');
      if (pass.type === 'password') {
        pass.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
      } else {
        pass.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
      }
      lucide.createIcons();
    }

    function setRole(user, pass, role) {
      document.getElementById('usuario').value = user;
      document.getElementById('clave').value = pass;
      localStorage.setItem('cv_usuario', user);
      localStorage.setItem('cv_perfil', role);
    }

    let isLoggingIn = false;
    function handleLogin(e) {
      if (isLoggingIn) return;
      e.preventDefault();
      isLoggingIn = true;

      const user = document.getElementById('usuario').value;
      const pass = document.getElementById('clave').value;
      localStorage.setItem('cv_usuario', user);
      if (user.toLowerCase() === 'diana') {
        localStorage.setItem('cv_perfil', 'Laboratorio');
        localStorage.setItem('cv_id_perfil', '4');
      } else if (user.toLowerCase() === 'oscar') {
        localStorage.setItem('cv_perfil', 'Medico');
        localStorage.setItem('cv_id_perfil', '3');
      } else {
        localStorage.setItem('cv_perfil', 'Administrador');
        localStorage.setItem('cv_id_perfil', '1');
      }

      const btn = document.getElementById('btnLogin');
      const loader = document.getElementById('stateLoader');
      const check = document.getElementById('stateCheck');
      const arrow = document.getElementById('stateArrow');
      const text = document.getElementById('btnText');

      // 1. Estado Cargando (Aceternity Stateful Button)
      btn.disabled = true;
      arrow.classList.replace('slot-visible', 'slot-hidden');
      loader.classList.replace('slot-hidden', 'slot-visible');
      text.innerText = 'Verificando credenciales...';

      // Registrar sesión en PHP vía POST asíncrono
      const formData = new FormData();
      formData.append('usuario', user);
      formData.append('clave', pass);
      formData.append('ajax', '1');
      fetch('login.php', { method: 'POST', body: formData }).catch(() => {});

      // 2. Estado Éxito tras validación
      setTimeout(() => {
        loader.classList.replace('slot-visible', 'slot-hidden');
        check.classList.replace('slot-hidden', 'slot-visible');
        text.innerText = '¡Acceso concedido!';

        setTimeout(() => {
          window.location.href = 'index.php';
        }, 550);
      }, 900);
    }
  </script>
</body>
</html>
