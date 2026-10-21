/**
 * @aceternity/expandable-card-demo-standard
 * Shared-layout FLIP spring expandable card + automatic modal FLIP animation from clicked trigger.
 */
(function () {
  let lastTriggerRect = null;
  let lastTriggerEl = null;
  let activeCardConfig = null;
  let isClosing = false;

  // Registrar siempre el último elemento interactivo presionado para el origen de la animación FLIP (layoutId)
  document.addEventListener(
    'pointerdown',
    event => {
      const target = event.target.closest('button, a, [data-expandable], tr');
      if (target && !target.closest('#aceternityExpandableCard') && !target.closest('.aceternity-ec-close')) {
        lastTriggerEl = target;
        lastTriggerRect = target.getBoundingClientRect();
      }
    },
    true
  );

  function ensureExpandableCardDOM() {
    let backdrop = document.getElementById('aceternityEcBackdrop');
    let wrapper = document.getElementById('aceternityEcWrapper');
    if (backdrop && wrapper) return { backdrop, wrapper, card: document.getElementById('aceternityExpandableCard') };

    backdrop = document.createElement('div');
    backdrop.id = 'aceternityEcBackdrop';
    backdrop.className = 'aceternity-ec-backdrop';
    backdrop.setAttribute('data-open', 'false');

    wrapper = document.createElement('div');
    wrapper.id = 'aceternityEcWrapper';
    wrapper.className = 'aceternity-ec-wrapper hidden';
    wrapper.setAttribute('data-open', 'false');

    wrapper.innerHTML = `
      <div id="aceternityExpandableCard" class="aceternity-ec-card" role="dialog" aria-modal="true">
        <button type="button" class="aceternity-ec-close" onclick="window.closeExpandableCard()" aria-label="Cerrar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        <div class="aceternity-ec-image-wrap">
          <img id="aceternityEcImg" src="assets/dental_cadcam.jpg" alt="" class="aceternity-ec-image" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/45 to-slate-900/15"></div>
          <div id="aceternityEcImageOverlay" class="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between text-white"></div>
        </div>

        <div class="flex flex-col flex-1 min-h-0">
          <div class="flex items-start justify-between gap-3 p-5 border-b border-slate-100">
            <div class="min-w-0">
              <h3 id="aceternityEcTitle" class="font-bold text-slate-900 text-base leading-snug truncate"></h3>
              <p id="aceternityEcDescription" class="text-slate-500 text-xs mt-0.5"></p>
            </div>
            <button id="aceternityEcCta" type="button"
              class="shrink-0 px-4 py-2 text-xs rounded-full font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors inline-flex items-center gap-1.5">
            </button>
          </div>

          <div class="pt-4 px-5 pb-6 overflow-y-auto aceternity-ec-body-content" id="aceternityEcContent"></div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(wrapper);

    // useOutsideClick (@aceternity/expandable-card-demo-standard)
    wrapper.addEventListener('mousedown', e => {
      const card = document.getElementById('aceternityExpandableCard');
      if (card && !card.contains(e.target)) {
        window.closeExpandableCard();
      }
    });

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && wrapper.getAttribute('data-open') === 'true') {
        window.closeExpandableCard();
      }
    });

    return { backdrop, wrapper, card: document.getElementById('aceternityExpandableCard') };
  }

  function animateFlipIn(cardEl, sourceRect) {
    if (!cardEl) return;
    const targetRect = cardEl.getBoundingClientRect();
    if (!sourceRect || targetRect.width === 0 || targetRect.height === 0) {
      cardEl.animate(
        [
          { opacity: 0, transform: 'scale(0.92) translateY(12px)' },
          { opacity: 1, transform: 'scale(1) translateY(0)' }
        ],
        { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
      );
      return;
    }

    const sourceCx = sourceRect.left + sourceRect.width / 2;
    const sourceCy = sourceRect.top + sourceRect.height / 2;
    const targetCx = targetRect.left + targetRect.width / 2;
    const targetCy = targetRect.top + targetRect.height / 2;

    const dx = sourceCx - targetCx;
    const dy = sourceCy - targetCy;
    const sx = Math.max(0.14, Math.min(0.92, sourceRect.width / targetRect.width));
    const sy = Math.max(0.1, Math.min(0.92, sourceRect.height / targetRect.height));

    cardEl.animate(
      [
        {
          opacity: 0.35,
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`,
          borderRadius: '16px'
        },
        {
          opacity: 1,
          transform: 'translate3d(0, 0, 0) scale(1, 1)',
          borderRadius: '24px'
        }
      ],
      {
        duration: 380,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      }
    );
  }

  function animateFlipOut(cardEl, sourceRect, onFinish) {
    if (!cardEl) {
      if (onFinish) onFinish();
      return;
    }
    const targetRect = cardEl.getBoundingClientRect();
    if (!sourceRect || targetRect.width === 0) {
      const anim = cardEl.animate(
        [
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0.92) translateY(8px)' }
        ],
        { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
      );
      anim.onfinish = () => onFinish && onFinish();
      return;
    }

    const sourceCx = sourceRect.left + sourceRect.width / 2;
    const sourceCy = sourceRect.top + sourceRect.height / 2;
    const targetCx = targetRect.left + targetRect.width / 2;
    const targetCy = targetRect.top + targetRect.height / 2;

    const dx = sourceCx - targetCx;
    const dy = sourceCy - targetCy;
    const sx = Math.max(0.14, Math.min(0.92, sourceRect.width / targetRect.width));
    const sy = Math.max(0.1, Math.min(0.92, sourceRect.height / targetRect.height));

    const anim = cardEl.animate(
      [
        {
          opacity: 1,
          transform: 'translate3d(0, 0, 0) scale(1, 1)'
        },
        {
          opacity: 0,
          transform: `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`
        }
      ],
      {
        duration: 240,
        easing: 'cubic-bezier(0.32, 0, 0.67, 0)',
        fill: 'forwards'
      }
    );
    anim.onfinish = () => onFinish && onFinish();
  }

  window.openExpandableCard = function openExpandableCard(config) {
    const { backdrop, wrapper, card } = ensureExpandableCardDOM();
    activeCardConfig = config;
    isClosing = false;

    const imgEl = document.getElementById('aceternityEcImg');
    const overlayEl = document.getElementById('aceternityEcImageOverlay');
    const titleEl = document.getElementById('aceternityEcTitle');
    const descEl = document.getElementById('aceternityEcDescription');
    const ctaEl = document.getElementById('aceternityEcCta');
    const contentEl = document.getElementById('aceternityEcContent');

    if (imgEl) imgEl.src = config.src || 'assets/dental_cadcam.jpg';
    if (overlayEl) overlayEl.innerHTML = config.overlayHtml || '';
    if (titleEl) titleEl.textContent = config.title || '';
    if (descEl) descEl.textContent = config.description || '';
    if (ctaEl) {
      ctaEl.innerHTML = config.ctaHtml || `<span>${config.ctaText || 'Abrir'}</span>`;
      ctaEl.onclick = () => {
        if (typeof config.onCtaClick === 'function') {
          config.onCtaClick();
        }
      };
    }
    if (contentEl) {
      contentEl.innerHTML = typeof config.content === 'function' ? config.content() : (config.content || '');
    }

    wrapper.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Capturar rect actualizado si el elemento sigue visible
    const rect =
      lastTriggerEl && document.body.contains(lastTriggerEl)
        ? lastTriggerEl.getBoundingClientRect()
        : lastTriggerRect;

    requestAnimationFrame(() => {
      backdrop.setAttribute('data-open', 'true');
      wrapper.setAttribute('data-open', 'true');
      animateFlipIn(card, rect);
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  };

  window.closeExpandableCard = function closeExpandableCard(afterClose) {
    const backdrop = document.getElementById('aceternityEcBackdrop');
    const wrapper = document.getElementById('aceternityEcWrapper');
    const card = document.getElementById('aceternityExpandableCard');
    if (!wrapper || wrapper.classList.contains('hidden') || isClosing) {
      if (typeof afterClose === 'function') afterClose();
      return;
    }
    isClosing = true;
    backdrop.setAttribute('data-open', 'false');
    wrapper.setAttribute('data-open', 'false');

    const rect =
      lastTriggerEl && document.body.contains(lastTriggerEl)
        ? lastTriggerEl.getBoundingClientRect()
        : lastTriggerRect;

    animateFlipOut(card, rect, () => {
      wrapper.classList.add('hidden');
      document.body.style.overflow = '';
      isClosing = false;
      if (typeof afterClose === 'function') afterClose();
    });
  };

  // =========================================================================
  // INTEGRACIÓN CON LAS FUNCIONES DEL SISTEMA (OT, DOCTOR Y MODALES)
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    const origAbrirOrden = window.abrirOrdenTrabajo;
    const origAbrirDoctor = window.abrirDetalleDoctor;

    window.abrirOrdenTrabajoCompleto = function (serie) {
      window.closeExpandableCard(() => {
        if (typeof origAbrirOrden === 'function') origAbrirOrden(serie);
      });
    };

    window.abrirDetalleDoctorCompleto = function (doctorNombre) {
      window.closeExpandableCard(() => {
        if (typeof origAbrirDoctor === 'function') origAbrirDoctor(doctorNombre);
      });
    };

    // Al presionar cualquier Orden de Trabajo (OT) en Escaneo, Diseño, Fabricación, Entrega o Tabla General:
    // Se despliega con la animación @aceternity/expandable-card-demo-standard
    window.abrirOrdenTrabajo = function (serie) {
      const o =
        typeof window.findOrdenByAny === 'function'
          ? window.findOrdenByAny(serie)
          : ((typeof INICIO_DATA !== 'undefined' && INICIO_DATA.ordenes) ? INICIO_DATA.ordenes.find(item => String(item.serie) === String(serie) || String(item.ot) === String(serie)) || INICIO_DATA.ordenes[0] : null);
      if (!o) {
        if (typeof origAbrirOrden === 'function') origAbrirOrden(serie);
        return;
      }

      const safeDoc = (o.doctor || '').replace(/'/g, "\\'");
      const safePac = (o.paciente || '').replace(/'/g, "\\'");

      window.openExpandableCard({
        title: `Orden #${o.serie} — ${o.producto}`,
        description: `${o.doctorNombreCompleto || o.doctor} • Paciente: ${o.paciente}`,
        src: 'assets/dental_cadcam.jpg',
        ctaHtml: `<span>Abrir Expediente</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>`,
        onCtaClick: () => window.abrirOrdenTrabajoCompleto(o.serie),
        overlayHtml: `
          <div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white mb-1">
              ${o.estado}
            </span>
            <p class="text-xs font-bold text-slate-200">Folio: #${o.serie} • ${o.paquetes || 'SIN PAQUETE'}</p>
          </div>
          <div class="text-right">
            <span class="text-[10px] uppercase tracking-wider text-slate-300 block">Entrega Solicitada</span>
            <span class="text-xs font-bold text-white">${o.entrega}</span>
          </div>
        `,
        content: () => `
          <div class="space-y-3.5 text-xs text-slate-600">
            <div class="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
              <div class="p-2 rounded-xl ${['Escaneo','Diseño','Fabricación','Entrega','Terminado'].indexOf(o.estado) >= 0 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-400'}">1. Escaneo</div>
              <div class="p-2 rounded-xl ${['Diseño','Fabricación','Entrega','Terminado'].indexOf(o.estado) >= 0 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-400'}">2. Diseño</div>
              <div class="p-2 rounded-xl ${['Fabricación','Entrega','Terminado'].indexOf(o.estado) >= 0 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-400'}">3. Fabricación</div>
              <div class="p-2 rounded-xl ${['Entrega','Terminado'].indexOf(o.estado) >= 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'}">4. Entrega</div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Unidades / Piezas</span>
                <strong class="text-slate-800">${o.unidades} pza(s) [${(o.piezas || []).join(', ')}]</strong>
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Colorímetro VITA</span>
                <strong class="text-slate-800">${o.color}</strong>
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Importe Orden</span>
                <strong class="text-slate-900">${o.monto}</strong>
              </div>
            </div>

            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Observaciones de la Orden</span>
              <p class="text-[11px] leading-relaxed text-slate-700 font-medium">${o.observaciones || 'Sin observaciones adicionales.'}</p>
            </div>

            <div class="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <button type="button" onclick="window.closeExpandableCard(() => Etiqueta('${safeDoc}', '${safePac}', '${o.entrega}', '${o.serie}'))"
                class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors inline-flex items-center gap-1.5">
                <i data-lucide="barcode" class="w-3.5 h-3.5"></i>
                <span>Imprimir Etiqueta</span>
              </button>
              <button type="button" onclick="window.abrirOrdenTrabajoCompleto('${o.serie}')"
                class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors inline-flex items-center gap-1.5">
                <i data-lucide="layers" class="w-3.5 h-3.5"></i>
                <span>Ver 4 Pestañas de la Orden</span>
              </button>
            </div>
          </div>
        `
      });
    };

    // Al presionar un Doctor en cualquiera de las tablas:
    // Se despliega con la animación @aceternity/expandable-card-demo-standard mostrando su teléfono, correo y órdenes reales
    window.abrirDetalleDoctor = function (doctorQuery) {
      const doc =
        typeof window.findDoctorByAny === 'function'
          ? window.findDoctorByAny(doctorQuery)
          : ((typeof DENT_STATE !== 'undefined' && DENT_STATE.doctores) ? DENT_STATE.doctores.find(d => d.nombre === doctorQuery) || DENT_STATE.doctores[0] : null);
      if (!doc) {
        if (typeof origAbrirDoctor === 'function') origAbrirDoctor(doctorQuery);
        return;
      }
      const allOrders = (typeof INICIO_DATA !== 'undefined' && INICIO_DATA.ordenes) ? INICIO_DATA.ordenes : [];
      const ordenesDoc = allOrders.filter(
        o =>
          Number(o.doctorId) === Number(doc.id) ||
          (o.doctor && doc.doctorCorto && o.doctor.trim().toUpperCase() === doc.doctorCorto.trim().toUpperCase()) ||
          (o.doctorNombreCompleto && doc.nombre && o.doctorNombreCompleto.trim().toUpperCase() === doc.nombre.trim().toUpperCase())
      );

      window.openExpandableCard({
        title: doc.nombre,
        description: `${doc.clinica} • Vendedor: ${doc.vendedor || 'DentLab'} (${doc.tipo})`,
        src: 'assets/dental_cadcam.jpg',
        ctaHtml: `<span>Ver Ficha Completa</span><i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>`,
        onCtaClick: () => window.abrirDetalleDoctorCompleto(doc.id || doc.nombre),
        overlayHtml: `
          <div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white mb-1">
              Expediente Doctor • #${doc.id}
            </span>
            <p class="text-xs font-bold text-slate-200">${doc.mail}</p>
          </div>
          <div class="text-right">
            <span class="text-[10px] uppercase tracking-wider text-slate-300 block">Teléfono</span>
            <span class="text-xs font-bold text-white">${doc.celular}</span>
          </div>
        `,
        content: () => `
          <div class="space-y-3 text-xs text-slate-600">
            <div class="grid grid-cols-3 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Clínica / Dirección</span>
                <strong class="text-slate-800">${doc.clinica}</strong>
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Órdenes en Sistema</span>
                <strong class="text-slate-800">${ordenesDoc.length} orden(es)</strong>
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Clasificación</span>
                <strong class="text-slate-900">${doc.tipo}</strong>
              </div>
            </div>

            <div class="space-y-1.5">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Órdenes Recientes del Doctor</span>
              ${(ordenesDoc.length > 0 ? ordenesDoc.slice(0, 3) : allOrders.slice(0, 2))
                .map(
                  o => `
                <div onclick="window.abrirOrdenTrabajoCompleto('${o.serie}')" class="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer transition-colors">
                  <div>
                    <p class="font-bold text-slate-800">#${o.serie} • ${o.producto}</p>
                    <p class="text-[11px] text-slate-500">Paciente: ${o.paciente} • Entrega: ${o.entrega}</p>
                  </div>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">${o.monto}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
      });
    };

    // Animar automáticamente todos los modales del sistema (Canceladas, Pendientes, Etiqueta, Odontograma, etc.)
    // con la misma transición FLIP de @aceternity/expandable-card-demo-standard cuando se abren
    const modalIds = ['modalEtiqueta', 'modalCanceladas', 'modalPendientes', 'modalDigitalCard', 'modalOdonto', 'modalUniversalForm'];
    const observeModal = modalEl => {
      if (!modalEl || modalEl.__ecObserved) return;
      modalEl.__ecObserved = true;
      let wasHidden = modalEl.classList.contains('hidden');

      const obs = new MutationObserver(() => {
        const isHidden = modalEl.classList.contains('hidden');
        if (wasHidden && !isHidden) {
          const dialog = modalEl.firstElementChild;
          const rect =
            lastTriggerEl && document.body.contains(lastTriggerEl)
              ? lastTriggerEl.getBoundingClientRect()
              : lastTriggerRect;
          if (dialog) animateFlipIn(dialog, rect);
        }
        wasHidden = isHidden;
      });
      obs.observe(modalEl, { attributes: true, attributeFilter: ['class'] });
    };

    modalIds.forEach(id => observeModal(document.getElementById(id)));

    // Observar también modales creados dinámicamente por modules.js (simpleAddModal, detailViewModal)
    const bodyObserver = new MutationObserver(() => {
      ['simpleAddModal', 'detailViewModal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) observeModal(el);
      });
    });
    bodyObserver.observe(document.body, { childList: true });
  });
})();
