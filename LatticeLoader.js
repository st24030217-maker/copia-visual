/**
 * LatticeLoader.js
 * Vanilla JS implementation of @react-bits/LatticeLoader-JS-CSS
 * Microinteracción de agente con celosía de células luminosas y cronómetro en vivo
 */
(function() {
  'use strict';

  const PATTERNS = {
    arrow: { 3: { cells: [1, 2, 3, 0, 1, 2, 1, 2, 3], loop: 7.2, scale: 1 } },
    dots: { 3: { cells: [0, 1, 2, 0, 1, 2, 0, 1, 2], loop: 3, scale: 2.4 } },
    ripple: { 3: { cells: [2, 1, 2, 1, 0, 1, 2, 1, 2], loop: 4.8, scale: 1.5 } },
    spiral: { 3: { cells: [0, 1, 2, 7, 8, 3, 6, 5, 4], loop: 9, scale: 1.2, lit: 0.35 } },
    orbit: {
      3: { cells: [0, 1, 2, 7, null, 3, 6, 5, 4], loop: 8, scale: 1.2 },
      4: { cells: [0, 1, 2, 3, 11, null, null, 4, 10, null, null, 5, 9, 8, 7, 6], loop: 6, scale: 1.2, lit: 0.45 }
    },
    snake: {
      3: { cells: [0, 1, 2, 5, 4, 3, 6, 7, 8], loop: 9, scale: 1, lit: 0.35 },
      4: { cells: [0, 1, 2, 3, 7, 6, 5, 4, 8, 9, 10, 11, 15, 14, 13, 12], loop: 16, scale: 1, lit: 0.25 }
    },
    sweep: { 4: { cells: [0, 1, 2, 3, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6], loop: 5, scale: 1, lit: 0.45 } },
    spin: { 4: { cells: [0, 0, 1, 1, 0, 0, 1, 1, 3, 3, 2, 2, 3, 3, 2, 2], loop: 4, scale: 1.6, lit: 0.35 } },
    rain: { 4: { cells: [0, 2, 1, 3, 1, 3, 2, 4, 2, 4, 3, 5, 3, 5, 4, 6], loop: 4, scale: 1.2, lit: 0.35 } },
    pulse: { 4: { cells: [2, 1, 1, 2, 1, 0, 0, 1, 1, 0, 0, 1, 2, 1, 1, 2], loop: 2.4, scale: 2.5, lit: 0.45 } }
  };

  const DEFAULT_PATTERN = { 3: 'orbit', 4: 'sweep' };
  const MARKS = {
    3: { done: [2, 3, 5, 7], error: [0, 2, 4, 6, 8] },
    4: { done: [7, 8, 10, 13], error: [0, 3, 5, 6, 9, 10, 12, 15] }
  };

  function resolvePattern(pattern, grid) {
    if (typeof pattern === 'string') {
      const named = PATTERNS[pattern];
      return (named && named[grid]) || PATTERNS[DEFAULT_PATTERN[grid]][grid];
    }
    const cells = Array.from({ length: grid * grid }, (_, i) => pattern.cells[i] ?? null);
    const max = Math.max(0, ...cells.filter(v => v != null));
    return { cells, loop: pattern.loop ?? max + 4.2, scale: pattern.scale ?? 1, lit: pattern.lit ?? 0.62 };
  }

  function formatTime(ds) {
    if (ds < 600) return `${(ds / 10).toFixed(1)}s`;
    return `${Math.floor(ds / 600)}m ${((ds % 600) / 10).toFixed(1)}s`;
  }

  class LatticeLoader {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.options = Object.assign({
        label: 'Dent Control procesando...',
        doneLabel: 'Respuesta lista en',
        errorLabel: 'Error después de',
        status: 'working',
        pattern: 'orbit',
        grid: 3,
        shape: 'round',
        color: '#2563eb', // Azul profesional Dent Control
        doneColor: '#10b981', // Verde éxito
        errorColor: '#ef4444',
        cellSize: 6,
        gap: 2.5,
        fontSize: 12.5,
        step: 90,
        idleOpacity: 0.20,
        glow: true,
        glowColor: '#3b82f6',
        showTimer: true
      }, options);

      this.timerInterval = null;
      this.startedAt = 0;
      this.currentDs = 0;
      this.init();
    }

    init() {
      const n = this.options.grid === 4 ? 4 : 3;
      const pat = resolvePattern(this.options.pattern, n);
      const marks = MARKS[n];
      const d = this.options.step * pat.scale;
      const cycle = Math.round(pat.loop * d);

      this.root = document.createElement('span');
      this.root.className = 'lattice-loader';
      this.root.setAttribute('role', 'status');
      this.root.setAttribute('data-status', this.options.status);
      this.root.setAttribute('data-shape', this.options.shape);
      if (this.options.glow) this.root.setAttribute('data-glow', '');

      // Variables CSS
      this.root.style.setProperty('--ll-n', n);
      this.root.style.setProperty('--ll-cell', `${this.options.cellSize}px`);
      this.root.style.setProperty('--ll-gap', `${this.options.gap}px`);
      this.root.style.setProperty('--ll-font', `${this.options.fontSize}px`);
      this.root.style.setProperty('--ll-color', this.options.color);
      this.root.style.setProperty('--ll-mark', this.options.doneColor);
      this.root.style.setProperty('--ll-idle', this.options.idleOpacity);
      this.root.style.setProperty('--ll-glow', this.options.glowColor || this.options.color);
      this.root.style.setProperty('--ll-mark-glow', this.options.doneColor);
      this.root.style.setProperty('--ll-cycle', `${cycle}ms`);

      // 1. Grid
      const gridSpan = document.createElement('span');
      gridSpan.className = 'lattice-loader__grid';
      gridSpan.setAttribute('aria-hidden', 'true');

      // Capa Run
      const runLayer = document.createElement('span');
      runLayer.className = 'lattice-loader__layer lattice-loader__run';
      pat.cells.forEach(unit => {
        const cell = document.createElement('span');
        cell.className = 'lattice-loader__cell';
        if (unit == null) {
          cell.setAttribute('data-hole', '');
        } else {
          if (pat.lit && pat.lit !== 0.62) {
            cell.setAttribute('data-lit', Math.round(pat.lit * 100));
          }
          cell.style.animationDelay = `${Math.round(unit * d)}ms`;
        }
        runLayer.appendChild(cell);
      });
      gridSpan.appendChild(runLayer);

      // Capa Mark (Checkmark o Error)
      const markLayer = document.createElement('span');
      markLayer.className = 'lattice-loader__layer lattice-loader__mark';
      const markType = this.options.status === 'error' ? 'error' : 'done';
      pat.cells.forEach((_, i) => {
        const cell = document.createElement('span');
        cell.className = 'lattice-loader__cell';
        if (marks[markType].includes(i)) {
          cell.setAttribute('data-on', '');
        }
        markLayer.appendChild(cell);
      });
      gridSpan.appendChild(markLayer);
      this.root.appendChild(gridSpan);

      // 2. Etiqueta
      const labelSpan = document.createElement('span');
      labelSpan.className = 'lattice-loader__label';
      labelSpan.setAttribute('aria-hidden', 'true');

      this.textWorking = document.createElement('span');
      this.textWorking.className = 'lattice-loader__text';
      this.textWorking.textContent = this.options.label;
      if (this.options.status === 'working') this.textWorking.setAttribute('data-active', '');

      this.textDone = document.createElement('span');
      this.textDone.className = 'lattice-loader__text';
      this.textDone.textContent = this.options.doneLabel;
      if (this.options.status === 'done') this.textDone.setAttribute('data-active', '');

      this.textError = document.createElement('span');
      this.textError.className = 'lattice-loader__text';
      this.textError.textContent = this.options.errorLabel;
      if (this.options.status === 'error') this.textError.setAttribute('data-active', '');

      labelSpan.appendChild(this.textWorking);
      labelSpan.appendChild(this.textDone);
      labelSpan.appendChild(this.textError);
      this.root.appendChild(labelSpan);

      // 3. Temporizador / Cronómetro
      if (this.options.showTimer) {
        this.timerSpan = document.createElement('span');
        this.timerSpan.className = 'lattice-loader__timer';
        this.timerSpan.setAttribute('aria-hidden', 'true');
        this.timerSpan.textContent = '0.0s';
        this.root.appendChild(this.timerSpan);
      }

      this.container.innerHTML = '';
      this.container.appendChild(this.root);

      if (this.options.status === 'working') {
        this.startTimer();
      }
    }

    startTimer() {
      this.stopTimer();
      this.startedAt = performance.now();
      this.currentDs = 0;
      if (this.timerSpan) this.timerSpan.textContent = '0.0s';
      this.timerInterval = setInterval(() => {
        this.currentDs = Math.floor((performance.now() - this.startedAt) / 100);
        if (this.timerSpan) this.timerSpan.textContent = formatTime(this.currentDs);
      }, 100);
    }

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }

    setStatus(status) {
      this.options.status = status;
      this.root.setAttribute('data-status', status);

      this.textWorking.removeAttribute('data-active');
      this.textDone.removeAttribute('data-active');
      this.textError.removeAttribute('data-active');

      if (status === 'working') {
        this.textWorking.setAttribute('data-active', '');
        this.root.style.setProperty('--ll-mark', this.options.doneColor);
        this.startTimer();
      } else if (status === 'done') {
        this.textDone.setAttribute('data-active', '');
        this.root.style.setProperty('--ll-mark', this.options.doneColor);
        this.stopTimer();
      } else if (status === 'error') {
        this.textError.setAttribute('data-active', '');
        this.root.style.setProperty('--ll-mark', this.options.errorColor);
        this.stopTimer();
      }
    }

    destroy() {
      this.stopTimer();
      if (this.root && this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
      }
    }
  }

  window.LatticeLoader = LatticeLoader;

  // Fábrica conveniente para iniciar el loader en cualquier contenedor
  window.crearLatticeLoader = function(container, options) {
    return new LatticeLoader(container, options);
  };
})();
