<?php
$usuarioMenu = htmlspecialchars($_SESSION['user'] ?? 'admin', ENT_QUOTES, 'UTF-8');
$perfilMenu  = htmlspecialchars(ucfirst(strtolower($_SESSION['perfil'] ?? 'Administrador')), ENT_QUOTES, 'UTF-8');
?>
  <!-- ========================================================================= -->
  <!-- BARRA LATERAL IZQUIERDA IDÉNTICA A DENT DEMO (menus.php)                  -->
  <!-- ========================================================================= -->
  <aside id="sidebar" class="w-64 bg-[#2A3F54] text-slate-100 flex flex-col justify-between shrink-0 transition-all duration-200 border-r border-slate-800 select-none">
    <div class="flex flex-col h-full overflow-hidden">
      
      <!-- 1. Título Superior de Perfil (.navbar.nav_title de DENT DEMO) -->
      <div class="h-14 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
        <a href="#" onclick="openModule('inicio'); return false;" class="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity">
          <img src="assets/logoDentlab.png" alt="Dent Lab" class="h-6 w-auto object-contain brightness-0 invert">
          <span class="text-sm font-semibold tracking-wide text-slate-200" id="lblPerfilSidebar"><?= $perfilMenu ?></span>
        </a>
      </div>

      <!-- 2. Bloque de Perfil Superior (.profile.clearfix de DENT DEMO: Foto + Bienvenido(a): + Usuario) -->
      <div class="px-4 py-3.5 flex items-center gap-3.5 border-b border-white/10 bg-[#233648]/60 shrink-0">
        <div class="shrink-0">
          <img src="assets/DentLabLogo.jpeg" alt="DentLab" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm bg-white p-0.5">
        </div>
        <div class="leading-tight overflow-hidden">
          <span class="text-[11px] text-slate-300 font-normal block">Bienvenido(a):</span>
          <h2 class="text-sm font-semibold text-white truncate mt-0.5" id="lblNombreUser"><?= $usuarioMenu ?></h2>
        </div>
      </div>

      <!-- 3. Menú Jerárquico de 3 Niveles (MenuPadre -> MenuHijo -> MenuHijoDelHijo igual a DENT DEMO) -->
      <div class="flex-1 overflow-y-auto table-scroll py-2">
        <nav class="space-y-0.5 text-[13px]">

          <!-- INICIO -->
          <div>
            <button type="button" data-module="inicio" onclick="openModule('inicio')"
              class="nav-leaf-btn w-full flex items-center gap-3 px-4 py-2.5 text-left font-medium text-white bg-white/10 border-r-4 border-[#1ABB9C] transition-all">
              <i data-lucide="home" class="w-4 h-4 shrink-0 text-slate-200"></i>
              <span>Inicio</span>
            </button>
          </div>

          <!-- ESTADÍSTICAS (Padre 1) -->
          <div>
            <button type="button" onclick="toggleSubmenu('menu-estadisticas')"
              class="w-full flex items-center justify-between px-4 py-2.5 text-left font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors">
              <span class="flex items-center gap-3">
                <i data-lucide="bar-chart-2" class="w-4 h-4 shrink-0 text-slate-300"></i>
                <span>Estadisticas</span>
              </span>
              <i id="chevron-menu-estadisticas" data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"></i>
            </button>
            <div id="menu-estadisticas" class="hidden bg-[#1f2f3f]/70 py-1 border-l-2 border-slate-500/40 ml-4 space-y-0.5 text-xs">
              <button type="button" data-module="control-lab" onclick="openModule('control-lab')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Control Laboratorio</span>
              </button>
              <button type="button" data-module="paquetes-vencidos" onclick="openModule('paquetes-vencidos')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Paquetes vencidos</span>
              </button>
              <button type="button" data-module="finanzas" onclick="openModule('finanzas')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Finanzas</span>
              </button>
            </div>
          </div>

          <!-- DENT LAB (Padre 2 - Abierto por defecto) -->
          <div>
            <button type="button" onclick="toggleSubmenu('menu-dentlab')"
              class="w-full flex items-center justify-between px-4 py-2.5 text-left font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors">
              <span class="flex items-center gap-3">
                <i data-lucide="flask-conical" class="w-4 h-4 shrink-0 text-slate-300"></i>
                <span>Dent Lab</span>
              </span>
              <i id="chevron-menu-dentlab" data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" style="transform: rotate(180deg);"></i>
            </button>

            <div id="menu-dentlab" class="bg-[#1f2f3f]/70 py-1 border-l-2 border-slate-500/40 ml-4 space-y-0.5 text-xs">

              <!-- Subgrupo: Control de Equipos -->
              <div>
                <button type="button" onclick="toggleSubmenu('sub-equipos')"
                  class="w-full flex items-center justify-between pl-4 pr-3 py-2 text-left font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="briefcase" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>Control de Equipos</span>
                  </span>
                  <i id="chevron-sub-equipos" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="sub-equipos" class="hidden bg-[#172431]/80 py-1 pl-6 pr-2 space-y-0.5 text-[11px]">
                  <button type="button" data-module="equipos-prestamo" onclick="openModule('equipos-prestamo')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Equipos en Préstamo
                  </button>
                  <button type="button" data-module="catalogo-equipos" onclick="openModule('catalogo-equipos')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Catálogo de Equipos
                  </button>
                </div>
              </div>

              <!-- Motivos de Cancelación -->
              <button type="button" data-module="motivos-cancelacion" onclick="openModule('motivos-cancelacion')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="ban" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Motivos de Cancelación</span>
              </button>

              <!-- Subgrupo: Mensajes Push -->
              <div>
                <button type="button" onclick="toggleSubmenu('sub-push')"
                  class="w-full flex items-center justify-between pl-4 pr-3 py-2 text-left font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="message-square" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>Mensajes Push</span>
                  </span>
                  <i id="chevron-sub-push" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="sub-push" class="hidden bg-[#172431]/80 py-1 pl-6 pr-2 space-y-0.5 text-[11px]">
                  <button type="button" data-module="tipos-push" onclick="openModule('tipos-push')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Tipos de Push
                  </button>
                  <button type="button" data-module="mensajes-push" onclick="openModule('mensajes-push')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Enviar Push
                  </button>
                </div>
              </div>

              <!-- Paquetes -->
              <button type="button" data-module="paquetes" onclick="openModule('paquetes')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="package" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Paquetes</span>
              </button>

              <!-- Productos -->
              <button type="button" data-module="productos-app" onclick="openModule('productos-app')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="box" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Productos</span>
              </button>

              <!-- Subgrupo: Discos -->
              <div>
                <button type="button" onclick="toggleSubmenu('sub-discos')"
                  class="w-full flex items-center justify-between pl-4 pr-3 py-2 text-left font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="disc" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>Discos</span>
                  </span>
                  <i id="chevron-sub-discos" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="sub-discos" class="hidden bg-[#172431]/80 py-1 pl-6 pr-2 space-y-0.5 text-[11px]">
                  <button type="button" data-module="inventario-discos" onclick="openModule('inventario-discos')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Inventario de Discos
                  </button>
                  <button type="button" data-module="historial-discos" onclick="openModule('historial-discos')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Historial de Discos
                  </button>
                  <button type="button" data-module="uso-discos" onclick="openModule('uso-discos')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Uso de Discos
                  </button>
                </div>
              </div>

              <!-- BanersApp -->
              <button type="button" data-module="baners-app" onclick="openModule('baners-app')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="layout" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>BanersApp</span>
              </button>

              <!-- Subgrupo: Recordatorios -->
              <div>
                <button type="button" onclick="toggleSubmenu('sub-recordatorios')"
                  class="w-full flex items-center justify-between pl-4 pr-3 py-2 text-left font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="bell" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>Recordatorios</span>
                  </span>
                  <i id="chevron-sub-recordatorios" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="sub-recordatorios" class="hidden bg-[#172431]/80 py-1 pl-6 pr-2 space-y-0.5 text-[11px]">
                  <button type="button" data-module="tipos-recordatorio" onclick="openModule('tipos-recordatorio')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Tipos de Recordatorios
                  </button>
                  <button type="button" data-module="recordatorios" onclick="openModule('recordatorios')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Recordatorios
                  </button>
                </div>
              </div>

              <!-- Marcas de Discos -->
              <button type="button" data-module="marcas-discos" onclick="openModule('marcas-discos')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="award" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Marcas de Discos</span>
              </button>

              <!-- Subgrupo: Doctores -->
              <div>
                <button type="button" onclick="toggleSubmenu('sub-doctores')"
                  class="w-full flex items-center justify-between pl-4 pr-3 py-2 text-left font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="stethoscope" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>Doctores</span>
                  </span>
                  <i id="chevron-sub-doctores" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="sub-doctores" class="hidden bg-[#172431]/80 py-1 pl-6 pr-2 space-y-0.5 text-[11px]">
                  <button type="button" data-module="doctores-tipos" onclick="openModule('doctores-tipos')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Tipos de Doctores
                  </button>
                  <button type="button" data-module="paquetes-doctores" onclick="openModule('paquetes-doctores')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Paquetes Doctores
                  </button>
                  <button type="button" data-module="doctores-sin-paquetes" onclick="openModule('doctores-sin-paquetes')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Doctores sin Paquetes
                  </button>
                  <button type="button" data-module="listados-doctores" onclick="openModule('listados-doctores')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Lista de Doctores
                  </button>
                </div>
              </div>

              <!-- Categorías -->
              <button type="button" data-module="categorias" onclick="openModule('categorias')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="list" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Categorías</span>
              </button>

              <!-- Subgrupo: Cuentas por Cobrar -->
              <div>
                <button type="button" onclick="toggleSubmenu('sub-cxc')"
                  class="w-full flex items-center justify-between pl-4 pr-3 py-2 text-left font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="dollar-sign" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>Cuentas por Cobrar</span>
                  </span>
                  <i id="chevron-sub-cxc" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="sub-cxc" class="hidden bg-[#172431]/80 py-1 pl-6 pr-2 space-y-0.5 text-[11px]">
                  <button type="button" data-module="pendientes-pago" onclick="openModule('pendientes-pago')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Pendientes de Pago
                  </button>
                  <button type="button" data-module="pagos-realizados" onclick="openModule('pagos-realizados')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Pagos Realizados
                  </button>
                  <button type="button" data-module="historial-abonos" onclick="openModule('historial-abonos')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Historial de Abonos
                  </button>
                </div>
              </div>

              <!-- Subgrupo: Órdenes -->
              <div>
                <button type="button" onclick="toggleSubmenu('sub-ordenes')"
                  class="w-full flex items-center justify-between pl-4 pr-3 py-2 text-left font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span class="flex items-center gap-2.5">
                    <i data-lucide="clipboard-list" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>Órdenes</span>
                  </span>
                  <i id="chevron-sub-ordenes" data-lucide="chevron-down" class="w-3 h-3 text-slate-400 transition-transform duration-200"></i>
                </button>
                <div id="sub-ordenes" class="hidden bg-[#172431]/80 py-1 pl-6 pr-2 space-y-0.5 text-[11px]">
                  <button type="button" data-module="lista-ordenes" onclick="openModule('lista-ordenes')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Lista de Órdenes
                  </button>
                  <button type="button" data-module="ordenes-canceladas" onclick="openModule('ordenes-canceladas')"
                    class="nav-leaf-btn w-full py-1.5 px-2.5 rounded text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                    Órdenes Canceladas
                  </button>
                </div>
              </div>

              <!-- Colorímetro -->
              <button type="button" data-module="colorimetro" onclick="openModule('colorimetro')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="palette" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Colorímetro</span>
              </button>

              <!-- Vendedores -->
              <button type="button" data-module="vendedores" onclick="openModule('vendedores')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="user-check" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Vendedores</span>
              </button>

              <!-- Usuarios -->
              <button type="button" data-module="usuarios" onclick="openModule('usuarios')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <i data-lucide="users" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Usuarios</span>
              </button>

            </div>
          </div>

          <!-- DENT SPA (Padre 3) -->
          <div>
            <button type="button" onclick="toggleSubmenu('menu-dentspa')"
              class="w-full flex items-center justify-between px-4 py-2.5 text-left font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors">
              <span class="flex items-center gap-3">
                <i data-lucide="heart" class="w-4 h-4 shrink-0 text-slate-300"></i>
                <span>Dent SPA</span>
              </span>
              <i id="chevron-menu-dentspa" data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"></i>
            </button>
            <div id="menu-dentspa" class="hidden bg-[#1f2f3f]/70 py-1 border-l-2 border-slate-500/40 ml-4 space-y-0.5 text-xs">
              <button type="button" data-module="empresas" onclick="openModule('empresas')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Empresas</span>
              </button>
              <button type="button" data-module="empleados" onclick="openModule('empleados')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Empleados</span>
              </button>
              <button type="button" data-module="encuestas" onclick="openModule('encuestas')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Encuestas</span>
              </button>
            </div>
          </div>

          <!-- DENT CLINIC (Padre 4) -->
          <div>
            <button type="button" onclick="toggleSubmenu('menu-dentclinic')"
              class="w-full flex items-center justify-between px-4 py-2.5 text-left font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-colors">
              <span class="flex items-center gap-3">
                <i data-lucide="user-plus" class="w-4 h-4 shrink-0 text-slate-300"></i>
                <span>Dent Clinic</span>
              </span>
              <i id="chevron-menu-dentclinic" data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"></i>
            </button>
            <div id="menu-dentclinic" class="hidden bg-[#1f2f3f]/70 py-1 border-l-2 border-slate-500/40 ml-4 space-y-0.5 text-xs">
              <button type="button" data-module="empresas-clinic" onclick="openModule('empresas-clinic')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Empresas</span>
              </button>
              <button type="button" data-module="empleados-clinic" onclick="openModule('empleados-clinic')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Empleados</span>
              </button>
              <button type="button" data-module="encuestas-clinic" onclick="openModule('encuestas-clinic')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Encuestas</span>
              </button>
              <button type="button" data-module="productos-clinica" onclick="openModule('productos-clinica')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Productos</span>
              </button>
              <button type="button" data-module="ventas" onclick="openModule('ventas')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Ventas</span>
              </button>
              <button type="button" data-module="pacientes" onclick="openModule('pacientes')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Pacientes</span>
              </button>
              <button type="button" data-module="pos" onclick="openModule('pos')"
                class="nav-leaf-btn w-full flex items-center gap-2.5 pl-4 pr-3 py-2 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <span>Punto de Venta</span>
              </button>
            </div>
          </div>

        </nav>
      </div>

      <!-- 4. Footer Inferior con los 4 Iconos Exactos de DENT DEMO (.sidebar-footer) -->
      <div class="h-10 border-t border-white/10 grid grid-cols-4 divide-x divide-white/5 text-slate-300 bg-[#172D44] shrink-0">
        <a href="#" onclick="openModule('configuracion'); return false;" title="Configuraciones" class="flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors">
          <i data-lucide="settings" class="w-4 h-4"></i>
        </a>
        <a href="#" onclick="toggleFullScreen(); return false;" title="Pantalla completa" class="flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors">
          <i data-lucide="maximize" class="w-4 h-4"></i>
        </a>
        <a href="#" onclick="openModule('permisos'); return false;" title="Lock" class="flex items-center justify-center hover:text-white hover:bg-white/5 transition-colors">
          <i data-lucide="eye-off" class="w-4 h-4"></i>
        </a>
        <a href="logout.php" onclick="if(location.hostname.includes('github.io')||location.hostname.includes('vercel.app')||location.pathname.endsWith('.html')){localStorage.removeItem('cv_usuario');location.href='login.html';return false;}" title="Cerrar sesión" class="flex items-center justify-center hover:text-rose-300 hover:bg-white/5 transition-colors">
          <i data-lucide="power" class="w-4 h-4"></i>
        </a>
      </div>
    </div>
  </aside>
