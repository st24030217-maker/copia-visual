<?php
$usuarioMenu = htmlspecialchars($_SESSION['user'] ?? 'Admin', ENT_QUOTES, 'UTF-8');
?>
  <link rel="stylesheet" href="BranchedMenu.css">

  <!-- ========================================================================= -->
  <!-- BARRA LATERAL IZQUIERDA CON @react-bits/BranchedMenu-JS-CSS               -->
  <!-- ========================================================================= -->
  <aside id="sidebar" class="w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 transition-all duration-200 border-r border-slate-800">
    <div class="flex flex-col h-full overflow-hidden">
      
      <!-- Logo Oficial en Blanco y CAD/CAM -->
      <div class="h-16 px-5 flex items-center gap-3 border-b border-slate-800 bg-slate-950/40 shrink-0">
        <img src="assets/logoDentlab.png" alt="Dent Lab" class="h-8 w-auto max-w-[140px] object-contain brightness-0 invert opacity-95">
        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-700/60 ml-auto font-semibold">CAD/CAM</span>
      </div>

      <!-- Contenedor Scrollable del BranchedMenu (@react-bits/BranchedMenu-JS-CSS) -->
      <div class="p-3.5 flex-1 overflow-y-auto table-scroll">
        <h3 class="px-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Menú Principal</h3>
        
        <!-- Instancia de @react-bits/BranchedMenu-JS-CSS -->
        <nav id="dentBranchedMenu" class="branched-menu" aria-label="Navegación Principal Dent">
          <span id="bmMarker" class="branched-menu__marker" aria-hidden="true"></span>
          <div id="bmSectionsContainer"></div>
        </nav>
      </div>

      <!-- Info de Usuario con Logo DentLab Original (Parte inferior de la barra lateral) -->
      <div class="p-3 border-t border-slate-800/80 bg-slate-950/60 shrink-0">
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
      <div class="h-12 border-t border-slate-800 px-4 flex items-center justify-around text-slate-400 bg-slate-900 shrink-0">
        <a href="#" onclick="openModule('configuracion'); return false;" title="Configuraciones" class="hover:text-white transition-colors">
          <i data-lucide="settings" class="w-4 h-4"></i>
        </a>
        <a href="#" onclick="toggleFullScreen(); return false;" title="Pantalla completa" class="hover:text-white transition-colors">
          <i data-lucide="maximize" class="w-4 h-4"></i>
        </a>
        <a href="#" onclick="openModule('permisos'); return false;" title="Permisos de Seguridad" class="hover:text-white transition-colors">
          <i data-lucide="lock" class="w-4 h-4"></i>
        </a>
        <a href="logout.php" onclick="if(location.hostname.includes('github.io')||location.hostname.includes('vercel.app')||location.pathname.endsWith('.html')){localStorage.removeItem('cv_usuario');location.href='login.html';return false;}" title="Cerrar sesión" class="hover:text-rose-400 transition-colors">
          <i data-lucide="power" class="w-4 h-4"></i>
        </a>
      </div>
    </div>
  </aside>

  <script>
    // =========================================================================
    // IMPLEMENTACIÓN EXACTA DE @react-bits/BranchedMenu-JS-CSS EN VANILLA JS
    // Con tronco vertical, ramas curvas SVG, animación stroke-dashoffset y marker
    // =========================================================================
    (function initBranchedMenu() {
      const BM_PAD = 6;
      const BM_MARK = 18;
      const BM_ROW_HEIGHT = 32;
      const BM_INDENT = 34;
      const BM_TRUNK = 11;
      const BM_RADIUS = 9;

      const BM_ITEMS = [
        {
          value: 'inicio',
          label: 'Inicio',
          icon: 'home'
        },
        {
          label: 'Estadísticas',
          icon: 'bar-chart-3',
          children: [
            { value: 'estadisticas-lab', label: 'Control de Laboratorio', icon: 'activity' },
            { value: 'graficos', label: 'Gráficos', icon: 'pie-chart' }
          ]
        },
        {
          label: 'Dent Lab',
          icon: 'flask-conical',
          children: [
            { value: 'equipos-prestamo', label: 'Equipos en Préstamo', icon: 'briefcase' },
            { value: 'catalogo-equipos', label: 'Catálogo Equipos', icon: 'cpu' },
            { value: 'historico-equipos', label: 'Histórico de Equipos', icon: 'history' },
            { value: 'motivos-cancelacion', label: 'Motivos de Cancelación', icon: 'alert-circle' },
            { value: 'mensajes-push', label: 'Lista Mensajes Push', icon: 'message-square' },
            { value: 'tipos-push', label: 'Tipos Push', icon: 'bell' },
            { value: 'paquetes', label: 'Paquetes', icon: 'archive' },
            { value: 'productos-app', label: 'Productos', icon: 'box' },
            { value: 'inventario-discos', label: 'Inventario de Discos', icon: 'disc' },
            { value: 'discos-activos', label: 'Discos Activos', icon: 'check-circle-2' },
            { value: 'discos-usados', label: 'Discos Usados', icon: 'layers' },
            { value: 'archivos-erroneos', label: 'Archivos Erróneos', icon: 'file-warning' },
            { value: 'archivos-autorizar', label: 'Archivos por autorizar', icon: 'file-check-2' },
            { value: 'baners-app', label: 'BanersApp', icon: 'layout' },
            { value: 'recordatorios', label: 'Recordatorios', icon: 'pin' },
            { value: 'tipos-recordatorio', label: 'Tipos de Recordatorio', icon: 'tag' },
            { value: 'marcas-discos', label: 'Marcas de Discos', icon: 'award' },
            { value: 'doctores-tipos', label: 'Doctores Tipos', icon: 'stethoscope' },
            { value: 'listado-doctores', label: 'Listado doctores', icon: 'users' },
            { value: 'paquetes-doctores', label: 'Listado Paquetes', icon: 'package-check' },
            { value: 'nuevo-doctor', label: 'Nuevo doctor', icon: 'user-plus' },
            { value: 'doctores-inactivos', label: 'Doctores sin paquetes (3m)', icon: 'user-x' },
            { value: 'categorias', label: 'Categorías', icon: 'list-ordered' },
            { value: 'lista-ordenes', label: 'Lista de Órdenes', icon: 'files' },
            { value: 'colorimetro', label: 'Colorímetro Colores', icon: 'palette' },
            { value: 'vendedor', label: 'Vendedor', icon: 'briefcase' },
            { value: 'vendedores-detalle', label: 'Vendedores', icon: 'users' },
            { value: 'usuarios', label: 'Usuarios', icon: 'user-circle' }
          ]
        },
        {
          label: 'Dent SPA',
          icon: 'heart',
          children: [
            { value: 'nueva-empresa', label: 'Nueva Empresa (Convenios)', icon: 'building' }
          ]
        },
        {
          label: 'Dent Clinic',
          icon: 'building-2',
          children: [
            { value: 'encuestas', label: 'Encuestas de satisfacción', icon: 'file-check' },
            { value: 'productos-servicios', label: 'Productos / Servicios', icon: 'package' },
            { value: 'puntos-productos', label: 'Puntos productos', icon: 'sparkles' },
            { value: 'tarjeta-clientes', label: 'Tarjeta de Clientes', icon: 'credit-card' },
            { value: 'lista-empresas', label: 'Lista de Empresas', icon: 'building-2' },
            { value: 'representantes-venta', label: 'Representantes de Venta', icon: 'badge-Check' },
            { value: 'empleados', label: 'Empleados Convenio', icon: 'id-card' },
            { value: 'realizar-venta', label: 'Realizar Venta (POS)', icon: 'shopping-bag' },
            { value: 'listado-ventas', label: 'Listado de Ventas', icon: 'receipt' },
            { value: 'lista-pacientes', label: 'Lista de Pacientes', icon: 'users' }
          ]
        }
      ];

      // Estado del BranchedMenu: sección Dent Lab (índice 2) abierta por defecto y 'inicio' activo
      const bmState = {
        open: new Set([2]),
        active: 'inicio'
      };

      const r = Math.min(BM_RADIUS, BM_ROW_HEIGHT / 2 - 2);
      const endX = BM_INDENT - 8;
      const rowY = k => BM_PAD + k * BM_ROW_HEIGHT + BM_ROW_HEIGHT / 2;
      const branchPath = k => `M ${BM_TRUNK} ${rowY(k) - r} A ${r} ${r} 0 0 0 ${BM_TRUNK + r} ${rowY(k)} H ${endX}`;
      const reachPath = k => `M ${BM_TRUNK} 0 V ${rowY(k) - r} A ${r} ${r} 0 0 0 ${BM_TRUNK + r} ${rowY(k)} H ${endX}`;
      const pathLength = k => rowY(k) - r + (Math.PI * r) / 2 + (endX - BM_TRUNK - r);

      function renderBranchedMenuDOM() {
        const container = document.getElementById('bmSectionsContainer');
        if (!container) return;

        container.innerHTML = BM_ITEMS.map((item, i) => {
          const kids = item.children;
          const isOpen = kids ? bmState.open.has(i) : false;
          const leafValue = item.value || item.label;
          const leafActive = !kids && leafValue === bmState.active;
          const bodyH = kids ? BM_PAD * 2 + kids.length * BM_ROW_HEIGHT : 0;

          if (!kids) {
            return `
              <div class="branched-menu__section" data-section-index="${i}">
                <button type="button"
                  id="bm-head-${i}"
                  class="branched-menu__head nav-leaf-btn"
                  data-module="${leafValue}"
                  ${leafActive ? 'data-active="" aria-current="true"' : ''}
                  onclick="window.bmSelectItem('${leafValue}')">
                  <span class="branched-menu__head-left">
                    <i data-lucide="${item.icon || 'circle'}" class="w-4 h-4 text-blue-400"></i>
                    <span>${item.label}</span>
                  </span>
                </button>
              </div>
            `;
          }

          const baseTrunk = `M ${BM_TRUNK} 0 V ${rowY(kids.length - 1) - r}`;
          const baseBranches = kids.map((_, k) => `<path class="branched-menu__base" d="${branchPath(k)}" />`).join('');
          const reachBranches = kids.map((kid, k) => {
            const len = pathLength(k).toFixed(2);
            const offset = kid.value === bmState.active ? '0' : len;
            return `<path id="bm-reach-${i}-${k}" data-value="${kid.value}" data-len="${len}" class="branched-menu__reach" d="${reachPath(k)}" style="stroke-dasharray: ${len}; stroke-dashoffset: ${offset};" />`;
          }).join('');

          const kidButtons = kids.map((kid, k) => {
            const isAct = kid.value === bmState.active;
            return `
              <button type="button"
                class="branched-menu__item nav-leaf-btn"
                data-module="${kid.value}"
                ${isAct ? 'data-active="" aria-current="true"' : ''}
                onclick="window.bmSelectItem('${kid.value}')">
                <span class="branched-menu__icon" aria-hidden="true">
                  <i data-lucide="${kid.icon || 'dot'}" class="w-3.5 h-3.5"></i>
                </span>
                <span class="branched-menu__label">${kid.label}</span>
              </button>
            `;
          }).join('');

          return `
            <div id="bm-sec-${i}" class="branched-menu__section" data-section-index="${i}" ${isOpen ? 'data-open=""' : ''}>
              <button type="button"
                id="bm-head-${i}"
                class="branched-menu__head"
                aria-expanded="${isOpen ? 'true' : 'false'}"
                onclick="window.bmToggleSection(${i})">
                <span class="branched-menu__head-left">
                  <i data-lucide="${item.icon || 'folder'}" class="w-4 h-4 text-blue-400"></i>
                  <span>${item.label}</span>
                </span>
                <svg class="branched-menu__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div class="branched-menu__body">
                <div class="branched-menu__fold">
                  <div class="branched-menu__tree" style="height: ${bodyH}px;">
                    <svg class="branched-menu__lines" width="${BM_INDENT}" height="${bodyH}" aria-hidden="true">
                      <path class="branched-menu__base" d="${baseTrunk}" />
                      ${baseBranches}
                      ${reachBranches}
                    </svg>
                    ${kidButtons}
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');

        if (window.lucide) lucide.createIcons();
        updateBranchedMarker(false);
      }

      function updateBranchedMarker(glide = true) {
        const marker = document.getElementById('bmMarker');
        if (!marker) return;

        let activeSectionIdx = -1;
        BM_ITEMS.forEach((it, idx) => {
          if (!it.children && it.value === bmState.active) {
            activeSectionIdx = idx;
          } else if (it.children && it.children.some(k => k.value === bmState.active)) {
            activeSectionIdx = idx;
          }
        });

        const headEl = document.getElementById(`bm-head-${activeSectionIdx}`);
        const isShown = activeSectionIdx >= 0 && headEl && (!BM_ITEMS[activeSectionIdx].children || bmState.open.has(activeSectionIdx));

        if (!glide) marker.style.transition = 'none';
        if (isShown && headEl) {
          marker.style.top = `${headEl.offsetTop + (headEl.offsetHeight - BM_MARK) / 2}px`;
        }
        if (isShown) {
          marker.setAttribute('data-on', '');
        } else {
          marker.removeAttribute('data-on');
        }
        if (!glide) {
          void marker.offsetHeight;
          marker.style.transition = '';
        }
      }

      window.bmToggleSection = function(index) {
        const secEl = document.getElementById(`bm-sec-${index}`);
        const headEl = document.getElementById(`bm-head-${index}`);
        if (bmState.open.has(index)) {
          bmState.open.delete(index);
          if (secEl) secEl.removeAttribute('data-open');
          if (headEl) headEl.setAttribute('aria-expanded', 'false');
        } else {
          bmState.open.add(index);
          if (secEl) secEl.setAttribute('data-open', '');
          if (headEl) headEl.setAttribute('aria-expanded', 'true');
        }
        updateBranchedMarker(true);
      };

      window.bmSyncActiveState = function(moduleKey) {
        bmState.active = moduleKey;

        // Si pertenece a una sección con hijos, asegurarnos de abrir esa sección para lucir la rama curva animada
        BM_ITEMS.forEach((it, idx) => {
          if (it.children && it.children.some(k => k.value === moduleKey)) {
            bmState.open.add(idx);
            const secEl = document.getElementById(`bm-sec-${idx}`);
            const headEl = document.getElementById(`bm-head-${idx}`);
            if (secEl) secEl.setAttribute('data-open', '');
            if (headEl) headEl.setAttribute('aria-expanded', 'true');
          }
        });

        // Actualizar data-active en botones raíz e hijos
        document.querySelectorAll('#dentBranchedMenu [data-module]').forEach(btn => {
          if (btn.getAttribute('data-module') === moduleKey) {
            btn.setAttribute('data-active', '');
            btn.setAttribute('aria-current', 'true');
          } else {
            btn.removeAttribute('data-active');
            btn.removeAttribute('aria-current');
          }
        });

        // Animar el trazo SVG (.branched-menu__reach) hasta el hijo seleccionado
        document.querySelectorAll('#dentBranchedMenu .branched-menu__reach').forEach(path => {
          const val = path.getAttribute('data-value');
          const len = path.getAttribute('data-len');
          path.style.strokeDashoffset = (val === moduleKey) ? '0' : len;
        });

        updateBranchedMarker(true);
      };

      window.bmSelectItem = function(moduleKey) {
        window.bmSyncActiveState(moduleKey);
        if (typeof openModule === 'function') {
          openModule(moduleKey);
        }
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderBranchedMenuDOM);
      } else {
        renderBranchedMenuDOM();
      }
    })();
  </script>
