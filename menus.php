<?php
$usuarioMenu = htmlspecialchars($_SESSION['user'] ?? 'Admin', ENT_QUOTES, 'UTF-8');
?>
  <!-- ========================================== -->
  <!-- BARRA LATERAL IZQUIERDA (menus.php EXACTO) -->
  <!-- ========================================== -->
  <aside id="sidebar" class="w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 transition-all duration-200">
    <div class="flex flex-col h-full overflow-y-auto">
      
      <!-- Logo Oficial en Blanco y CAD/CAM -->
      <div class="h-16 px-5 flex items-center gap-3 border-b border-slate-800 bg-slate-950/40">
        <img src="assets/logoDentlab.png" alt="Dent Lab" class="h-8 w-auto max-w-[140px] object-contain brightness-0 invert opacity-95">
        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-700/60 ml-auto font-semibold">CAD/CAM</span>
      </div>

      <!-- Menú de Navegación Exacto de DENT DEMO (menus.php) -->
      <div class="p-3 space-y-4 flex-1 overflow-y-auto table-scroll">
        <div>
          <h3 class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 pt-1">Menú Principal</h3>
          <ul class="space-y-1 text-xs">

            <!-- 1. INICIO -->
            <li>
              <button onclick="openModule('inicio')" data-module="inicio" class="nav-leaf-btn flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm transition-all w-full text-left">
                <i data-lucide="home" class="w-4 h-4 shrink-0"></i>
                <span>Inicio</span>
              </button>
            </li>

            <!-- 2. ESTADÍSTICAS -->
            <li>
              <button onclick="toggleSubmenu('sub-estadisticas')" class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 font-semibold transition-colors">
                <span class="flex items-center gap-2.5">
                  <i data-lucide="bar-chart-3" class="w-4 h-4 text-blue-400"></i>
                  <span>Estadísticas</span>
                </span>
                <i data-lucide="chevron-down" id="chevron-sub-estadisticas" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"></i>
              </button>
              <ul id="sub-estadisticas" class="hidden pl-4 mt-1 space-y-1 border-l border-slate-800 ml-4">
                <li>
                  <button onclick="openModule('estadisticas-lab')" data-module="estadisticas-lab" class="nav-leaf-btn flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium transition-all w-full text-left">
                    <span>Control de Laboratorio</span>
                  </button>
                </li>
                <li>
                  <button onclick="openModule('graficos')" data-module="graficos" class="nav-leaf-btn flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium transition-all w-full text-left">
                    <span>Gráficos</span>
                  </button>
                </li>
              </ul>
            </li>

            <!-- 3. DENT LAB -->
            <li>
              <button onclick="toggleSubmenu('sub-dentlab')" class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 font-semibold transition-colors">
                <span class="flex items-center gap-2.5">
                  <i data-lucide="flask-conical" class="w-4 h-4 text-blue-400"></i>
                  <span>Dent Lab</span>
                </span>
                <i data-lucide="chevron-down" id="chevron-sub-dentlab" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" style="transform: rotate(180deg);"></i>
              </button>
              <ul id="sub-dentlab" class="pl-3 mt-1 space-y-1 border-l border-slate-800 ml-4">

                <!-- Control de Equipos -->
                <li>
                  <button onclick="toggleSubmenu('sub-equipos')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="briefcase" class="w-3.5 h-3.5 text-slate-400"></i><span>Control de Equipos</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-equipos" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-equipos" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('equipos-prestamo')" data-module="equipos-prestamo" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Equipos en Préstamo</button></li>
                    <li><button onclick="openModule('catalogo-equipos')" data-module="catalogo-equipos" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Catálogo Equipos</button></li>
                    <li><button onclick="openModule('historico-equipos')" data-module="historico-equipos" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Histórico de Equipos</button></li>
                  </ul>
                </li>

                <!-- Motivos de Cancelación -->
                <li>
                  <button onclick="openModule('motivos-cancelacion')" data-module="motivos-cancelacion" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="alert-circle" class="w-3.5 h-3.5 text-slate-400"></i><span>Motivos de Cancelación</span>
                  </button>
                </li>

                <!-- Mensajes Push -->
                <li>
                  <button onclick="toggleSubmenu('sub-push')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="message-square" class="w-3.5 h-3.5 text-slate-400"></i><span>Mensajes Push</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-push" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-push" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('mensajes-push')" data-module="mensajes-push" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Lista Mensajes Push</button></li>
                    <li><button onclick="openModule('tipos-push')" data-module="tipos-push" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Tipos Push</button></li>
                  </ul>
                </li>

                <!-- Paquetes y Productos -->
                <li>
                  <button onclick="openModule('paquetes')" data-module="paquetes" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="archive" class="w-3.5 h-3.5 text-slate-400"></i><span>Paquetes</span>
                  </button>
                </li>
                <li>
                  <button onclick="openModule('productos-app')" data-module="productos-app" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="box" class="w-3.5 h-3.5 text-slate-400"></i><span>Productos</span>
                  </button>
                </li>

                <!-- Discos -->
                <li>
                  <button onclick="toggleSubmenu('sub-discos')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="disc" class="w-3.5 h-3.5 text-slate-400"></i><span>Discos</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-discos" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-discos" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('inventario-discos')" data-module="inventario-discos" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Inventario de Discos</button></li>
                    <li><button onclick="openModule('discos-activos')" data-module="discos-activos" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Discos Activos</button></li>
                    <li><button onclick="openModule('discos-usados')" data-module="discos-usados" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Discos Usados</button></li>
                    <li><button onclick="openModule('archivos-erroneos')" data-module="archivos-erroneos" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Archivos Erróneos</button></li>
                    <li><button onclick="openModule('archivos-autorizar')" data-module="archivos-autorizar" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Archivos por autorizar</button></li>
                  </ul>
                </li>

                <!-- BanersApp -->
                <li>
                  <button onclick="openModule('baners-app')" data-module="baners-app" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="layout" class="w-3.5 h-3.5 text-slate-400"></i><span>BanersApp</span>
                  </button>
                </li>

                <!-- Recordatorios -->
                <li>
                  <button onclick="toggleSubmenu('sub-recordatorios')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="pin" class="w-3.5 h-3.5 text-slate-400"></i><span>Recordatorios</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-recordatorios" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-recordatorios" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('recordatorios')" data-module="recordatorios" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Recordatorios</button></li>
                    <li><button onclick="openModule('tipos-recordatorio')" data-module="tipos-recordatorio" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Tipos de Recordatorio</button></li>
                  </ul>
                </li>

                <!-- Marcas de Discos -->
                <li>
                  <button onclick="openModule('marcas-discos')" data-module="marcas-discos" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="award" class="w-3.5 h-3.5 text-slate-400"></i><span>Marcas de Discos</span>
                  </button>
                </li>

                <!-- Doctores -->
                <li>
                  <button onclick="toggleSubmenu('sub-doctores')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="stethoscope" class="w-3.5 h-3.5 text-slate-400"></i><span>Doctores</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-doctores" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-doctores" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('doctores-tipos')" data-module="doctores-tipos" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Doctores Tipos</button></li>
                    <li><button onclick="openModule('listado-doctores')" data-module="listado-doctores" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Listado doctores</button></li>
                    <li><button onclick="openModule('paquetes-doctores')" data-module="paquetes-doctores" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Listado Paquetes</button></li>
                    <li><button onclick="openModule('nuevo-doctor')" data-module="nuevo-doctor" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Nuevo doctor</button></li>
                    <li><button onclick="openModule('doctores-inactivos')" data-module="doctores-inactivos" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Doctores sin paquetes (3m)</button></li>
                  </ul>
                </li>

                <!-- Categorías -->
                <li>
                  <button onclick="openModule('categorias')" data-module="categorias" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="list-Ordered" class="w-3.5 h-3.5 text-slate-400"></i><span>Categorías</span>
                  </button>
                </li>

                <!-- Órdenes -->
                <li>
                  <button onclick="toggleSubmenu('sub-ordenes')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="files" class="w-3.5 h-3.5 text-slate-400"></i><span>Órdenes</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-ordenes" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-ordenes" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('lista-ordenes')" data-module="lista-ordenes" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Lista de Órdenes</button></li>
                  </ul>
                </li>

                <!-- Colorímetro, Vendedor, Vendedores, Usuarios -->
                <li>
                  <button onclick="openModule('colorimetro')" data-module="colorimetro" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="palette" class="w-3.5 h-3.5 text-slate-400"></i><span>Colorímetro Colores</span>
                  </button>
                </li>
                <li>
                  <button onclick="openModule('vendedor')" data-module="vendedor" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="briefcase" class="w-3.5 h-3.5 text-slate-400"></i><span>Vendedor</span>
                  </button>
                </li>
                <li>
                  <button onclick="openModule('vendedores-detalle')" data-module="vendedores-detalle" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="users" class="w-3.5 h-3.5 text-slate-400"></i><span>Vendedores</span>
                  </button>
                </li>
                <li>
                  <button onclick="openModule('usuarios')" data-module="usuarios" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="user-circle" class="w-3.5 h-3.5 text-slate-400"></i><span>Usuarios</span>
                  </button>
                </li>
              </ul>
            </li>

            <!-- 4. DENT SPA -->
            <li>
              <button onclick="toggleSubmenu('sub-dentspa')" class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 font-semibold transition-colors">
                <span class="flex items-center gap-2.5">
                  <i data-lucide="heart" class="w-4 h-4 text-blue-400"></i>
                  <span>Dent SPA</span>
                </span>
                <i data-lucide="chevron-down" id="chevron-sub-dentspa" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"></i>
              </button>
              <ul id="sub-dentspa" class="hidden pl-3 mt-1 space-y-1 border-l border-slate-800 ml-4">
                <li>
                  <button onclick="toggleSubmenu('sub-spa-convenios')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="file-Spreadsheet" class="w-3.5 h-3.5 text-slate-400"></i><span>Convenios</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-spa-convenios" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-spa-convenios" class="pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('nueva-empresa')" data-module="nueva-empresa" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Nueva Empresa</button></li>
                  </ul>
                </li>
              </ul>
            </li>

            <!-- 5. DENT CLINIC -->
            <li>
              <button onclick="toggleSubmenu('sub-dentclinic')" class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 font-semibold transition-colors">
                <span class="flex items-center gap-2.5">
                  <i data-lucide="building-2" class="w-4 h-4 text-blue-400"></i>
                  <span>Dent Clinic</span>
                </span>
                <i data-lucide="chevron-down" id="chevron-sub-dentclinic" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"></i>
              </button>
              <ul id="sub-dentclinic" class="hidden pl-3 mt-1 space-y-1 border-l border-slate-800 ml-4">
                <li>
                  <button onclick="openModule('encuestas')" data-module="encuestas" class="nav-leaf-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">
                    <i data-lucide="file-check" class="w-3.5 h-3.5 text-slate-400"></i><span>Encuestas de satisfacción</span>
                  </button>
                </li>
                <li>
                  <button onclick="toggleSubmenu('sub-clinic-prod')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="package" class="w-3.5 h-3.5 text-slate-400"></i><span>Productos</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-clinic-prod" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-clinic-prod" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('productos-servicios')" data-module="productos-servicios" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Productos / Servicios</button></li>
                    <li><button onclick="openModule('puntos-productos')" data-module="puntos-productos" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Puntos productos</button></li>
                  </ul>
                </li>
                <li>
                  <button onclick="toggleSubmenu('sub-clinic-fid')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="credit-card" class="w-3.5 h-3.5 text-slate-400"></i><span>Fidelización</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-clinic-fid" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-clinic-fid" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('tarjeta-clientes')" data-module="tarjeta-clientes" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Tarjeta de Clientes</button></li>
                  </ul>
                </li>
                <li>
                  <button onclick="toggleSubmenu('sub-clinic-conv')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="handshake" class="w-3.5 h-3.5 text-slate-400"></i><span>Convenios</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-clinic-conv" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-clinic-conv" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('lista-empresas')" data-module="lista-empresas" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Lista de Empresas</button></li>
                    <li><button onclick="openModule('representantes-venta')" data-module="representantes-venta" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Representantes de Venta</button></li>
                    <li><button onclick="openModule('nueva-empresa')" data-module="nueva-empresa" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Nueva Empresa</button></li>
                    <li><button onclick="openModule('empleados')" data-module="empleados" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Empleados</button></li>
                  </ul>
                </li>
                <li>
                  <button onclick="toggleSubmenu('sub-clinic-ventas')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="shopping-bag" class="w-3.5 h-3.5 text-slate-400"></i><span>Ventas</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-clinic-ventas" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-clinic-ventas" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('realizar-venta')" data-module="realizar-venta" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Realizar Venta</button></li>
                    <li><button onclick="openModule('listado-ventas')" data-module="listado-ventas" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Listado de Ventas</button></li>
                  </ul>
                </li>
                <li>
                  <button onclick="toggleSubmenu('sub-clinic-pac')" class="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium">
                    <span class="flex items-center gap-2"><i data-lucide="users" class="w-3.5 h-3.5 text-slate-400"></i><span>Pacientes</span></span>
                    <i data-lucide="chevron-down" id="chevron-sub-clinic-pac" class="w-3 h-3 text-slate-500 transition-transform"></i>
                  </button>
                  <ul id="sub-clinic-pac" class="hidden pl-3 mt-0.5 space-y-0.5 border-l border-slate-800/80 ml-3">
                    <li><button onclick="openModule('lista-pacientes')" data-module="lista-pacientes" class="nav-leaf-btn px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white w-full text-left">Lista de Pacientes</button></li>
                  </ul>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>

      <!-- Info de Usuario con Logo DentLab Original (Parte inferior de la barra lateral) -->
      <div class="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <div class="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-slate-800/50 transition-colors">
          <img src="assets/DentLabLogo.jpeg" alt="DentLab" class="w-9 h-9 rounded-full object-cover border border-slate-700 shadow-sm shrink-0">
          <div class="leading-tight overflow-hidden">
            <span class="text-[10px] text-slate-400 block">Bienvenido(a):</span>
            <h2 class="text-xs font-bold text-white truncate" id="lblNombreUser"><?= $usuarioMenu ?></h2>
          </div>
          <span class="w-2 h-2 rounded-full bg-emerald-500 ml-auto shrink-0" title="En línea"></span>
        </div>
      </div>

      <!-- Iconos inferiores de barra lateral -->
      <div class="h-12 border-t border-slate-800 px-4 flex items-center justify-around text-slate-400 bg-slate-900">
        <a href="#" onclick="openModule('configuracion'); return false;" title="Configuraciones" class="hover:text-white transition-colors">
          <i data-lucide="settings" class="w-4 h-4"></i>
        </a>
        <a href="#" onclick="toggleFullScreen(); return false;" title="Pantalla completa" class="hover:text-white transition-colors">
          <i data-lucide="maximize" class="w-4 h-4"></i>
        </a>
        <a href="#" onclick="openModule('permisos'); return false;" title="Permisos de Seguridad" class="hover:text-white transition-colors">
          <i data-lucide="lock" class="w-4 h-4"></i>
        </a>
        <a href="logout.php" title="Cerrar sesión" class="hover:text-rose-400 transition-colors">
          <i data-lucide="power" class="w-4 h-4"></i>
        </a>
      </div>
    </div>
  </aside>
