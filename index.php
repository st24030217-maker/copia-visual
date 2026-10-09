<?php
session_start();
$usuarioActual = htmlspecialchars($_SESSION['user'] ?? 'Admin', ENT_QUOTES, 'UTF-8');
$perfilActual  = htmlspecialchars($_SESSION['perfil'] ?? 'Administrador', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="es" class="h-full bg-slate-50">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dent Clinica Dental | Sistema de Laboratorio</title>
  <script src="tailwind.js"></script>
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
            },
            indigo: {
              50: '#f1f5f9',
              100: '#e2e8f0',
              200: '#cbd5e1',
              300: '#94a3b8',
              400: '#64748b',
              500: '#475569',
              600: '#334155',
              700: '#1e293b',
              800: '#0f172a',
              900: '#020617'
            },
            purple: {
              50: '#f3f4f6',
              100: '#e5e7eb',
              200: '#d1d5db',
              500: '#4b5563',
              600: '#374151',
              700: '#1f2937'
            },
            emerald: {
              50: '#f2f7f5',
              100: '#dcece6',
              200: '#b9d8cd',
              300: '#8ebdae',
              400: '#5e9c89',
              500: '#3d7a68',
              600: '#2f6353',
              700: '#244d40',
              800: '#1c3b32'
            },
            rose: {
              50: '#f9f2f2',
              100: '#efdada',
              200: '#dfb8b8',
              300: '#c78d8d',
              400: '#ab6666',
              500: '#8f4747',
              600: '#783838',
              700: '#5e2b2b',
              800: '#472121'
            },
            amber: {
              50: '#f9f6f0',
              100: '#efe6d5',
              200: '#dfd0b3',
              300: '#c8b087',
              400: '#af915f',
              500: '#917444',
              600: '#755c34',
              700: '#5c4728',
              800: '#45351e'
            }
          }
        }
      }
    };
  </script>
  <script src="lucide.js"></script>
  <script src="jsbarcode.js"></script>
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="ExpandableCard.css">
  <style>
    body, button, input, select, textarea { font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
    .font-mono { font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-variant-numeric: tabular-nums; }
    .table-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
    .table-scroll::-webkit-scrollbar-track { background: transparent; }
    .table-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

    /* Resaltado moderno y ejecutivo para órdenes prioritarias / internas (.row-yellow en proceso y .row-green en entrega) */
    .row-green {
      background: linear-gradient(90deg, rgba(209, 250, 229, 0.78) 0%, rgba(236, 253, 245, 0.45) 100%);
      box-shadow: inset 3.5px 0 0 #10b981;
      animation: pulse-priority-emerald 2.4s ease-in-out infinite alternate;
    }
    @keyframes pulse-priority-emerald {
      from { background-color: rgba(209, 250, 229, 0.48); }
      to   { background-color: rgba(167, 243, 208, 0.82); }
    }
    .row-green td {
      color: #064e3b !important;
      border-bottom-color: rgba(16, 185, 129, 0.16) !important;
    }
    .row-green a {
      color: #047857 !important;
      font-weight: 700;
    }

    .row-yellow {
      background: linear-gradient(90deg, rgba(254, 226, 226, 0.78) 0%, rgba(255, 241, 242, 0.45) 100%);
      box-shadow: inset 3.5px 0 0 #e11d48;
      animation: pulse-priority-rose 2.4s ease-in-out infinite alternate;
    }
    @keyframes pulse-priority-rose {
      from { background-color: rgba(254, 226, 226, 0.48); }
      to   { background-color: rgba(254, 205, 211, 0.82); }
    }
    .row-yellow td {
      color: #881337 !important;
      border-bottom-color: rgba(244, 63, 94, 0.15) !important;
    }
    .row-yellow a {
      color: #be123c !important;
      font-weight: 700;
    }

    /* Tablas compactas de las 4 etapas de inicio (Escaneo, Diseño, Fabricación, Entrega) */
    .stage-table th {
      background-color: #0f172a;
      color: #f8fafc;
      font-weight: 700;
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 7px 5px;
      position: sticky;
      top: 0;
      z-index: 10;
      white-space: nowrap;
    }
    .stage-table td {
      font-size: 11px;
      padding: 6px 5px;
      border-bottom: 1px solid #f1f5f9;
      white-space: nowrap;
    }

    /* Tabla general inferior (#tableOrdenes) */
    .general-table th {
      background-color: #0f172a;
      color: #f8fafc;
      font-weight: 700;
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 10px 10px;
      position: sticky;
      top: 0;
      z-index: 10;
      white-space: nowrap;
    }
    .general-table td {
      font-size: 12px;
      padding: 8px 10px;
      border-bottom: 1px solid #f1f5f9;
      white-space: nowrap;
    }

    /* Botones de acción modernos (.btnEtiqueta) */
    .btnEtiqueta {
      background: linear-gradient(135deg, #1e293b 0%, #334e68 100%);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #ffffff !important;
      border-radius: 8px;
      padding: 5px 9px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.14);
      transition: all 0.18s cubic-bezier(0.22, 1, 0.36, 1);
      cursor: pointer;
    }
    .btnEtiqueta:hover {
      background: linear-gradient(135deg, #0f172a 0%, #102a43 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.22);
    }
    .btnEtiqueta--ot {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    }
    .btnEtiqueta--ot:hover {
      background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    }
    .btnEtiqueta--doc {
      background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
    }
    .btnEtiqueta--doc:hover {
      background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
    }

    /* ===================================================================== */
    /* MÓDULO SUPERIOR ANIMADO (#userQuickModule) - Spring + Stagger + Glide */
    /* ===================================================================== */
    .qm-trigger {
      position: relative;
      transition:
        background-color 240ms ease,
        border-color 240ms ease,
        box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .qm-trigger:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px -4px rgba(15, 23, 42, 0.10);
    }
    .qm-trigger:active {
      transform: translateY(0) scale(0.97);
    }
    #userQuickModule[data-open="true"] .qm-trigger {
      background-color: #ffffff;
      border-color: #334e68;
      box-shadow: 0 0 0 3px rgba(51, 78, 104, 0.12), 0 8px 20px -4px rgba(15, 23, 42, 0.14);
    }
    .qm-trigger-badge {
      transition:
        transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1),
        background-color 240ms ease,
        box-shadow 240ms ease;
    }
    .qm-trigger:hover .qm-trigger-badge {
      transform: rotate(90deg) scale(1.06);
    }
    #userQuickModule[data-open="true"] .qm-trigger-badge {
      transform: rotate(180deg) scale(1.08);
      background-color: #1ABB9C;
      box-shadow: 0 0 12px rgba(26, 187, 156, 0.45);
    }
    .qm-chevron {
      transition: transform 360ms cubic-bezier(0.34, 1.56, 0.64, 1), color 200ms ease;
    }
    #userQuickModule[data-open="true"] .qm-chevron {
      transform: rotate(180deg);
      color: #0f172a;
    }

    /* Panel desplegable con efecto Spring 3D + Blur-to-Crisp */
    .qm-dropdown {
      transform-origin: top right;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(-10px) scale(0.92) perspective(700px) rotateX(-10deg);
      filter: blur(6px);
      transition:
        opacity 240ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 340ms cubic-bezier(0.34, 1.56, 0.64, 1),
        filter 260ms cubic-bezier(0.22, 1, 0.36, 1),
        visibility 240ms;
      will-change: transform, opacity, filter;
    }
    #userQuickModule[data-open="true"] .qm-dropdown {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateY(0) scale(1) perspective(700px) rotateX(0deg);
      filter: blur(0px);
    }

    /* Cascada escalonada (Stagger) para cada elemento del módulo */
    .qm-stagger {
      opacity: 0;
      transform: translateY(8px) translateX(6px) scale(0.97);
      transition:
        opacity 260ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
      transition-delay: 0ms;
    }
    #userQuickModule[data-open="true"] .qm-stagger {
      opacity: 1;
      transform: translateY(0) translateX(0) scale(1);
      transition-delay: calc(var(--stagger, 0) * 45ms + 35ms);
    }

    /* Indicador magnético deslizante detrás de la opción activa */
    .qm-hover-tracker {
      position: absolute;
      left: 6px;
      right: 6px;
      top: 0;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(90deg, rgba(241, 245, 249, 0.95) 0%, rgba(226, 232, 240, 0.55) 100%);
      opacity: 0;
      pointer-events: none;
      transform: translateY(0) scale(0.96);
      transition:
        transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
        height 220ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 180ms ease,
        background 200ms ease;
      z-index: 0;
    }
    .qm-hover-tracker[data-danger="true"] {
      background: linear-gradient(90deg, rgba(255, 228, 230, 0.85) 0%, rgba(255, 241, 242, 0.55) 100%);
    }

    /* Micro-animaciones de iconos por acción */
    .qm-item {
      position: relative;
      z-index: 1;
    }
    .qm-item-icon {
      transition: transform 340ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 220ms ease, color 220ms ease, box-shadow 220ms ease;
    }
    .qm-item:hover .qm-item-icon--gear {
      transform: rotate(120deg) scale(1.1);
      background-color: #1e293b;
      color: #ffffff;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
    }
    .qm-item:hover .qm-item-icon--perm {
      transform: scale(1.12) rotate(-8deg);
      background-color: #1e293b;
      color: #ffffff;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
    }
    .qm-item:hover .qm-item-icon--full {
      transform: scale(1.18);
      background-color: #1e293b;
      color: #ffffff;
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
    }
    .qm-item:hover .qm-item-icon--power {
      transform: translateY(-1.5px) scale(1.12);
      background-color: #e11d48;
      color: #ffffff;
      box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
    }
    .qm-item-arrow {
      opacity: 0;
      transform: translateX(-6px);
      transition: opacity 200ms ease, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .qm-item:hover .qm-item-arrow {
      opacity: 1;
      transform: translateX(0);
    }
  </style>
</head>
<body class="h-full bg-slate-50 text-slate-800 flex overflow-hidden antialiased">

  <?php include __DIR__ . '/menus.php'; ?>

  <!-- ========================================== -->
  <!-- CONTENIDO DERECHO (Navbar + Pantalla DENT) -->
  <!-- ========================================== -->
  <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
    
    <!-- Top Navbar -->
    <header class="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
      <div class="flex items-center gap-4">
        <button onclick="toggleSidebar()" class="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors">
          <i data-lucide="menu" class="w-4 h-4"></i>
        </button>
        <span id="topModuleTitle" class="text-sm font-semibold text-slate-800">Centro de Operaciones Dentales • Producción CAD/CAM</span>
      </div>

      <div class="flex items-center gap-3">
        <!-- Módulo Unificado Animado de Usuario y Acciones Rápidas (Sintetiza los 4 botones) -->
        <div class="relative select-none" id="userQuickModule" data-open="false">
          <button type="button" id="userQuickTrigger" onclick="toggleSettingsDropdown(event)" class="qm-trigger flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/90 cursor-pointer">
            <span class="qm-trigger-badge w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
            </span>
            <div class="text-left leading-tight">
              <div class="flex items-center gap-1.5">
                <span class="text-xs font-bold text-slate-800 block" id="topUserLabel"><?= $usuarioActual ?></span>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span class="text-[10px] font-medium text-slate-400 block">Panel de control</span>
            </div>
            <i data-lucide="chevron-down" id="userModuleChevron" class="qm-chevron w-3.5 h-3.5 text-slate-400 ml-0.5"></i>
          </button>

          <!-- Panel Desplegable Animado con Spring + Stagger + Magnetic Tracker -->
          <div id="settingsDropdown" class="qm-dropdown absolute right-0 mt-2.5 w-64 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xl p-1.5 z-50 text-xs overflow-hidden" onmouseleave="hideQmTracker()">
            <!-- Indicador magnético deslizante -->
            <div id="qmHoverTracker" class="qm-hover-tracker"></div>

            <div class="qm-stagger relative z-10 px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between" style="--stagger: 0;">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Acciones del Sistema</span>
              <span id="topPerfilBadge" class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[10px]"><?= $perfilActual ?></span>
            </div>

            <a href="#" onmouseenter="moveQmTracker(this, false)" onclick="closeSettingsDropdown(); openModule('configuracion'); return false;" class="qm-item qm-stagger flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 transition-colors" style="--stagger: 1;">
              <div class="flex items-center gap-3">
                <span class="qm-item-icon qm-item-icon--gear w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <i data-lucide="settings" class="w-4 h-4"></i>
                </span>
                <div>
                  <p class="font-bold text-slate-800 leading-none">Configuraciones</p>
                  <p class="text-[10px] text-slate-400 mt-0.5">Parámetros del laboratorio</p>
                </div>
              </div>
              <i data-lucide="chevron-right" class="qm-item-arrow w-3.5 h-3.5 text-slate-400"></i>
            </a>

            <a href="#" onmouseenter="moveQmTracker(this, false)" onclick="closeSettingsDropdown(); openModule('permisos'); return false;" class="qm-item qm-stagger flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 transition-colors" style="--stagger: 2;">
              <div class="flex items-center gap-3">
                <span class="qm-item-icon qm-item-icon--perm w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <i data-lucide="eye-off" class="w-4 h-4"></i>
                </span>
                <div>
                  <p class="font-bold text-slate-800 leading-none">Permisos y Accesos</p>
                  <p class="text-[10px] text-slate-400 mt-0.5">Roles y visibilidad de módulos</p>
                </div>
              </div>
              <i data-lucide="chevron-right" class="qm-item-arrow w-3.5 h-3.5 text-slate-400"></i>
            </a>

            <a href="#" onmouseenter="moveQmTracker(this, false)" onclick="closeSettingsDropdown(); toggleFullScreen(); return false;" class="qm-item qm-stagger flex items-center justify-between px-2.5 py-2 rounded-xl text-slate-700 transition-colors" style="--stagger: 3;">
              <div class="flex items-center gap-3">
                <span class="qm-item-icon qm-item-icon--full w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <i data-lucide="maximize" class="w-4 h-4"></i>
                </span>
                <div>
                  <p class="font-bold text-slate-800 leading-none">Pantalla Completa</p>
                  <p class="text-[10px] text-slate-400 mt-0.5">Expandir área de trabajo</p>
                </div>
              </div>
              <i data-lucide="chevron-right" class="qm-item-arrow w-3.5 h-3.5 text-slate-400"></i>
            </a>

            <div class="qm-stagger relative z-10 my-1 border-t border-slate-100" style="--stagger: 4;"></div>

            <a href="logout.php" onmouseenter="moveQmTracker(this, true)" onclick="if(location.hostname.includes('github.io')||location.hostname.includes('vercel.app')||location.pathname.endsWith('.html')){localStorage.removeItem('cv_usuario');location.href='login.html';return false;}" class="qm-item qm-stagger flex items-center justify-between px-2.5 py-2 rounded-xl text-rose-600 transition-colors" style="--stagger: 5;">
              <div class="flex items-center gap-3">
                <span class="qm-item-icon qm-item-icon--power w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <i data-lucide="power" class="w-4 h-4"></i>
                </span>
                <div>
                  <p class="font-bold text-rose-700 leading-none">Cerrar Sesión</p>
                  <p class="text-[10px] text-rose-400 mt-0.5">Salir de la cuenta actual</p>
                </div>
              </div>
              <i data-lucide="chevron-right" class="qm-item-arrow w-3.5 h-3.5 text-rose-400"></i>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Área Principal de Trabajo -->
    <main class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">

      <!-- Contenedor Dinámico para los 36 Módulos del Menú Lateral y OrdenTrabajo.php -->
      <div id="section-dynamic" class="hidden space-y-4"></div>

      <!-- ===================================================================== -->
      <!-- PANTALLA PRINCIPAL DE INICIO: MISMO DISEÑO DE DENT DEMO ACTUALIZADO   -->
      <!-- 1. Barra de Botones (Calendario, Canceladas, Pendientes, Hora, +, ↻)  -->
      <!-- 2. Los 4 Cuadros con sus Tablas (Escaneo, Diseño, Fabricación, Entrega)-->
      <!-- 3. Tabla General de Órdenes abajo siempre visible con Buscador        -->
      <!-- ===================================================================== -->
      <div id="section-inicio" class="space-y-4">

        <!-- 1. BARRA SUPERIOR DE CONTROLES Y RELOJ (Idéntica a index.php L79-110 de DENT DEMO) -->
        <div class="bg-slate-900 text-white p-3 rounded-2xl shadow-sm border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <!-- Calendario -->
            <button onclick="openModule('calendario');" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-sm">
              <i data-lucide="calendar" class="w-4 h-4"></i>
              <span>Calendario</span>
            </button>

            <!-- Órdenes canceladas -->
            <button onclick="openModalCanceladas();" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2">
              <i data-lucide="ban" class="w-4 h-4 text-rose-400"></i>
              <span>Ordenes canceladas</span>
              <span class="px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold font-mono" id="NumberOrdenCanceladas">646</span>
            </button>

            <!-- Órdenes Pendientes de pago -->
            <button onclick="openModalPendientes();" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2">
              <i data-lucide="bell" class="w-4 h-4 text-amber-400"></i>
              <span>Ordenes Pendientes de pago</span>
              <span class="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold font-mono" id="NumberOrden">0</span>
            </button>
          </div>

          <div class="flex items-center gap-4 ml-auto">
            <!-- Hora Actual -->
            <div class="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-blue-400"></i>
              <span class="text-xs font-mono font-bold text-white tracking-wider" id="HoraActual">08:05:22</span>
            </div>

            <!-- Botones Recargar y Nueva Orden (+) -->
            <div class="flex items-center gap-1.5">
              <button onclick="refreshData()" class="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm" title="Actualizar Tablas">
                <i data-lucide="refresh-cw" class="w-4 h-4" id="refreshIcon"></i>
              </button>
              <button onclick="openSimpleAddModal('lista-ordenes')" class="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm" title="Agregar Nueva Orden">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- 2. LOS 4 CUADROS DE ETAPA CON TABLAS (Escaneo, Diseño, Fabricación, Entrega) -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">

          <!-- CUADRO 1: ESCANEO -->
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
            <div class="px-3.5 py-2.5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <i data-lucide="video" class="w-3.5 h-3.5"></i>
                </span>
                <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Escaneo</h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80" id="badgeCountEscaneo">4</span>
            </div>
            <div class="table-scroll overflow-y-auto overflow-x-hidden" style="height: 28vh;">
              <table class="w-full text-center border-collapse stage-table">
                <thead>
                  <tr>
                    <th>OT</th>
                    <th>PROD</th>
                    <th>UNI</th>
                    <th>DOCTOR</th>
                    <th>ENT</th>
                  </tr>
                </thead>
                <tbody id="tbodyStageEscaneo" class="divide-y divide-slate-100 text-slate-700"></tbody>
              </table>
            </div>
          </div>

          <!-- CUADRO 2: DISEÑO -->
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
            <div class="px-3.5 py-2.5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <i data-lucide="monitor" class="w-3.5 h-3.5"></i>
                </span>
                <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Diseño</h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80" id="badgeCountDiseno">18</span>
            </div>
            <div class="table-scroll overflow-y-auto overflow-x-hidden" style="height: 28vh;">
              <table class="w-full text-center border-collapse stage-table">
                <thead>
                  <tr>
                    <th>OT</th>
                    <th>PROD</th>
                    <th>UNI</th>
                    <th>DOCTOR</th>
                    <th>ENT</th>
                  </tr>
                </thead>
                <tbody id="tbodyStageDiseno" class="divide-y divide-slate-100 text-slate-700"></tbody>
              </table>
            </div>
          </div>

          <!-- CUADRO 3: FABRICACIÓN -->
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
            <div class="px-3.5 py-2.5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
                </span>
                <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Fabricación</h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80" id="badgeCountFabricacion">7</span>
            </div>
            <div class="table-scroll overflow-y-auto overflow-x-hidden" style="height: 28vh;">
              <table class="w-full text-center border-collapse stage-table">
                <thead>
                  <tr>
                    <th>OT</th>
                    <th>PROD</th>
                    <th>UNI</th>
                    <th>DOCTOR</th>
                    <th>ENT</th>
                  </tr>
                </thead>
                <tbody id="tbodyStageFabricacion" class="divide-y divide-slate-100 text-slate-700"></tbody>
              </table>
            </div>
          </div>

          <!-- CUADRO 4: ENTREGA -->
          <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
            <div class="px-3.5 py-2.5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
                  <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                </span>
                <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Entrega</h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80" id="badgeCountEntrega">6</span>
            </div>
            <div class="table-scroll overflow-y-auto overflow-x-hidden" style="height: 28vh;">
              <table class="w-full text-center border-collapse stage-table">
                <thead>
                  <tr>
                    <th>OT</th>
                    <th>PROD</th>
                    <th>UNI</th>
                    <th>DOCTOR</th>
                    <th>ENT</th>
                  </tr>
                </thead>
                <tbody id="tbodyStageEntrega" class="divide-y divide-slate-100 text-slate-700"></tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- 3. TABLA GENERAL DE ÓRDENES SIEMPRE VISIBLE ABAJO (TableOrdenes.php) -->
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
          
          <!-- Buscador centrado y Paginación igual que en DENT DEMO -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-2 w-full sm:max-w-xl mx-auto">
              <input type="text" id="nptBuscar" onkeyup="buscarEnTabla();" placeholder="Introduzca un dato exacto de la orden a buscar"
                class="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900 transition-all text-center">
              <button type="button" onclick="buscarEnTabla()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm">
                <i data-lucide="search" class="w-3.5 h-3.5"></i>
                <span>Buscar</span>
              </button>
            </div>

            <!-- Paginación « 1 2 » -->
            <div class="inline-flex rounded-xl border border-slate-200 overflow-hidden text-xs font-semibold shrink-0">
              <button onclick="cambiarPaginaOrdenes(1)" class="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border-r border-slate-200">«</button>
              <button id="pageBtn1" onclick="cambiarPaginaOrdenes(1)" class="px-3 py-1.5 bg-blue-600 text-white font-bold border-r border-slate-200">1</button>
              <button id="pageBtn2" onclick="cambiarPaginaOrdenes(2)" class="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border-r border-slate-200">2</button>
              <button onclick="cambiarPaginaOrdenes(2)" class="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600">»</button>
            </div>
          </div>

          <!-- Tabla General con las 12 Columnas Exactas de DENT DEMO (ET, OT, DOC, FOLIO, ENTREGA, ESTADO, PRODUCTO, DOCTOR, PACIENTE, UNIDADES, LIB PROD, MONTO) -->
          <div class="table-scroll overflow-x-auto rounded-xl border border-slate-200" style="max-height: 36vh;">
            <table class="w-full text-center border-collapse general-table" id="tableOrdenesGral">
              <thead>
                <tr>
                  <th>ET</th>
                  <th>OT</th>
                  <th>DOC</th>
                  <th>FOLIO</th>
                  <th>ENTREGA</th>
                  <th>ESTADO</th>
                  <th>PRODUCTO</th>
                  <th>DOCTOR</th>
                  <th>PACIENTE</th>
                  <th>UNIDADES</th>
                  <th>LIB PROD</th>
                  <th>MONTO</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700" id="tbodyGeneralOrdenes"></tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: ETIQUETA CON CÓDIGO DE BARRAS (Etiqueta() de DENT DEMO)            -->
  <!-- ========================================================================= -->
  <div id="modalEtiqueta" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-2xl overflow-hidden">
      <div class="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="barcode" class="w-4 h-4 text-blue-400"></i>
          <h4 class="text-sm font-bold">Etiqueta de Orden de Trabajo</h4>
        </div>
        <button onclick="document.getElementById('modalEtiqueta').classList.add('hidden')" class="p-1 text-slate-400 hover:text-white">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div class="p-5 text-center space-y-2 text-xs">
        <p id="etiquetaDoctor" class="font-bold text-slate-900 text-sm"></p>
        <p id="etiquetaPaciente" class="text-slate-600 font-medium"></p>
        <p id="etiquetaEntrega" class="font-mono text-slate-500 text-[11px]"></p>
        <div class="py-3 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-200 my-2">
          <svg id="barcode"></svg>
          <span id="etiquetaFolioTexto" class="font-mono font-bold text-xs text-slate-800 mt-1"></span>
        </div>
        <div class="pt-2 flex justify-end gap-2">
          <button onclick="document.getElementById('modalEtiqueta').classList.add('hidden')" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50">Cerrar</button>
          <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-sm">
            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
            <span>Imprimir Etiqueta</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: HOJA DE ORDEN DE TRABAJO RÁPIDA                                    -->
  <!-- ========================================================================= -->
  <div id="modalDigitalCard" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
      <div class="p-5 bg-slate-900 text-white relative flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="assets/logoDentlab.png" alt="Dent Lab" class="h-6 w-auto object-contain brightness-0 invert opacity-90">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-bold font-mono tracking-tight text-white" id="dcOrderNum">#OT-30596</h3>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-600 text-white font-bold">ORDEN DE TRABAJO</span>
            </div>
            <p class="text-xs text-blue-300 font-medium" id="dcTreatment">Corona Zirconio</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right hidden sm:block">
            <span class="text-[10px] text-slate-400 uppercase tracking-wider block">Entrega Solicitada</span>
            <span class="text-xs font-mono font-bold text-white" id="dcDeliveryDate">28/09/2026</span>
          </div>
          <button onclick="closeDigitalCard()" class="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
        <div class="p-5 space-y-4 flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">Progreso de la Orden</span>
            <div class="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold mb-4">
              <div class="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <i data-lucide="check" class="w-3.5 h-3.5 mx-auto mb-1"></i>
                <span>Escaneo</span>
              </div>
              <div class="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <i data-lucide="check" class="w-3.5 h-3.5 mx-auto mb-1"></i>
                <span>Diseño</span>
              </div>
              <div class="p-2 rounded-xl bg-blue-600 text-white shadow-sm">
                <i data-lucide="settings" class="w-3.5 h-3.5 mx-auto mb-1 animate-spin"></i>
                <span>Fabricación</span>
              </div>
              <div class="p-2 rounded-xl bg-slate-100 text-slate-400 border border-slate-200">
                <i data-lucide="truck" class="w-3.5 h-3.5 mx-auto mb-1"></i>
                <span>Entrega</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs mb-3">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Paciente</span>
                <p class="font-bold text-slate-800 text-xs" id="dcPatient">LETICIA VARGAS MUÑOZ</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Doctor Solicitante</span>
                <p class="font-bold text-slate-800 text-xs" id="dcDoctor">Dra. Brenda Deyanira</p>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tono Guía Vita</span>
                <span class="font-mono font-bold text-blue-700 text-sm" id="dcShade">A3</span>
              </div>
              <div>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Material</span>
                <span class="font-semibold text-slate-700">Zirconio Monolítico</span>
              </div>
              <div>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Disco CAM</span>
                <span class="font-mono text-slate-700">#ZRC-14mm</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button onclick="window.print();" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>Imprimir</span>
            </button>
            <button onclick="closeDigitalCard(); abrirOrdenTrabajo('30596');" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm">
              <span>Abrir Expediente Completo</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <div class="p-5 bg-slate-50/60 flex flex-col justify-between space-y-4 text-xs">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Colorímetro Guía VITA</span>
              <span id="shadeLabel3D" class="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">VITA A2</span>
            </div>

            <div class="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div id="shadeColorPreview" class="w-8 h-8 rounded-xl border border-slate-300 shadow-inner" style="background-color: #ede2cc;"></div>
                <div>
                  <p class="font-bold text-slate-800 text-xs">Selección de Tono</p>
                  <p class="text-[10px] text-slate-500">Cambiar tono asignado</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <button onclick="changeToothShade('#ffffff', 'Bleach')" class="w-6 h-6 rounded-full bg-white border-2 border-slate-300 hover:scale-110 transition-transform" title="Tono Bleach"></button>
                <button onclick="changeToothShade('#f5f0e6', 'A1')" class="w-6 h-6 rounded-full bg-[#f5f0e6] border-2 border-slate-300 hover:scale-110 transition-transform" title="Tono Vita A1"></button>
                <button onclick="changeToothShade('#ede2cc', 'A2')" class="w-6 h-6 rounded-full bg-[#ede2cc] border-2 border-blue-500 hover:scale-110 transition-transform" title="Tono Vita A2"></button>
                <button onclick="changeToothShade('#e2d0b0', 'A3')" class="w-6 h-6 rounded-full bg-[#e2d0b0] border-2 border-slate-300 hover:scale-110 transition-transform" title="Tono Vita A3"></button>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-white border border-slate-200">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Indicaciones Clínicas</span>
              <p class="text-[11px] text-slate-600 leading-relaxed">Sellado marginal verificado en escaneo intraoral. Contacto oclusal ligero y anatomía natural solicitada por el doctor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: ODONTOGRAMA DIGITAL INTERACTIVO (32 Piezas)                        -->
  <!-- ========================================================================= -->
  <div id="modalOdonto" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden">
      <div class="p-5 bg-slate-900 text-white flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <i data-lucide="scan-face" class="w-5 h-5 text-blue-400"></i>
          <div>
            <h4 class="text-sm font-bold">Odontograma Digital CAD/CAM (FDI)</h4>
            <p class="text-[11px] text-slate-400">Selecciona las piezas dentales para asignar a la orden</p>
          </div>
        </div>
        <button onclick="closeOdontogramaModal()" class="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div class="p-6 space-y-5">
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2">Arcada Superior (18 - 11 | 21 - 28)</span>
          <div class="grid grid-cols-8 sm:grid-cols-16 gap-1.5" id="odontoUpper"></div>
        </div>
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2">Arcada Inferior (48 - 41 | 31 - 38)</span>
          <div class="grid grid-cols-8 sm:grid-cols-16 gap-1.5" id="odontoLower"></div>
        </div>
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div class="text-xs">
            <span class="text-slate-400 font-bold uppercase text-[10px] block">Piezas Seleccionadas:</span>
            <span id="selectedTeethLabel" class="font-mono font-bold text-blue-600 text-sm">#16, #21</span>
          </div>
          <button onclick="saveOdontograma()" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors">
            Guardar Selección
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: ÓRDENES CANCELADAS (Idéntico a index.php L233-260 de DENT DEMO)    -->
  <!-- ========================================================================= -->
  <div id="modalCanceladas" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden">
      <div class="p-4 bg-slate-900 text-white flex items-center justify-between">
        <h4 class="text-sm font-bold">Órdenes canceladas</h4>
        <button onclick="closeModalCanceladas()" class="p-1 text-slate-400 hover:text-white">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div class="p-5 overflow-y-auto max-h-[65vh] table-scroll">
        <table class="w-full text-center text-xs border-collapse general-table">
          <thead>
            <tr>
              <th>Orden</th>
              <th>Responsable</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody id="tbodyModalCanceladas" class="divide-y divide-slate-100 text-slate-700"></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: ÓRDENES PENDIENTES DE PAGO (Idéntico a index.php L265 DENT DEMO)   -->
  <!-- ========================================================================= -->
  <div id="modalPendientes" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden">
      <div class="p-4 bg-slate-900 text-white flex items-center justify-between">
        <h4 class="text-sm font-bold">Órdenes pendientes de pago</h4>
        <button onclick="closeModalPendientes()" class="p-1 text-slate-400 hover:text-white">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <div class="p-5 overflow-y-auto max-h-[65vh] table-scroll">
        <table class="w-full text-center text-xs border-collapse general-table">
          <thead>
            <tr>
              <th>Orden</th>
              <th>Doctor</th>
              <th>Paciente</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="tbodyModalPendientesPago" class="divide-y divide-slate-100 text-slate-700"></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ============================================== -->
  <!-- MODAL UNIVERSAL INTERACTIVO PARA ALTA RÁPIDA   -->
  <!-- ============================================== -->
  <div id="modalUniversalForm" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
      <div class="p-4 bg-slate-900 text-white flex items-center justify-between">
        <h4 class="text-sm font-bold" id="uniModalTitle">Nuevo Registro</h4>
        <button onclick="closeUniversalModal()" class="p-1 text-slate-400 hover:text-white">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
      <form onsubmit="submitUniversalModal(event)" class="p-5 space-y-4 text-xs">
        <div id="uniModalFields" class="space-y-3"></div>
        <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <button type="button" onclick="closeUniversalModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50">Cancelar</button>
          <button type="submit" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm">Guardar Cambios</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Contenedor Flotante de Notificaciones Animadas -->
  <div id="toastContainer" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-none"></div>

  <script src="modules.js"></script>
  <script src="ExpandableCard.js"></script>
  <script>
    lucide.createIcons();

    // Sesión sincronizada entre PHP ($_SESSION) y cliente
    const usuario = localStorage.getItem('cv_usuario') || <?= json_encode($usuarioActual) ?>;
    document.getElementById('lblNombreUser').innerText = usuario;
    document.getElementById('topUserLabel').innerText = usuario;
    if (typeof window.refreshMenuForUser === 'function') {
      window.refreshMenuForUser();
    }

    function runAnimeCounters() {
      if (typeof renderTablasInicio === 'function') {
        renderTablasInicio();
      }
    }

    // 2. SISTEMA DE NOTIFICACIONES TOAST ANIMADAS
    function showToast(title, message) {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = 'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-700/80 text-xs transform transition-all duration-300 translate-y-4 opacity-0';
      toast.innerHTML = `
        <div class="w-7 h-7 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <p class="font-bold text-white leading-tight">${title}</p>
          <p class="text-[11px] text-slate-300 mt-0.5">${message}</p>
        </div>
      `;
      container.appendChild(toast);
      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
      });
      setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, 3200);
    }

    // Selector de Tono Guía VITA
    function changeToothShade(hex, label) {
      const preview = document.getElementById('shadeColorPreview');
      if (preview) preview.style.backgroundColor = hex;
      const lbl = document.getElementById('shadeLabel3D');
      if (lbl) lbl.innerText = 'VITA ' + label.toUpperCase();
      const dcShade = document.getElementById('dcShade');
      if (dcShade) dcShade.innerText = label;
    }

    // Odontograma Digital Interactivo (32 Dientes)
    const selectedTeeth = new Set(['16', '21']);
    function renderOdontograma() {
      const upper = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
      const lower = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
      const upperEl = document.getElementById('odontoUpper');
      const lowerEl = document.getElementById('odontoLower');
      if (!upperEl || !lowerEl) return;

      const makeBtn = (num) => {
        const s = String(num);
        const active = selectedTeeth.has(s);
        return `<button onclick="toggleTooth('${s}')" class="p-2 rounded-xl border text-center transition-all ${
          active
            ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-105 font-bold'
            : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'
        }">
          <span class="text-[11px] font-mono block">${s}</span>
        </button>`;
      };

      upperEl.innerHTML = upper.map(makeBtn).join('');
      lowerEl.innerHTML = lower.map(makeBtn).join('');
      document.getElementById('selectedTeethLabel').innerText =
        selectedTeeth.size ? Array.from(selectedTeeth).map(t => '#' + t).join(', ') : 'Ninguna';
    }

    function toggleTooth(num) {
      if (selectedTeeth.has(num)) selectedTeeth.delete(num);
      else selectedTeeth.add(num);
      renderOdontograma();
    }

    function openOdontogramaModal() {
      renderOdontograma();
      document.getElementById('modalOdonto').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeOdontogramaModal() {
      document.getElementById('modalOdonto').classList.add('hidden');
    }

    function saveOdontograma() {
      closeOdontogramaModal();
      showToast('Odontograma Actualizado', 'Piezas asignadas: ' + Array.from(selectedTeeth).map(t => '#' + t).join(', '));
    }

    // Reloj en Vivo idéntico a DENT DEMO/scripts/index.js
    function updateClock() {
      const now = new Date();
      const fechaStr = now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const el = document.getElementById('HoraActual');
      if (el) el.innerText = `${fechaStr} / ${h}:${m}:${s}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Sidebar
    function toggleSidebar() {
      const sb = document.getElementById('sidebar');
      sb.classList.toggle('w-64');
      sb.classList.toggle('w-0');
      sb.classList.toggle('overflow-hidden');
    }

    function toggleSettingsDropdown(e) {
      if (e) e.stopPropagation();
      const mod = document.getElementById('userQuickModule');
      if (!mod) return;
      const isOpen = mod.getAttribute('data-open') === 'true';
      mod.setAttribute('data-open', isOpen ? 'false' : 'true');
      if (isOpen) hideQmTracker();
    }

    function closeSettingsDropdown() {
      const mod = document.getElementById('userQuickModule');
      if (mod) mod.setAttribute('data-open', 'false');
      hideQmTracker();
    }

    function moveQmTracker(el, isDanger) {
      const tracker = document.getElementById('qmHoverTracker');
      if (!tracker || !el) return;
      tracker.setAttribute('data-danger', isDanger ? 'true' : 'false');
      tracker.style.height = `${el.offsetHeight}px`;
      tracker.style.transform = `translateY(${el.offsetTop}px) scale(1)`;
      tracker.style.opacity = '1';
    }

    function hideQmTracker() {
      const tracker = document.getElementById('qmHoverTracker');
      if (tracker) {
        tracker.style.opacity = '0';
        tracker.style.transform = tracker.style.transform.replace('scale(1)', 'scale(0.96)');
      }
    }

    document.addEventListener('click', (e) => {
      const mod = document.getElementById('userQuickModule');
      if (mod && !mod.contains(e.target)) {
        closeSettingsDropdown();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSettingsDropdown();
    });

    // Hoja de Orden de Trabajo Modal
    function openDigitalCard(ot, treatment, patient, doctor, shade, stage, delivery) {
      document.getElementById('dcOrderNum').innerText = `#OT-${ot}`;
      document.getElementById('dcTreatment').innerText = treatment;
      document.getElementById('dcPatient').innerText = patient;
      document.getElementById('dcDoctor').innerText = doctor;
      document.getElementById('dcShade').innerText = shade;
      document.getElementById('dcDeliveryDate').innerText = delivery;
      document.getElementById('modalDigitalCard').classList.remove('hidden');
      lucide.createIcons();
    }

    function closeDigitalCard() {
      document.getElementById('modalDigitalCard').classList.add('hidden');
    }

    // Modales
    function openModalCanceladas() { document.getElementById('modalCanceladas').classList.remove('hidden'); }
    function closeModalCanceladas() { document.getElementById('modalCanceladas').classList.add('hidden'); }
    function openModalPendientes() { document.getElementById('modalPendientes').classList.remove('hidden'); }
    function closeModalPendientes() { document.getElementById('modalPendientes').classList.add('hidden'); }

    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }

    async function refreshData() {
      const icon = document.getElementById('refreshIcon');
      if (icon) icon.classList.add('animate-spin');
      if (typeof window.syncLiveDatabase === 'function') {
        const ok = await window.syncLiveDatabase(false);
        if (!ok) {
          if (typeof renderTablasInicio === 'function') renderTablasInicio();
          showToast('Tablas Actualizadas', 'Escaneo, Diseño, Fabricación, Entrega y Órdenes sincronizadas.');
        }
      } else if (typeof renderTablasInicio === 'function') {
        renderTablasInicio();
        showToast('Tablas Actualizadas', 'Escaneo, Diseño, Fabricación, Entrega y Órdenes sincronizadas.');
      }
      setTimeout(() => { if (icon) icon.classList.remove('animate-spin'); }, 600);
    }

    function buscarEnTabla() {
      const raw = document.getElementById('nptBuscar').value;
      if (typeof window.buscarEnBaseDeDatosLive === 'function') {
        window.buscarEnBaseDeDatosLive(raw);
      }
    }
  </script>
</body>
</html>
