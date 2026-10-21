/**
 * AgentLogo3D.js
 * Modelado 3D Anatómico Interactivo del Logo Oficial de Dent Control
 * Renderizado WebGL con Three.js, seguimiento de cursor y modal 360°
 */
(function() {
  'use strict';

  // Almacén de instancias activas de renderizadores 3D
  const active3DInstances = [];
  let mousePos = { x: 0, y: 0, normalizedX: 0, normalizedY: 0 };
  let isTrackingMouse = false;

  // Seguimiento global de cursor
  function onWindowMouseMove(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    mousePos.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  // Constructor de Geometría y Materiales del Logo Dent Control
  function createLogoToothGroup() {
    if (!window.THREE) return null;
    const THREE = window.THREE;
    const group = new THREE.Group();

    // Materiales PBR de alta fidelidad
    const matEnamel = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.16,
      metalness: 0.04
    });

    const matRoyalBlue = new THREE.MeshStandardMaterial({
      color: 0x1b49b8,
      roughness: 0.25,
      metalness: 0.08
    });

    const matCyan = new THREE.MeshStandardMaterial({
      color: 0x00c4e8,
      roughness: 0.22,
      metalness: 0.08
    });

    const matSmile = new THREE.MeshStandardMaterial({
      color: 0x0077b6,
      roughness: 0.20,
      metalness: 0.06
    });

    // 1. Cuerpo Principal de Esmalte Dental (Molar blanco)
    const sEnamel = new THREE.Shape();
    sEnamel.moveTo(0, 0.42);
    sEnamel.bezierCurveTo(-0.16, 0.48, -0.42, 0.54, -0.50, 0.38);
    sEnamel.bezierCurveTo(-0.56, 0.24, -0.58, 0.06, -0.50, -0.20);
    sEnamel.bezierCurveTo(-0.45, -0.42, -0.42, -0.62, -0.32, -0.65);
    sEnamel.bezierCurveTo(-0.22, -0.65, -0.15, -0.46, -0.02, -0.22);
    sEnamel.bezierCurveTo(0.12, -0.46, 0.20, -0.65, 0.30, -0.65);
    sEnamel.bezierCurveTo(0.40, -0.62, 0.45, -0.40, 0.48, -0.15);
    sEnamel.bezierCurveTo(0.52, 0.10, 0.48, 0.32, 0.38, 0.42);
    sEnamel.bezierCurveTo(0.26, 0.48, 0.14, 0.40, 0, 0.42);

    const geoEnamel = new THREE.ExtrudeGeometry(sEnamel, {
      steps: 2,
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.045,
      bevelSegments: 4
    });
    geoEnamel.center();
    const meshEnamel = new THREE.Mesh(geoEnamel, matEnamel);
    group.add(meshEnamel);

    // 2. Cúspide y Contorno Superior Izquierdo (Azul Cobalto)
    const sLeftUpper = new THREE.Shape();
    sLeftUpper.moveTo(0, 0.44);
    sLeftUpper.bezierCurveTo(-0.18, 0.52, -0.45, 0.58, -0.54, 0.38);
    sLeftUpper.bezierCurveTo(-0.58, 0.24, -0.58, 0.12, -0.52, 0.04);
    sLeftUpper.lineTo(-0.42, 0.08);
    sLeftUpper.bezierCurveTo(-0.46, 0.18, -0.46, 0.28, -0.42, 0.36);
    sLeftUpper.bezierCurveTo(-0.35, 0.44, -0.15, 0.38, 0, 0.34);
    sLeftUpper.closePath();

    const geoLeftUpper = new THREE.ExtrudeGeometry(sLeftUpper, {
      steps: 1,
      depth: 0.23,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.035,
      bevelSegments: 3
    });
    geoLeftUpper.center();
    geoLeftUpper.translate(-0.24, 0.28, 0);
    const meshLeftUpper = new THREE.Mesh(geoLeftUpper, matRoyalBlue);
    group.add(meshLeftUpper);

    // 3. Raíz Inferior Izquierda (Azul Cobalto)
    const sLeftRoot = new THREE.Shape();
    sLeftRoot.moveTo(-0.50, -0.06);
    sLeftRoot.lineTo(-0.40, -0.02);
    sLeftRoot.bezierCurveTo(-0.36, -0.22, -0.34, -0.44, -0.27, -0.54);
    sLeftRoot.bezierCurveTo(-0.32, -0.62, -0.40, -0.58, -0.45, -0.46);
    sLeftRoot.bezierCurveTo(-0.52, -0.30, -0.53, -0.16, -0.50, -0.06);
    sLeftRoot.closePath();

    const geoLeftRoot = new THREE.ExtrudeGeometry(sLeftRoot, {
      steps: 1,
      depth: 0.23,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.035,
      bevelSegments: 3
    });
    geoLeftRoot.center();
    geoLeftRoot.translate(-0.38, -0.32, 0);
    const meshLeftRoot = new THREE.Mesh(geoLeftRoot, matRoyalBlue);
    group.add(meshLeftRoot);

    // 4. Arco Inter-Radicular (Cyan - Azul)
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
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3
    });
    geoArch.center();
    geoArch.translate(0, -0.42, 0);
    const meshArch = new THREE.Mesh(geoArch, matCyan);
    group.add(meshArch);

    // 5. Columna Vertical Raíz Derecha (Cyan)
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
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 3
    });
    geoRightStem.center();
    geoRightStem.translate(0.36, -0.16, 0);
    const meshRightStem = new THREE.Mesh(geoRightStem, matCyan);
    group.add(meshRightStem);

    // 6. Nodo Esférico Superior Derecho (Cyan)
    const geoSphere = new THREE.SphereGeometry(0.095, 20, 20);
    geoSphere.scale(1, 1, 0.85);
    const meshSphereFront = new THREE.Mesh(geoSphere, matCyan);
    meshSphereFront.position.set(0.38, 0.34, 0.13);
    group.add(meshSphereFront);

    const meshSphereBack = new THREE.Mesh(geoSphere, matCyan);
    meshSphereBack.position.set(0.38, 0.34, -0.13);
    group.add(meshSphereBack);

    // 7. Cúspide Superior Derecha (Cyan)
    const sRightCap = new THREE.Shape();
    sRightCap.moveTo(0.06, 0.42);
    sRightCap.bezierCurveTo(0.18, 0.50, 0.32, 0.48, 0.36, 0.40);
    sRightCap.bezierCurveTo(0.26, 0.38, 0.16, 0.38, 0.06, 0.42);
    sRightCap.closePath();

    const geoRightCap = new THREE.ExtrudeGeometry(sRightCap, {
      steps: 1,
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3
    });
    geoRightCap.center();
    geoRightCap.translate(0.20, 0.43, 0);
    const meshRightCap = new THREE.Mesh(geoRightCap, matCyan);
    group.add(meshRightCap);

    // 8. Sonrisa Central en Arco U (Azul Profundo)
    const smileCurveFront = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.19, 0.07, 0.16),
      new THREE.Vector3(-0.10, -0.09, 0.16),
      new THREE.Vector3(0.10, -0.09, 0.16),
      new THREE.Vector3(0.19, 0.07, 0.16)
    );
    const geoSmileFront = new THREE.TubeGeometry(smileCurveFront, 24, 0.030, 14, false);
    const meshSmileFront = new THREE.Mesh(geoSmileFront, matSmile);
    group.add(meshSmileFront);

    const geoSmileCap = new THREE.SphereGeometry(0.030, 10, 10);
    const capF1 = new THREE.Mesh(geoSmileCap, matSmile);
    capF1.position.copy(smileCurveFront.v0);
    const capF2 = new THREE.Mesh(geoSmileCap, matSmile);
    capF2.position.copy(smileCurveFront.v3);
    group.add(capF1, capF2);

    // Sonrisa posterior (cara trasera para vista 360)
    const smileCurveBack = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.19, 0.07, -0.16),
      new THREE.Vector3(0.10, -0.09, -0.16),
      new THREE.Vector3(-0.10, -0.09, -0.16),
      new THREE.Vector3(-0.19, 0.07, -0.16)
    );
    const geoSmileBack = new THREE.TubeGeometry(smileCurveBack, 24, 0.030, 14, false);
    const meshSmileBack = new THREE.Mesh(geoSmileBack, matSmile);
    group.add(meshSmileBack);

    const capB1 = new THREE.Mesh(geoSmileCap, matSmile);
    capB1.position.copy(smileCurveBack.v0);
    const capB2 = new THREE.Mesh(geoSmileCap, matSmile);
    capB2.position.copy(smileCurveBack.v3);
    group.add(capB1, capB2);

    return group;
  }

  // Clase para gestionar un Viewport 3D individual (icono, avatar o inspector)
  class AgentLogo3DViewer {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.options = Object.assign({
        width: 48,
        height: 48,
        interactive: true,
        enableTrackball: false,
        cameraZ: 2.1,
        autoRotate: false,
        clickToInspect: true
      }, options);

      this.init();
    }

    init() {
      if (!window.THREE) {
        this.renderFallback();
        return;
      }
      const THREE = window.THREE;

      // Crear Canvas
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'agent-logo-canvas select-none';
      this.canvas.style.display = 'block';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.cursor = this.options.clickToInspect ? 'pointer' : 'default';

      this.container.innerHTML = '';
      this.container.appendChild(this.canvas);

      // Renderer WebGL con fondo transparente
      try {
        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
      } catch (err) {
        console.warn('WebGL no disponible en este dispositivo, aplicando imagen 3D estática:', err);
        this.renderFallback();
        return;
      }

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(this.options.width, this.options.height, false);

      // Escena y Cámara
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(38, this.options.width / this.options.height, 0.1, 100);
      this.camera.position.set(0, 0, this.options.cameraZ);

      // Luces de Estudio Dental Profesional
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      this.scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
      keyLight.position.set(2, 3, 3);
      this.scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.5);
      fillLight.position.set(-3, -1, 2);
      this.scene.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0x00c4e8, 0.6);
      rimLight.position.set(0, -3, -2);
      this.scene.add(rimLight);

      // Construcción del Modelo 3D
      this.toothModel = createLogoToothGroup();
      if (this.toothModel) {
        this.scene.add(this.toothModel);
      }

      // Variables de movimiento y rotación
      this.targetRotY = 0;
      this.targetRotX = 0;
      this.currentRotY = 0;
      this.currentRotX = 0;
      this.clock = new THREE.Clock();
      this.spinVelocity = 0;
      this.isDragging = false;
      this.previousMousePosition = { x: 0, y: 0 };

      if (this.options.interactive) {
        this.bindEvents();
      }

      active3DInstances.push(this);

      if (!isTrackingMouse) {
        window.addEventListener('mousemove', onWindowMouseMove, { passive: true });
        isTrackingMouse = true;
      }
    }

    renderFallback() {
      if (!this.container) return;
      this.container.innerHTML = `
        <img src="assets/ia-logo/dent_control_logo_3d_front_corrected.png" 
             alt="Logo 3D Dent Control" 
             class="w-full h-full object-contain filter drop-shadow-sm select-none" />
      `;
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
          this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
          if (!this.isDragging) return;
          const deltaX = e.clientX - this.previousMousePosition.x;
          const deltaY = e.clientY - this.previousMousePosition.y;

          if (this.toothModel) {
            this.toothModel.rotation.y += deltaX * 0.015;
            this.toothModel.rotation.x += deltaY * 0.015;
          }
          this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
          this.isDragging = false;
        });

        // Touch para móviles
        this.canvas.addEventListener('touchstart', (e) => {
          if (e.touches.length === 1) {
            this.isDragging = true;
            this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
          if (!this.isDragging || e.touches.length !== 1) return;
          const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
          const deltaY = e.touches[0].clientY - this.previousMousePosition.y;
          if (this.toothModel) {
            this.toothModel.rotation.y += deltaX * 0.015;
            this.toothModel.rotation.x += deltaY * 0.015;
          }
          this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }, { passive: true });

        window.addEventListener('touchend', () => {
          this.isDragging = false;
        });
      }
    }

    triggerSpin() {
      this.spinVelocity = Math.PI * 2.5;
    }

    update() {
      if (!this.renderer || !this.toothModel) return;

      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      // Flotación / Respiración levitatoria suave
      const floatY = Math.sin(time * 2.2) * 0.035;
      this.toothModel.position.y = floatY;

      if (!this.isDragging) {
        if (this.options.autoRotate) {
          this.toothModel.rotation.y += 0.012;
        } else if (this.options.interactive) {
          // Calcular orientación hacia el cursor del mouse
          const rect = this.canvas.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = (mousePos.x - centerX) / (window.innerWidth / 2);
          const dy = (mousePos.y - centerY) / (window.innerHeight / 2);

          // Rango controlado para rotación elegante
          this.targetRotY = Math.max(-0.65, Math.min(0.65, dx * 0.55));
          this.targetRotX = Math.max(-0.45, Math.min(0.45, -dy * 0.40));

          // Interpolación suave (lerp)
          this.currentRotY += (this.targetRotY - this.currentRotY) * 0.09;
          this.currentRotX += (this.targetRotX - this.currentRotX) * 0.09;

          this.toothModel.rotation.y = this.currentRotY;
          this.toothModel.rotation.x = this.currentRotX;
        }

        // Giro celebratorio por click
        if (this.spinVelocity > 0.01) {
          this.toothModel.rotation.y += this.spinVelocity * delta;
          this.spinVelocity *= 0.92;
        }
      }

      this.renderer.render(this.scene, this.camera);
    }

    resize(width, height) {
      if (!this.renderer || !this.camera) return;
      this.options.width = width;
      this.options.height = height;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
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
          this.toothModel.rotation.set(0.25, 0.65, 0);
          break;
      }
    }
  }

  // Bucle de animación global único a 60 FPS
  let animFrameId = null;
  const requestAnim = (typeof window !== 'undefined' && window.requestAnimationFrame) 
    ? window.requestAnimationFrame.bind(window) 
    : (cb => setTimeout(cb, 16));

  function animateAll3D() {
    animFrameId = requestAnim(animateAll3D);
    for (let i = 0; i < active3DInstances.length; i++) {
      active3DInstances[i].update();
    }
  }

  // Inicializador del Logo 3D en toda la interfaz
  window.initAgentLogo3D = function() {
    // 1. Botón Flotante del Asistente (Esquina Inferior Derecha)
    const floatTarget = document.getElementById('floatingLogo3DContainer');
    if (floatTarget) {
      new AgentLogo3DViewer(floatTarget, { width: 36, height: 36, cameraZ: 2.3 });
    }

    // 2. Cabecera del Panel del Asistente
    const headerTarget = document.getElementById('headerLogo3DContainer');
    if (headerTarget) {
      new AgentLogo3DViewer(headerTarget, { width: 32, height: 32, cameraZ: 2.3 });
    }

    // 3. Hero de Bienvenida dentro del Chat
    const welcomeTarget = document.getElementById('welcomeLogo3DContainer');
    if (welcomeTarget) {
      window._welcomeLogo3D = new AgentLogo3DViewer(welcomeTarget, { width: 96, height: 96, cameraZ: 2.05 });
    }

    // 4. Banner Superior del Dashboard
    const bannerTarget = document.getElementById('heroBannerLogo3DContainer');
    if (bannerTarget) {
      new AgentLogo3DViewer(bannerTarget, { width: 44, height: 44, cameraZ: 2.2 });
    }

    // Iniciar bucle único si no estaba activo
    if (!animFrameId) {
      animateAll3D();
    }
  };

  // Función para inyectar avatar 3D en las burbujas de respuesta
  window.crearAvatarBurbuja3D = function() {
    return `
      <div class="agent-msg-avatar-3d w-7 h-7 rounded-full bg-slate-900/5 flex items-center justify-center relative shadow-2xs shrink-0 overflow-hidden select-none cursor-pointer" onclick="window.abrirModalLogo3DInspector()">
        <img src="assets/ia-logo/dent_control_logo_3d_front_corrected.png" alt="Dent Control 3D" class="w-6 h-6 object-contain pointer-events-none" />
      </div>
    `;
  };

  // Modal Inspector 360° del Modelo 3D
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
                <p class="text-[11px] text-slate-500 font-medium">Modelado 3D Anatómico Interactivo · Tres Dimensiones en Tiempo Real</p>
              </div>
            </div>
            <button type="button" onclick="window.cerrarModalLogo3DInspector()" class="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Visor 3D Interactivo -->
          <div class="relative bg-radial from-slate-50 via-slate-100/70 to-slate-200/50 p-6 flex items-center justify-center min-h-[300px]">
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

  // Auto-iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initAgentLogo3D());
  } else {
    window.initAgentLogo3D();
  }
})();
