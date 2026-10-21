/**
 * AgentLogo3D.js
 * Logo 3D Oficial de Dent Control para el Asistente IA
 * Renderizado 3D fotorrealista con seguimiento de cursor en tiempo real,
 * animación levitatoria suave y visor inspector 360°.
 * Cero parpadeos, cero glitches, máxima fidelidad visual.
 */
(function() {
  'use strict';

  // Rutas de las vistas oficiales 3D
  const ASSETS = {
    front: 'assets/ia-logo/dent_control_logo_3d_front_corrected.png',
    isometric: 'assets/ia-logo/dent_control_logo_3d_isometric_corrected.png',
    side: 'assets/ia-logo/dent_control_logo_3d_side_corrected.png',
    back: 'assets/ia-logo/dent_control_logo_3d_back_corrected.png',
    obj: 'assets/ia-logo/dent_control_logo_3d.obj',
    mtl: 'assets/ia-logo/dent_control_logo_3d.mtl'
  };

  const activeInstances = [];
  let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let isTracking = false;

  // Seguimiento global de la posición del cursor
  function onMouseMove(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  }

  // Clase para gestionar cada componente interactivo 3D
  class AgentLogo3DElement {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.options = Object.assign({
        size: 48,
        view: 'isometric', // 'isometric' o 'front'
        interactive: true,
        maxTilt: 22, // grados máximos de inclinación
        floatSpeed: 2.2,
        floatAmplitude: 3, // píxeles de levitación
        clickToInspect: true
      }, options);

      this.currentRotX = 0;
      this.currentRotY = 0;
      this.targetRotX = 0;
      this.targetRotY = 0;
      this.spinAngle = 0;
      this.spinVelocity = 0;
      this.startTime = performance.now();

      this.init();
    }

    init() {
      this.container.innerHTML = '';
      this.container.classList.add('agent-logo-3d-wrapper');
      this.container.style.perspective = '600px';
      this.container.style.display = 'inline-flex';
      this.container.style.alignItems = 'center';
      this.container.style.justifyContent = 'center';

      // Capa interna 3D
      this.card = document.createElement('div');
      this.card.className = 'agent-logo-3d-card';
      this.card.style.width = '100%';
      this.card.style.height = '100%';
      this.card.style.position = 'relative';
      this.card.style.transformStyle = 'preserve-3d';
      this.card.style.willChange = 'transform, filter';
      this.card.style.cursor = this.options.clickToInspect ? 'pointer' : 'default';

      // Imagen 3D oficial de alta fidelidad
      this.img = document.createElement('img');
      this.img.src = ASSETS[this.options.view] || ASSETS.isometric;
      this.img.alt = 'Logo 3D Dent Control';
      this.img.className = 'w-full h-full object-contain select-none pointer-events-none';
      this.img.style.mixBlendMode = 'multiply';
      this.img.style.filter = 'drop-shadow(0 6px 12px rgba(14, 165, 233, 0.22))';
      this.img.style.transition = 'filter 0.2s ease';

      this.card.appendChild(this.img);
      this.container.appendChild(this.card);

      if (this.options.interactive) {
        this.bindEvents();
      }

      activeInstances.push(this);

      if (!isTracking) {
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        isTracking = true;
      }
    }

    bindEvents() {
      if (this.options.clickToInspect) {
        this.card.addEventListener('click', (e) => {
          e.stopPropagation();
          this.triggerSpin();
        });
      }

      this.card.addEventListener('mouseenter', () => {
        this.img.style.filter = 'drop-shadow(0 10px 18px rgba(14, 165, 233, 0.38))';
      });

      this.card.addEventListener('mouseleave', () => {
        this.img.style.filter = 'drop-shadow(0 6px 12px rgba(14, 165, 233, 0.22))';
      });
    }

    triggerSpin() {
      this.spinVelocity = 360 * 1.5; // Giro dinámico completo
    }

    update(now) {
      const elapsed = (now - this.startTime) / 1000;

      // 1. Flotación / Levitación sinusoidal orgánica (respiración)
      const floatY = Math.sin(elapsed * this.options.floatSpeed) * this.options.floatAmplitude;

      if (this.options.interactive) {
        const rect = this.container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Desplazamiento relativo hacia el cursor
          const dx = (mousePos.x - centerX) / (window.innerWidth / 2);
          const dy = (mousePos.y - centerY) / (window.innerHeight / 2);

          // Inclinación 3D en perspectiva
          this.targetRotY = Math.max(-this.options.maxTilt, Math.min(this.options.maxTilt, dx * this.options.maxTilt));
          this.targetRotX = Math.max(-this.options.maxTilt, Math.min(this.options.maxTilt, -dy * this.options.maxTilt));
        }
      }

      // 2. Amortiguación suave (Lerp)
      this.currentRotX += (this.targetRotX - this.currentRotX) * 0.10;
      this.currentRotY += (this.targetRotY - this.currentRotY) * 0.10;

      // 3. Efecto de giro celebratorio por click
      if (this.spinVelocity > 0.5) {
        this.spinAngle += this.spinVelocity * 0.016;
        this.spinVelocity *= 0.92;
      } else {
        this.spinVelocity = 0;
        this.spinAngle = 0;
      }

      const totalRotY = (this.currentRotY + this.spinAngle).toFixed(2);
      const totalRotX = this.currentRotX.toFixed(2);
      const totalY = floatY.toFixed(2);

      // Aplicar transformación 3D al hardware gráfico (GPU)
      this.card.style.transform = `rotateX(${totalRotX}deg) rotateY(${totalRotY}deg) translateY(${totalY}px) translateZ(0)`;
    }

    setView(viewKey) {
      if (ASSETS[viewKey] && this.img) {
        this.img.src = ASSETS[viewKey];
      }
    }
  }

  // Bucle central de animación a 60 FPS
  let animId = null;
  function animateFrame(now) {
    animId = requestAnimationFrame(animateFrame);
    for (let i = 0; i < activeInstances.length; i++) {
      activeInstances[i].update(now);
    }
  }

  // Inicializador oficial del Logo 3D en toda la aplicación
  window.initAgentLogo3D = function() {
    activeInstances.length = 0;

    // 1. Botón Flotante del Asistente (Esquina Inferior Derecha)
    const floatTarget = document.getElementById('floatingLogo3DContainer');
    if (floatTarget) {
      new AgentLogo3DElement(floatTarget, { size: 40, view: 'isometric', maxTilt: 26, floatAmplitude: 2.5 });
    }

    // 2. Cabecera del Panel Lateral del Asistente
    const headerTarget = document.getElementById('headerLogo3DContainer');
    if (headerTarget) {
      new AgentLogo3DElement(headerTarget, { size: 32, view: 'isometric', maxTilt: 20, floatAmplitude: 2 });
    }

    // 3. Hero de Bienvenida dentro del Chat (Gran Logo 3D)
    const welcomeTarget = document.getElementById('welcomeLogo3DContainer');
    if (welcomeTarget) {
      window._welcomeLogo3D = new AgentLogo3DElement(welcomeTarget, {
        size: 96,
        view: 'isometric',
        maxTilt: 28,
        floatAmplitude: 4,
        floatSpeed: 2.0
      });
    }

    // 4. Banner Superior en el Dashboard de Inicio
    const bannerTarget = document.getElementById('heroBannerLogo3DContainer');
    if (bannerTarget) {
      new AgentLogo3DElement(bannerTarget, { size: 44, view: 'isometric', maxTilt: 22, floatAmplitude: 3 });
    }

    // Iniciar loop si no está corriendo
    if (!animId) {
      animId = requestAnimationFrame(animateFrame);
    }
  };

  // Modal Inspector 360° con Vistas Anatómicas y Descarga OBJ
  window.abrirModalLogo3DInspector = function(vistaInicial = 'isometric') {
    let modal = document.getElementById('modalLogo3DInspector');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'modalLogo3DInspector';
      modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300';
      modal.innerHTML = `
        <div class="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Encabezado Modal -->
          <div class="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                <i data-lucide="box" class="w-4 h-4"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900">Logo 3D Oficial de Dent Control</h3>
                <p class="text-[11px] text-slate-500 font-medium">Modelado 3D Anatómico Interactivo · Vistas Ortográficas de Alta Precisión</p>
              </div>
            </div>
            <button type="button" onclick="window.cerrarModalLogo3DInspector()" class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Visor Interactivo 3D -->
          <div class="relative bg-gradient-to-b from-slate-50 via-slate-100/70 to-blue-50/30 p-8 flex items-center justify-center min-h-[290px] select-none">
            <div id="inspectorToothCard" class="w-60 h-60 relative transition-transform duration-300 flex items-center justify-center cursor-pointer" onclick="window._inspectorToothSpin()">
              <img id="inspectorToothImg" src="${ASSETS.isometric}" alt="Dent Control 3D" class="w-full h-full object-contain filter drop-shadow-xl select-none pointer-events-none" style="mix-blend-mode: multiply;" />
            </div>
            
            <div class="absolute bottom-3 left-4 text-[10px] text-slate-500 font-medium bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              Mueve el cursor para inclinar en 3D · Clic para girar 360°
            </div>
          </div>

          <!-- Controles de Ángulo y Descargas -->
          <div class="p-5 bg-white space-y-4">
            <div>
              <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Vistas Anatómicas Disponibles</span>
              <div class="grid grid-cols-4 gap-2">
                <button type="button" onclick="window.cambiarVistaInspector3D('front', this)" class="vista-btn px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center">
                  Frontal
                </button>
                <button type="button" onclick="window.cambiarVistaInspector3D('side', this)" class="vista-btn px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center">
                  Lateral
                </button>
                <button type="button" onclick="window.cambiarVistaInspector3D('back', this)" class="vista-btn px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center">
                  Posterior
                </button>
                <button type="button" onclick="window.cambiarVistaInspector3D('isometric', this)" class="vista-btn active-btn px-2.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 hover:bg-blue-100 active:scale-95 transition-all cursor-pointer text-center">
                  Isométrica
                </button>
              </div>
            </div>

            <!-- Botones de Acción y Descarga -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <a href="assets/ia-logo/dent_control_logo_3d.obj" download="dent_control_logo_3d.obj" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Descargar Modelo (.OBJ)</span>
              </a>

              <a href="assets/ia-logo/dent_control_logo_3d.mtl" download="dent_control_logo_3d.mtl" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer">
                <i data-lucide="file-code" class="w-3.5 h-3.5 text-blue-600"></i>
                <span>Materiales (.MTL)</span>
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      if (window.lucide) window.lucide.createIcons();

      // Seguimiento en la ventana del modal
      const inspectorCard = document.getElementById('inspectorToothCard');
      if (inspectorCard) {
        window.addEventListener('mousemove', (e) => {
          if (modal.classList.contains('hidden')) return;
          const rect = inspectorCard.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / (window.innerWidth / 2);
          const dy = (e.clientY - cy) / (window.innerHeight / 2);
          const rx = (-dy * 25).toFixed(1);
          const ry = (dx * 25).toFixed(1);
          inspectorCard.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }, { passive: true });
      }
    }

    modal.classList.remove('hidden');
    window.cambiarVistaInspector3D(vistaInicial);
  };

  window.cambiarVistaInspector3D = function(vistaKey, btnElement) {
    const img = document.getElementById('inspectorToothImg');
    if (img && ASSETS[vistaKey]) {
      img.src = ASSETS[vistaKey];
    }
    const btns = document.querySelectorAll('.vista-btn');
    btns.forEach(b => {
      b.className = 'vista-btn px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center';
    });
    if (btnElement) {
      btnElement.className = 'vista-btn px-2.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 hover:bg-blue-100 active:scale-95 transition-all cursor-pointer text-center';
    }
  };

  window._inspectorToothSpin = function() {
    const card = document.getElementById('inspectorToothCard');
    if (!card) return;
    card.style.transition = 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    card.style.transform = 'perspective(600px) rotateY(360deg) scale(1.08)';
    setTimeout(() => {
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = 'perspective(600px) rotateY(0deg) scale(1)';
    }, 850);
  };

  window.cerrarModalLogo3DInspector = function() {
    const modal = document.getElementById('modalLogo3DInspector');
    if (modal) modal.classList.add('hidden');
  };

  // Inicializar automáticamente en carga
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initAgentLogo3D());
  } else {
    window.initAgentLogo3D();
  }
})();
