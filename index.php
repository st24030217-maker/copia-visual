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
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="ExpandableCard.css">
  <style>
    body, button, input, select, textarea { font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif; }
    .font-mono { font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-variant-numeric: tabular-nums; }
    .table-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
    .table-scroll::-webkit-scrollbar-track { background: transparent; }
    .table-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

    /* Resaltado de órdenes con prioridad en Escaneo, Diseño, Fabricación (.row-yellow) y Entrega (.row-green) igual a DENT DEMO */
    .row-green,
    .row-green td {
      color: #ffffff !important;
      animation: parpadeo-verde 1s ease-in-out infinite alternate;
    }
    @keyframes parpadeo-verde {
      from { background-color: #008000; }
      to   { background-color: #66cc66; }
    }
    .row-green a {
      color: #ccffcc !important;
      font-weight: 700;
    }
    .row-green span {
      background-color: rgba(255, 255, 255, 0.22) !important;
      color: #ffffff !important;
    }

    .row-yellow,
    .row-yellow td {
      color: #ffffff !important;
      animation: parpadeo 1s ease-in-out infinite alternate;
    }
    @keyframes parpadeo {
      from { background-color: #ff0000; }
      to   { background-color: #ff6666; }
    }
    .row-yellow a {
      color: #ffff66 !important;
      font-weight: 700;
    }
    .row-yellow span {
      background-color: rgba(255, 255, 255, 0.22) !important;
      color: #ffffff !important;
    }

    /* Tablas compactas de las 4 etapas de inicio (Escaneo, Diseño, Fabricación, Entrega) */
    .stage-table th {
      background-color: #0f172a;
      color: #ffffff;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      padding: 7px 6px;
      position: sticky;
      top: 0;
      z-index: 10;
      white-space: nowrap;
    }
    .stage-table td {
      font-size: 11px;
      padding: 6px 6px;
      border-bottom: 1px solid #f1f5f9;
      white-space: nowrap;
    }

    /* Tabla general inferior (#tableOrdenes) */
    .general-table th {
      background-color: #0f172a;
      color: #ffffff;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      padding: 9px 10px;
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

    /* Botones .btnEtiqueta exactos de DENT DEMO (#40C1CA) */
    .btnEtiqueta {
      background-color: #40C1CA;
      border: none;
      color: #ffffff !important;
      border-radius: 5px;
      padding: 5px 9px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: filter 0.15s ease, transform 0.15s ease;
      cursor: pointer;
    }
    .btnEtiqueta:hover {
      filter: brightness(0.92);
      transform: translateY(-1px);
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
        <!-- Engranaje de Configuración / Permisos (igual que en DENT DEMO) -->
        <div class="relative">
          <button onclick="toggleSettingsDropdown()" class="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors" title="Ajustes">
            <i data-lucide="sliders-horizontal" class="w-4 h-4"></i>
          </button>
          <div id="settingsDropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50 text-xs">
            <a href="#" onclick="openModule('permisos'); return false;" class="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 font-medium">
              <i data-lucide="shield" class="w-4 h-4 text-blue-600"></i> Permisos
            </a>
            <a href="#" onclick="openModule('configuracion'); return false;" class="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 font-medium">
              <i data-lucide="sliders" class="w-4 h-4 text-blue-600"></i> Configuración
            </a>
          </div>
        </div>

        <div class="flex items-center gap-2 pl-3 border-l border-slate-200">
          <span class="text-xs font-semibold text-slate-700" id="topUserLabel"><?= $usuarioActual ?></span>
          <a href="logout.php" onclick="if(location.hostname.includes('github.io')||location.hostname.includes('vercel.app')||location.pathname.endsWith('.html')){localStorage.removeItem('cv_usuario');location.href='login.html';return false;}" class="text-slate-400 hover:text-slate-700" title="Salir">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </a>
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

          <!-- CUADRO 1: ESCANEO (TableEscaneo.php - 7 columnas: OT, PROD, UNI, DOCTOR, SOLI, EST, REGISTRO) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div class="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <i data-lucide="video" class="w-3.5 h-3.5"></i>
                </span>
                <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Escaneo</h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100" id="badgeCountEscaneo">4</span>
            </div>
            <div class="table-scroll overflow-auto" style="height: 28vh;">
              <table class="w-full text-center border-collapse stage-table">
                <thead>
                  <tr>
                    <th>OT</th>
                    <th>PROD</th>
                    <th>UNI</th>
                    <th>DOCTOR</th>
                    <th>SOLI</th>
                    <th>EST</th>
                    <th>REGISTRO</th>
                  </tr>
                </thead>
                <tbody id="tbodyStageEscaneo" class="divide-y divide-slate-100 text-slate-700"></tbody>
              </table>
            </div>
          </div>

          <!-- CUADRO 2: DISEÑO (TableDiseno.php - 5 columnas exactas: OT, PROD, UNI, DOCTOR, ENT) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div class="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <i data-lucide="monitor" class="w-3.5 h-3.5"></i>
                </span>
                <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Diseño</h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100" id="badgeCountDiseno">18</span>
            </div>
            <div class="table-scroll overflow-auto" style="height: 28vh;">
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

          <!-- CUADRO 3: FABRICACIÓN (TableFabricacion.php - 5 columnas exactas: OT, PROD, UNI, DOCTOR, ENT) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div class="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <i data-lucide="wrench" class="w-3.5 h-3.5"></i>
                </span>
                <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Fabricación</h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100" id="badgeCountFabricacion">7</span>
            </div>
            <div class="table-scroll overflow-auto" style="height: 28vh;">
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

          <!-- CUADRO 4: ENTREGA (TableEntrega.php - 6 columnas exactas: OT, PROD, UNI, DOCTOR, ENT, EST) -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div class="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center">
                  <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                </span>
                <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Entrega</h3>
              </div>
              <span class="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100" id="badgeCountEntrega">0</span>
            </div>
            <div class="table-scroll overflow-auto" style="height: 28vh;">
              <table class="w-full text-center border-collapse stage-table">
                <thead>
                  <tr>
                    <th>OT</th>
                    <th>PROD</th>
                    <th>UNI</th>
                    <th>DOCTOR</th>
                    <th>ENT</th>
                    <th>EST</th>
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

    function toggleSettingsDropdown() {
      document.getElementById('settingsDropdown').classList.toggle('hidden');
    }

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

    function refreshData() {
      const icon = document.getElementById('refreshIcon');
      if (icon) icon.classList.add('animate-spin');
      if (typeof renderTablasInicio === 'function') renderTablasInicio();
      showToast('Tablas Actualizadas', 'Escaneo, Diseño, Fabricación, Entrega y Órdenes sincronizadas.');
      setTimeout(() => { if (icon) icon.classList.remove('animate-spin'); }, 800);
    }

    function buscarEnTabla() {
      const q = document.getElementById('nptBuscar').value.toLowerCase();
      const rows = document.querySelectorAll('#tbodyGeneralOrdenes tr');
      rows.forEach(r => {
        r.style.display = r.innerText.toLowerCase().includes(q) ? '' : 'none';
      });
    }
  </script>
</body>
</html>
