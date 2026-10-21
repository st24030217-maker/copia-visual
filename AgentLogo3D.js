/**
 * AgentLogo3D.js
 * Modelado 3D Anatómico Interactivo del Logo Oficial de Dent Control
 * Renderizado WebGL Three.js en tiempo real de alta fidelidad ("Perrón"),
 * con seguimiento de cursor en 3D, flotación levitatoria, cero parpadeos (Z-Fighting corregido)
 * y Visor Inspector 360°.
 */
(function() {
  'use strict';

  const activeInstances = [];
  let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let isTracking = false;

  function onWindowMouseMove(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  }

  // Constructor de Geometría y Materiales 3D del Logo de Dent Control
  // Arquitectura con separación física de planos (0.035 unidades de holgura) para CERO Z-FIGHTING
  function createDentControlLogo3D() {
    if (!window.THREE) return null;
    const THREE = window.THREE;
    const group = new THREE.Group();

    // Materiales PBR de Grado Dental
    const matEnamel = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.04
    });

    const matRoyalBlue = new THREE.MeshStandardMaterial({
      color: 0x1a4fb8,
      roughness: 0.22,
      metalness: 0.08,
      polygonOffset: true,
      polygonOffsetFactor: -1.5,
      polygonOffsetUnits: -1.5
    });

    const matCyan = new THREE.MeshStandardMaterial({
      color: 0x00c4e8,
      roughness: 0.20,
      metalness: 0.08,
      polygonOffset: true,
      polygonOffsetFactor: -1.5,
      polygonOffsetUnits: -1.5
    });

    const matSmile = new THREE.MeshStandardMaterial({
      color: 0x0077b6,
      roughness: 0.18,
      metalness: 0.06,
      polygonOffset: true,
      polygonOffsetFactor: -2.0,
      polygonOffsetUnits: -2.0
    });

    // 1. CUERPO DE ESMALTE BLANCO (MOLAR BASE)
    // Profundidad z: de -0.105 a +0.105 (Recesado respecto a los ribetes exteriores)
    const sEnamel = new THREE.Shape();
    sEnamel.moveTo(0, 0.41);
    sEnamel.bezierCurveTo(-0.16, 0.47, -0.42, 0.53, -0.50, 0.38); // Cúspide superior izq
    sEnamel.bezierCurveTo(-0.56, 0.24, -0.58, 0.06, -0.50, -0.20); // Flanco izq
    sEnamel.bezierCurveTo(-0.45, -0.42, -0.42, -0.62, -0.32, -0.65); // Raíz izq
    sEnamel.bezierCurveTo(-0.22, -0.65, -0.15, -0.46, -0.02, -0.22); // Furcación (arco central)
    sEnamel.bezierCurveTo(0.12, -0.46, 0.20, -0.65, 0.30, -0.65); // Raíz der
    sEnamel.bezierCurveTo(0.40, -0.62, 0.45, -0.40, 0.48, -0.15); // Flanco der
    sEnamel.bezierCurveTo(0.52, 0.10, 0.48, 0.32, 0.38, 0.42); // Cúspide superior der
    sEnamel.bezierCurveTo(0.26, 0.47, 0.14, 0.40, 0, 0.41); // Hendidura oclusal

    const geoEnamel = new THREE.ExtrudeGeometry(sEnamel, {
      steps: 1,
      depth: 0.17,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 4
    });
    geoEnamel.center();
    const meshEnamel = new THREE.Mesh(geoEnamel, matEnamel);
    group.add(meshEnamel);

    // 2. RIBETE SUPERIOR IZQUIERDO (AZUL COBALTO)
    // Profundidad z: de -0.140 a +0.140 (+0.035 de resalte sobre el esmalte -> CERO Z-FIGHTING)
    const sUpperLeft = new THREE.Shape();
    sUpperLeft.moveTo(0, 0.44);
    sUpperLeft.bezierCurveTo(-0.18, 0.52, -0.45, 0.58, -0.54, 0.38);
    sUpperLeft.bezierCurveTo(-0.58, 0.24, -0.58, 0.12, -0.52, 0.04);
    sUpperLeft.lineTo(-0.42, 0.08);
    sUpperLeft.bezierCurveTo(-0.46, 0.18, -0.46, 0.28, -0.42, 0.36);
    sUpperLeft.bezierCurveTo(-0.35, 0.44, -0.15, 0.38, 0, 0.34);
    sUpperLeft.closePath();

    const geoUpperLeft = new THREE.ExtrudeGeometry(sUpperLeft, {
      steps: 1,
      depth: 0.23,
      bevelEnabled: true,
      bevelThickness: 0.028,
      bevelSize: 0.024,
      bevelSegments: 3
    });
    geoUpperLeft.center();
    geoUpperLeft.translate(-0.24, 0.28, 0);
    const meshUpperLeft = new THREE.Mesh(geoUpperLeft, matRoyalBlue);
    group.add(meshUpperLeft);

    // 3. RIBETE INFERIOR RAÍZ IZQUIERDA (AZUL COBALTO)
    const sLowerLeft = new THREE.Shape();
    sLowerLeft.moveTo(-0.50, -0.06);
    sLowerLeft.lineTo(-0.40, -0.02);
    sLowerLeft.bezierCurveTo(-0.36, -0.22, -0.34, -0.44, -0.27, -0.54);
    sLowerLeft.bezierCurveTo(-0.32, -0.62, -0.40, -0.58, -0.45, -0.46);
    sLowerLeft.bezierCurveTo(-0.52, -0.30, -0.53, -0.16, -0.50, -0.06);
    sLowerLeft.closePath();

    const geoLowerLeft = new THREE.ExtrudeGeometry(sLowerLeft, {
      steps: 1,
      depth: 0.23,
      bevelEnabled: true,
      bevelThickness: 0.028,
      bevelSize: 0.024,
      bevelSegments: 3
    });
    geoLowerLeft.center();
    geoLowerLeft.translate(-0.38, -0.32, 0);
    const meshLowerLeft = new THREE.Mesh(geoLowerLeft, matRoyalBlue);
    group.add(meshLowerLeft);

    // 4. ARCO CENTRAL INTER-RADICULAR (GRADIENTE / CIAN)
    const sArch = new THREE.Shape();
    sArch.moveTo(-0.24, -0.54);
    sArch.bezierCurveTo(-0.16, -0.42, -0.08, -0.26, 0, -0.24);
    sArch.bezierCurveTo(0.08, -0.26, 0.16, -0.42, 0.24, -0.54);
    sArch.bezierCurveTo(0.18, -0.58, 0.10, -0.36, 0, -0.34);
    sArch.bezierCurveTo(-0.10, -0.36, -0.18, -0.58, -0.24, -0.54);
    sArch.closePath();

    const geoArch = new THREE.ExtrudeGeometry(sArch, {
      steps: 1,
      depth: 0.23,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.022,
      bevelSegments: 3
    });
    geoArch.center();
    geoArch.translate(0, -0.42, 0);
    const meshArch = new THREE.Mesh(geoArch, matCyan);
    group.add(meshArch);

    // 5. COLUMNA VERTICAL RAÍZ DERECHA (CIAN)
    const sRightStem = new THREE.Shape();
    sRightStem.moveTo(0.28, -0.56);
    sRightStem.bezierCurveTo(0.38, -0.54, 0.44, -0.36, 0.46, -0.12);
    sRightStem.bezierCurveTo(0.48, 0.05, 0.44, 0.16, 0.36, 0.20);
    sRightStem.bezierCurveTo(0.30, 0.16, 0.34, 0.02, 0.34, -0.12);
    sRightStem.bezierCurveTo(0.34, -0.32, 0.28, -0.48, 0.28, -0.56);
    sRightStem.closePath();

    const geoRightStem = new THREE.ExtrudeGeometry(sRightStem, {
      steps: 1,
      depth: 0.23,
      bevelEnabled: true,
      bevelThickness: 0.028,
      bevelSize: 0.024,
      bevelSegments: 3
    });
    geoRightStem.center();
    geoRightStem.translate(0.36, -0.16, 0);
    const meshRightStem = new THREE.Mesh(geoRightStem, matCyan);
    group.add(meshRightStem);

    // 6. NODO ESFÉRICO CUSPÍDEO DERECHO (CIAN)
    const geoSphere = new THREE.SphereGeometry(0.096, 24, 24);
    geoSphere.scale(1, 1, 0.90);
    const meshSphereF = new THREE.Mesh(geoSphere, matCyan);
    meshSphereF.position.set(0.38, 0.34, 0.125);
    group.add(meshSphereF);

    const meshSphereB = new THREE.Mesh(geoSphere, matCyan);
    meshSphereB.position.set(0.38, 0.34, -0.125);
    group.add(meshSphereB);

    // 7. CÚSPIDE SUPERIOR DERECHA (CIAN)
    const sRightCap = new THREE.Shape();
    sRightCap.moveTo(0.06, 0.42);
    sRightCap.bezierCurveTo(0.18, 0.50, 0.32, 0.48, 0.36, 0.40);
    sRightCap.bezierCurveTo(0.26, 0.38, 0.16, 0.38, 0.06, 0.42);
    sRightCap.closePath();

    const geoRightCap = new THREE.ExtrudeGeometry(sRightCap, {
      steps: 1,
      depth: 0.23,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.022,
      bevelSegments: 3
    });
    geoRightCap.center();
    geoRightCap.translate(0.20, 0.43, 0);
    const meshRightCap = new THREE.Mesh(geoRightCap, matCyan);
    group.add(meshRightCap);

    // 8. SONRISA CENTRAL TUBULAR CON TERMINALES REDONDAS
    const smileCurveF = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.19, 0.07, 0.135),
      new THREE.Vector3(-0.10, -0.09, 0.135),
      new THREE.Vector3(0.10, -0.09, 0.135),
      new THREE.Vector3(0.19, 0.07, 0.135)
    );
    const geoSmileF = new THREE.TubeGeometry(smileCurveF, 24, 0.030, 14, false);
    const meshSmileF = new THREE.Mesh(geoSmileF, matSmile);
    group.add(meshSmileF);

    const geoCapF = new THREE.SphereGeometry(0.030, 12, 12);
    const capF1 = new THREE.Mesh(geoCapF, matSmile);
    capF1.position.copy(smileCurveF.v0);
    const capF2 = new THREE.Mesh(geoCapF, matSmile);
    capF2.position.copy(smileCurveF.v3);
    group.add(capF1, capF2);

    // Sonrisa posterior (cara trasera)
    const smileCurveB = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.19, 0.07, -0.135),
      new THREE.Vector3(0.10, -0.09, -0.135),
      new THREE.Vector3(-0.10, -0.09, -0.135),
      new THREE.Vector3(-0.19, 0.07, -0.135)
    );
    const geoSmileB = new THREE.TubeGeometry(smileCurveB, 24, 0.030, 14, false);
    const meshSmileB = new THREE.Mesh(geoSmileB, matSmile);
    group.add(meshSmileB);

    const capB1 = new THREE.Mesh(geoCapF, matSmile);
    capB1.position.copy(smileCurveB.v0);
    const capB2 = new THREE.Mesh(geoCapF, matSmile);
    capB2.position.copy(smileCurveB.v3);
    group.add(capB1, capB2);

    return group;
  }

  // Clase Viewport WebGL Individual de Máximo Rendimiento
  class AgentLogo3DViewer {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.options = Object.assign({
        width: 48,
        height: 48,
        cameraZ: 2.1,
        autoRotate: false,
        enableTrackball: false,
        interactive: true,
        clickToInspect: true
      }, options);

      this.init();
    }

    init() {
      if (!window.THREE) return;
      const THREE = window.THREE;

      this.container.innerHTML = '';
      this.container.style.position = 'relative';

      // Canvas WebGL
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'agent-logo-canvas select-none';
      this.canvas.style.display = 'block';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.cursor = this.options.clickToInspect ? 'pointer' : (this.options.enableTrackball ? 'grab' : 'default');

      this.container.appendChild(this.canvas);

      // WebGL Renderer con fondo 100% transparente
      try {
        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
      } catch (err) {
        console.warn('WebGL falló al inicializar:', err);
        return;
      }

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(this.options.width, this.options.height, false);

      // Escena y Cámara con Near Plane a 0.5 para precisión Z máxima
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(34, this.options.width / this.options.height, 0.5, 30);
      this.camera.position.set(0, 0, this.options.cameraZ);

      // Iluminación de Estudio CAD/CAM Dental
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      this.scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
      keyLight.position.set(2.5, 4, 3.5);
      this.scene.add(keyLight);

      const cyanRim = new THREE.DirectionalLight(0x00d4ff, 0.85);
      cyanRim.position.set(3.5, -1.5, 2.5);
      this.scene.add(cyanRim);

      const blueRim = new THREE.DirectionalLight(0x1d4ed8, 0.65);
      blueRim.position.set(-3.5, 1.5, -2.5);
      this.scene.add(blueRim);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
      fillLight.position.set(-2, -3, 2);
      this.scene.add(fillLight);

      // Modelo 3D
      this.toothModel = createDentControlLogo3D();
      if (this.toothModel) {
        this.scene.add(this.toothModel);
      }

      this.targetRotY = 0;
      this.targetRotX = 0;
      this.currentRotY = 0;
      this.currentRotX = 0;
      this.spinVelocity = 0;
      this.clock = new THREE.Clock();
      this.isDragging = false;
      this.previousMousePosition = { x: 0, y: 0 };

      this.bindEvents();
      activeInstances.push(this);

      if (!isTracking) {
        window.addEventListener('mousemove', onWindowMouseMove, { passive: true });
        isTracking = true;
      }
    }

    bindEvents() {
      if (this.options.clickToInspect) {
        this.canvas.addEventListener('click', (e) => {
          e.stopPropagation();
          this.triggerSpin();
        });
      }

      if (this.options.enableTrackball) {
        this.canvas.addEventListener('mousedown', (e) => {
          this.isDragging = true;
          this.canvas.style.cursor = 'grabbing';
          this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
          if (!this.isDragging || !this.toothModel) return;
          const deltaX = e.clientX - this.previousMousePosition.x;
          const deltaY = e.clientY - this.previousMousePosition.y;

          this.toothModel.rotation.y += deltaX * 0.015;
          this.toothModel.rotation.x += deltaY * 0.015;

          this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
          if (this.isDragging) {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
          }
        });

        // Soporte táctil
        this.canvas.addEventListener('touchstart', (e) => {
          if (e.touches.length === 1) {
            this.isDragging = true;
            this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
          if (!this.isDragging || e.touches.length !== 1 || !this.toothModel) return;
          const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
          const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

          this.toothModel.rotation.y += deltaX * 0.015;
          this.toothModel.rotation.x += deltaY * 0.015;

          this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }, { passive: true });

        window.addEventListener('touchend', () => {
          this.isDragging = false;
        });
      }
    }

    triggerSpin() {
      this.spinVelocity = Math.PI * 3.0; // Giro 360° enérgico y fluido
    }

    update() {
      if (!this.renderer || !this.toothModel) return;

      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      // Levitación sinusoidal orgánica
      const floatY = Math.sin(time * 2.2) * 0.035;
      this.toothModel.position.y = floatY;

      if (!this.isDragging) {
        if (this.options.autoRotate) {
          this.toothModel.rotation.y += 0.012;
        } else if (this.options.interactive) {
          const rect = this.canvas.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = (mousePos.x - centerX) / (window.innerWidth / 2);
            const dy = (mousePos.y - centerY) / (window.innerHeight / 2);

            this.targetRotY = Math.max(-0.65, Math.min(0.65, dx * 0.60));
            this.targetRotX = Math.max(-0.45, Math.min(0.45, -dy * 0.45));

            this.currentRotY += (this.targetRotY - this.currentRotY) * 0.09;
            this.currentRotX += (this.targetRotX - this.currentRotX) * 0.09;

            this.toothModel.rotation.y = this.currentRotY;
            this.toothModel.rotation.x = this.currentRotX;
          }
        }

        // Giro por click
        if (this.spinVelocity > 0.01) {
          this.toothModel.rotation.y += this.spinVelocity * delta;
          this.spinVelocity *= 0.92;
        }
      }

      this.renderer.render(this.scene, this.camera);
    }

    setCameraAngle(angle) {
      if (!this.toothModel) return;
      this.spinVelocity = 0;
      switch (angle) {
        case 'front':
          this.toothModel.rotation.set(0, 0, 0);
          break;
        case 'side':
          this.toothModel.rotation.set(0, Math.PI / 2, 0);
          break;
        case 'back':
          this.toothModel.rotation.set(0, Math.PI, 0);
          break;
        case 'isometric':
          this.toothModel.rotation.set(0.22, 0.60, 0);
          break;
      }
    }
  }

  // Bucle de animación global
  let animId = null;
  function animateAll() {
    animId = requestAnimationFrame(animateAll);
    for (let i = 0; i < activeInstances.length; i++) {
      activeInstances[i].update();
    }
  }

  // Inicializador oficial del Logo 3D en toda la interfaz
  window.initAgentLogo3D = function() {
    activeInstances.length = 0;

    // 1. Botón Flotante Inferior Derecho (38x38 WebGL)
    const floatTarget = document.getElementById('floatingLogo3DContainer');
    if (floatTarget) {
      new AgentLogo3DViewer(floatTarget, { width: 38, height: 38, cameraZ: 2.15 });
    }

    // 2. Cabecera del Asistente (32x32 WebGL)
    const headerTarget = document.getElementById('headerLogo3DContainer');
    if (headerTarget) {
      new AgentLogo3DViewer(headerTarget, { width: 32, height: 32, cameraZ: 2.15 });
    }

    // 3. Hero de Bienvenida del Chat (96x96 WebGL "Perrón")
    const welcomeTarget = document.getElementById('welcomeLogo3DContainer');
    if (welcomeTarget) {
      window._welcomeLogo3D = new AgentLogo3DViewer(welcomeTarget, {
        width: 96,
        height: 96,
        cameraZ: 2.05,
        interactive: true
      });
    }

    // 4. Banner Superior del Dashboard (44x44 WebGL)
    const bannerTarget = document.getElementById('heroBannerLogo3DContainer');
    if (bannerTarget) {
      new AgentLogo3DViewer(bannerTarget, { width: 44, height: 44, cameraZ: 2.15 });
    }

    if (!animId) {
      animateAll();
    }
  };

  // Modal Inspector 360° Interactivo con Three.js
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
                <p class="text-[11px] text-slate-500 font-medium">Modelado 3D Anatómico Interactivo · Renderizado WebGL en Tiempo Real</p>
              </div>
            </div>
            <button type="button" onclick="window.cerrarModalLogo3DInspector()" class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Visor 3D Interactivo con Orbit / Drag -->
          <div class="relative bg-gradient-to-b from-slate-50 via-slate-100/70 to-blue-50/30 p-6 flex items-center justify-center min-h-[300px]">
            <div id="inspectorCanvasContainer" class="w-64 h-64 relative cursor-grab active:cursor-grabbing"></div>
            
            <div class="absolute bottom-3 left-4 text-[10px] text-slate-500 font-medium bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              Arrastra con el mouse para rotar en 360°
            </div>
          </div>

          <!-- Controles de Vista y Descarga -->
          <div class="p-5 bg-white space-y-4">
            <div>
              <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Vistas Anatómicas de Referencia</span>
              <div class="grid grid-cols-4 gap-2">
                <button type="button" onclick="window._inspectorViewer.setCameraAngle('front')" class="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center">
                  Frontal
                </button>
                <button type="button" onclick="window._inspectorViewer.setCameraAngle('side')" class="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center">
                  Lateral
                </button>
                <button type="button" onclick="window._inspectorViewer.setCameraAngle('back')" class="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer text-center">
                  Posterior
                </button>
                <button type="button" onclick="window._inspectorViewer.setCameraAngle('isometric')" class="px-2.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50/60 text-xs font-bold text-blue-700 hover:bg-blue-100/60 active:scale-95 transition-all cursor-pointer text-center">
                  Isométrica
                </button>
              </div>
            </div>

            <!-- Botones de Acción y Descarga del Modelo -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <a href="assets/ia-logo/dent_control_logo_3d.obj" download="dent_control_logo_3d.obj" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Descargar Modelo 3D (.OBJ)</span>
              </a>

              <button type="button" onclick="window._inspectorViewer.triggerSpin()" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer">
                <i data-lucide="rotate-cw" class="w-3.5 h-3.5 text-blue-600"></i>
                <span>Giro 360°</span>
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      if (window.lucide) window.lucide.createIcons();
    }

    modal.classList.remove('hidden');

    const canvasContainer = document.getElementById('inspectorCanvasContainer');
    if (canvasContainer && (!window._inspectorViewer || window._inspectorViewer.container !== canvasContainer)) {
      window._inspectorViewer = new AgentLogo3DViewer(canvasContainer, {
        width: 256,
        height: 256,
        cameraZ: 2.05,
        interactive: false,
        enableTrackball: true,
        clickToInspect: false
      });
      window._inspectorViewer.setCameraAngle(vistaInicial);
    } else if (window._inspectorViewer) {
      window._inspectorViewer.setCameraAngle(vistaInicial);
    }
  };

  window.cerrarModalLogo3DInspector = function() {
    const modal = document.getElementById('modalLogo3DInspector');
    if (modal) modal.classList.add('hidden');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initAgentLogo3D());
  } else {
    window.initAgentLogo3D();
  }
})();
