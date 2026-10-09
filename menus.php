<?php
$usuarioMenu = htmlspecialchars($_SESSION['user'] ?? 'admin', ENT_QUOTES, 'UTF-8');
$perfilMenu  = htmlspecialchars(ucfirst(strtolower($_SESSION['perfil'] ?? 'Administrador')), ENT_QUOTES, 'UTF-8');
?>
  <link rel="stylesheet" href="BranchedMenu.css">

  <!-- ========================================================================= -->
  <!-- BARRA LATERAL IZQUIERDA ESTILO DENT DEMO CON @react-bits/BranchedMenu     -->
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

      <!-- 3. Menú Jerárquico de DENT DEMO renderizado con @react-bits/BranchedMenu-JS-CSS -->
      <div class="p-3.5 flex-1 overflow-y-auto table-scroll">
        <nav id="dentBranchedMenu" class="branched-menu" aria-label="Navegación Principal Dent">
          <span id="bmMarker" class="branched-menu__marker" aria-hidden="true"></span>
          <div id="bmSectionsContainer"></div>
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

  <script>
    // =========================================================================
    // MOTOR OFICIAL DE @react-bits/BranchedMenu-JS-CSS CON LA JERARQUÍA DE DENT DEMO
    // =========================================================================
    (function () {
      const BM_ROW = 32;
      const BM_SUB_ROW = 29;
      const BM_INDENT = 30;
      const BM_SUB_INDENT = 24;
      const BM_PAD_Y = 4;

      const BM_ITEMS = [
        {
          label: 'Inicio',
          value: 'inicio',
          icon: 'home'
        },
        {
          label: 'Estadisticas',
          value: 'sec-estadisticas',
          icon: 'bar-chart-2',
          children: [
            { label: 'Control Laboratorio', value: 'control-lab', icon: 'activity' },
            { label: 'Paquetes vencidos', value: 'paquetes-vencidos', icon: 'package-x' },
            { label: 'Finanzas', value: 'finanzas', icon: 'trending-up' }
          ]
        },
        {
          label: 'Dent Lab',
          value: 'sec-dentlab',
          icon: 'flask-conical',
          children: [
            {
              label: 'Control de Equipos',
              value: 'sub-equipos',
              icon: 'briefcase',
              children: [
                { label: 'Equipos en Préstamo', value: 'equipos-prestamo', icon: 'arrow-left-right' },
                { label: 'Catálogo de Equipos', value: 'catalogo-equipos', icon: 'cpu' }
              ]
            },
            { label: 'Motivos de Cancelación', value: 'motivos-cancelacion', icon: 'ban' },
            {
              label: 'Mensajes Push',
              value: 'sub-push',
              icon: 'message-square',
              children: [
                { label: 'Tipos de Push', value: 'tipos-push', icon: 'tag' },
                { label: 'Enviar Push', value: 'mensajes-push', icon: 'send' }
              ]
            },
            { label: 'Paquetes', value: 'paquetes', icon: 'package' },
            { label: 'Productos', value: 'productos-app', icon: 'box' },
            {
              label: 'Discos',
              value: 'sub-discos',
              icon: 'disc',
              children: [
                { label: 'Inventario de Discos', value: 'inventario-discos', icon: 'layers' },
                { label: 'Historial de Discos', value: 'historial-discos', icon: 'history' },
                { label: 'Uso de Discos', value: 'uso-discos', icon: 'pie-chart' }
              ]
            },
            { label: 'BanersApp', value: 'baners-app', icon: 'layout' },
            {
              label: 'Recordatorios',
              value: 'sub-recordatorios',
              icon: 'bell',
              children: [
                { label: 'Tipos de Recordatorios', value: 'tipos-recordatorio', icon: 'bookmark' },
                { label: 'Recordatorios', value: 'recordatorios', icon: 'calendar-clock' }
              ]
            },
            { label: 'Marcas de Discos', value: 'marcas-discos', icon: 'award' },
            {
              label: 'Doctores',
              value: 'sub-doctores',
              icon: 'stethoscope',
              children: [
                { label: 'Tipos de Doctores', value: 'doctores-tipos', icon: 'user-cog' },
                { label: 'Paquetes Doctores', value: 'paquetes-doctores', icon: 'package-check' },
                { label: 'Doctores sin Paquetes', value: 'doctores-sin-paquetes', icon: 'user-minus' },
                { label: 'Lista de Doctores', value: 'listados-doctores', icon: 'users' }
              ]
            },
            { label: 'Categorías', value: 'categorias', icon: 'list' },
            {
              label: 'Cuentas por Cobrar',
              value: 'sub-cxc',
              icon: 'dollar-sign',
              children: [
                { label: 'Pendientes de Pago', value: 'pendientes-pago', icon: 'clock' },
                { label: 'Pagos Realizados', value: 'pagos-realizados', icon: 'check-circle-2' },
                { label: 'Historial de Abonos', value: 'historial-abonos', icon: 'receipt' }
              ]
            },
            {
              label: 'Órdenes',
              value: 'sub-ordenes',
              icon: 'clipboard-list',
              children: [
                { label: 'Lista de Órdenes', value: 'lista-ordenes', icon: 'file-text' },
                { label: 'Órdenes Canceladas', value: 'ordenes-canceladas', icon: 'file-x' }
              ]
            },
            { label: 'Colorímetro', value: 'colorimetro', icon: 'palette' },
            { label: 'Vendedores', value: 'vendedores', icon: 'user-check' },
            { label: 'Usuarios', value: 'usuarios', icon: 'users' }
          ]
        },
        {
          label: 'Dent SPA',
          value: 'sec-dentspa',
          icon: 'heart',
          children: [
            { label: 'Empresas', value: 'empresas', icon: 'building-2' },
            { label: 'Empleados', value: 'empleados', icon: 'id-card' },
            { label: 'Encuestas', value: 'encuestas', icon: 'star' }
          ]
        },
        {
          label: 'Dent Clinic',
          value: 'sec-dentclinic',
          icon: 'user-plus',
          children: [
            { label: 'Empresas', value: 'empresas-clinic', icon: 'building' },
            { label: 'Empleados', value: 'empleados-clinic', icon: 'users' },
            { label: 'Encuestas', value: 'encuestas-clinic', icon: 'clipboard-check' },
            { label: 'Productos', value: 'productos-clinica', icon: 'sparkles' },
            { label: 'Ventas', value: 'ventas', icon: 'shopping-bag' },
            { label: 'Pacientes', value: 'pacientes', icon: 'heart-handshake' },
            { label: 'Punto de Venta', value: 'pos', icon: 'credit-card' }
          ]
        }
      ];

      let bmState = {
        openSection: 2, // Dent Lab abierto por defecto
        openSubs: {},   // Subgrupos abiertos dentro de Dent Lab
        active: 'inicio'
      };

      function buildSubBranchTree(subItem) {
        const kids = subItem.children || [];
        const n = kids.length;
        const bodyH = n * BM_SUB_ROW + 4;
        const trunk = Math.round(BM_SUB_INDENT * 0.28);
        const endX = BM_SUB_INDENT - 4;
        const r = Math.min(7, Math.floor((endX - trunk) * 0.6));
        const midY = idx => Math.round(2 + idx * BM_SUB_ROW + BM_SUB_ROW / 2);
        const lastY = n > 0 ? midY(n - 1) : 2;
        const baseTrunk = n > 0 ? `M ${trunk} 2 V ${Math.max(2, lastY - r)}` : '';

        let baseBranches = '';
        let reachBranches = '';
        let kidButtons = '';

        kids.forEach((kid, j) => {
          const y = midY(j);
          const span = Math.max(1, endX - trunk - r);
          const totalLen = Math.max(0, y - r - 2) + Math.PI * r * 0.5 + span;
          const isAct = bmState.active === kid.value;
          const dashOffset = isAct ? 0 : totalLen;

          baseBranches += `<path class="branched-menu__base" d="M ${trunk} ${Math.max(2, y - r)} A ${r} ${r} 0 0 0 ${trunk + r} ${y} H ${endX}" />`;
          reachBranches += `<path class="branched-menu__reach" d="M ${trunk} 2 V ${Math.max(2, y - r)} A ${r} ${r} 0 0 0 ${trunk + r} ${y} H ${endX}" style="stroke-dasharray: ${totalLen}; stroke-dashoffset: ${dashOffset};" />`;

          kidButtons += `
            <button type="button"
              data-module="${kid.value}"
              class="branched-menu__item nav-leaf-btn"
              ${isAct ? 'data-active=""' : ''}
              onclick="window.bmSelectLeaf('${kid.value}')">
              <span class="branched-menu__icon">
                <i data-lucide="${kid.icon || 'circle'}" class="w-3 h-3"></i>
              </span>
              <span class="branched-menu__label">${kid.label}</span>
            </button>
          `;
        });

        return `
          <div class="branched-menu__sub-tree" style="height: ${bodyH}px;">
            <svg class="branched-menu__lines" width="${BM_SUB_INDENT}" height="${bodyH}" aria-hidden="true">
              <path class="branched-menu__base" d="${baseTrunk}" />
              ${baseBranches}
              ${reachBranches}
            </svg>
            ${kidButtons}
          </div>
        `;
      }

      function renderBranchedMenu() {
        const container = document.getElementById('bmSectionsContainer');
        if (!container) return;

        container.innerHTML = BM_ITEMS.map((item, i) => {
          const kids = item.children || [];
          const hasKids = kids.length > 0;
          const isOpen = bmState.openSection === i;
          const isLeafActive = !hasKids && bmState.active === item.value;

          if (!hasKids) {
            return `
              <div class="branched-menu__section" data-sec-idx="${i}">
                <button type="button"
                  data-module="${item.value}"
                  class="branched-menu__head nav-leaf-btn"
                  ${isLeafActive ? 'data-active=""' : ''}
                  onclick="window.bmSelectLeaf('${item.value}', ${i})">
                  <span class="branched-menu__head-left">
                    <i data-lucide="${item.icon || 'circle'}" class="w-4 h-4"></i>
                    <span>${item.label}</span>
                  </span>
                </button>
              </div>
            `;
          }

          // Calcular posiciones Y dinámicas de cada hijo considerando subgrupos desplegados
          const trunk = Math.round(BM_INDENT * 0.34);
          const endX = BM_INDENT - 5;
          const r = Math.min(8, Math.floor((endX - trunk) * 0.65));

          let currentY = BM_PAD_Y;
          const rowCenters = [];
          kids.forEach(kid => {
            rowCenters.push(Math.round(currentY + BM_ROW / 2));
            currentY += BM_ROW;
            if (kid.children && bmState.openSubs[kid.value]) {
              currentY += kid.children.length * BM_SUB_ROW + 4;
            }
          });
          const bodyH = currentY + BM_PAD_Y;
          const lastY = rowCenters.length > 0 ? rowCenters[rowCenters.length - 1] : BM_PAD_Y;
          const baseTrunk = rowCenters.length > 0 ? `M ${trunk} ${BM_PAD_Y} V ${Math.max(BM_PAD_Y, lastY - r)}` : '';

          let baseBranches = '';
          let reachBranches = '';
          let kidButtons = '';

          kids.forEach((kid, j) => {
            const y = rowCenters[j];
            const span = Math.max(1, endX - trunk - r);
            const totalLen = Math.max(0, y - r - BM_PAD_Y) + Math.PI * r * 0.5 + span;
            const hasSubKids = Array.isArray(kid.children) && kid.children.length > 0;
            const isSubOpen = !!bmState.openSubs[kid.value];
            const isAct = hasSubKids
              ? kid.children.some(sk => sk.value === bmState.active)
              : bmState.active === kid.value;
            const dashOffset = isAct ? 0 : totalLen;

            baseBranches += `<path class="branched-menu__base" d="M ${trunk} ${Math.max(BM_PAD_Y, y - r)} A ${r} ${r} 0 0 0 ${trunk + r} ${y} H ${endX}" />`;
            reachBranches += `<path class="branched-menu__reach" d="M ${trunk} ${BM_PAD_Y} V ${Math.max(BM_PAD_Y, y - r)} A ${r} ${r} 0 0 0 ${trunk + r} ${y} H ${endX}" style="stroke-dasharray: ${totalLen}; stroke-dashoffset: ${dashOffset};" />`;

            if (hasSubKids) {
              kidButtons += `
                <div class="branched-menu__sub" ${isSubOpen ? 'data-open=""' : ''}>
                  <button type="button"
                    class="branched-menu__sub-head"
                    onclick="window.bmToggleSub('${kid.value}')">
                    <span class="inline-flex items-center gap-2 min-w-0">
                      <span class="branched-menu__icon">
                        <i data-lucide="${kid.icon || 'folder'}" class="w-3.5 h-3.5"></i>
                      </span>
                      <span class="branched-menu__label">${kid.label}</span>
                    </span>
                    <svg class="branched-menu__chevron shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div class="branched-menu__sub-body">
                    <div class="branched-menu__fold">
                      ${buildSubBranchTree(kid)}
                    </div>
                  </div>
                </div>
              `;
            } else {
              kidButtons += `
                <button type="button"
                  data-module="${kid.value}"
                  class="branched-menu__item nav-leaf-btn"
                  ${isAct ? 'data-active=""' : ''}
                  onclick="window.bmSelectLeaf('${kid.value}')">
                  <span class="branched-menu__icon">
                    <i data-lucide="${kid.icon || 'circle'}" class="w-3.5 h-3.5"></i>
                  </span>
                  <span class="branched-menu__label">${kid.label}</span>
                </button>
              `;
            }
          });

          return `
            <div class="branched-menu__section" data-sec-idx="${i}" ${isOpen ? 'data-open=""' : ''}>
              <button type="button"
                class="branched-menu__head"
                aria-expanded="${isOpen ? 'true' : 'false'}"
                onclick="window.bmToggleSection(${i})">
                <span class="branched-menu__head-left">
                  <i data-lucide="${item.icon || 'folder'}" class="w-4 h-4"></i>
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
        updateBranchedMarker();
      }

      function updateBranchedMarker() {
        const marker = document.getElementById('bmMarker');
        if (!marker) return;

        let activeSectionIdx = -1;
        BM_ITEMS.forEach((it, idx) => {
          if (!it.children && it.value === bmState.active) {
            activeSectionIdx = idx;
          } else if (it.children) {
            const match = it.children.some(k =>
              k.value === bmState.active || (k.children && k.children.some(sk => sk.value === bmState.active))
            );
            if (match) activeSectionIdx = idx;
          }
        });

        const targetIdx = bmState.openSection !== null ? bmState.openSection : activeSectionIdx;
        if (targetIdx === null || targetIdx < 0) {
          marker.removeAttribute('data-on');
          return;
        }

        const secEl = document.querySelector(`.branched-menu__section[data-sec-idx="${targetIdx}"] > .branched-menu__head`);
        if (!secEl) {
          marker.removeAttribute('data-on');
          return;
        }

        const top = secEl.offsetTop + (secEl.offsetHeight - marker.offsetHeight) / 2;
        marker.style.top = `${top}px`;
        marker.setAttribute('data-on', '');
      }

      window.bmToggleSection = function (idx) {
        bmState.openSection = bmState.openSection === idx ? null : idx;
        renderBranchedMenu();
      };

      window.bmToggleSub = function (subValue) {
        bmState.openSubs[subValue] = !bmState.openSubs[subValue];
        renderBranchedMenu();
      };

      window.bmSelectLeaf = function (moduleValue, secIdx = null) {
        bmState.active = moduleValue;
        if (secIdx !== null) {
          bmState.openSection = null;
        } else {
          BM_ITEMS.forEach((it, idx) => {
            if (!it.children) return;
            it.children.forEach(k => {
              if (k.value === moduleValue) {
                bmState.openSection = idx;
              } else if (k.children && k.children.some(sk => sk.value === moduleValue)) {
                bmState.openSection = idx;
                bmState.openSubs[k.value] = true;
              }
            });
          });
        }
        renderBranchedMenu();
        if (typeof openModule === 'function') {
          openModule(moduleValue);
        }
      };

      window.bmSyncActiveState = function (moduleKey) {
        if (bmState.active === moduleKey) return;
        bmState.active = moduleKey;
        BM_ITEMS.forEach((it, idx) => {
          if (!it.children && it.value === moduleKey) {
            bmState.openSection = null;
          } else if (it.children) {
            it.children.forEach(k => {
              if (k.value === moduleKey) {
                bmState.openSection = idx;
              } else if (k.children && k.children.some(sk => sk.value === moduleKey)) {
                bmState.openSection = idx;
                bmState.openSubs[k.value] = true;
              }
            });
          }
        });
        renderBranchedMenu();
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderBranchedMenu);
      } else {
        renderBranchedMenu();
      }
    })();
  </script>
