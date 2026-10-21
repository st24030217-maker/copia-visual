/**
 * AnimatedList.js
 * Vanilla JS implementation of @react-bits/AnimatedList-JS-CSS
 * Lista interactiva de alto rendimiento con animaciones de resorte fisico,
 * indicador flotante y navegacion por teclado/raton.
 */
(function() {
  'use strict';

  const SPRING = 'linear(0, 0.0603, 0.2033, 0.3821, 0.5633, 0.7258, 0.8584, 0.9574, 1.0242, 1.0634, 1.0809, 1.0828, 1.0747, 1.0613, 1.046, 1.0313, 1.0186, 1.0085, 1.0012, 0.9965, 0.994, 0.9931, 0.9933, 0.9941, 0.9953, 0.9966, 0.9978, 0.9988, 1)';

  const HIDDEN = {
    pop: { above: 'translate3d(0, -12px, 0) scale(0.8)', below: 'translate3d(0, 12px, 0) scale(0.8)' },
    slide: { above: 'translate3d(0, -28px, 0) scale(0.98)', below: 'translate3d(0, 28px, 0) scale(0.98)' },
    fade: { above: 'translate3d(0, -4px, 0)', below: 'translate3d(0, 4px, 0)' }
  };

  const THEMES = {
    light: {
      '--al-frame': 'rgba(248, 250, 252, 0.85)',
      '--al-frame-edge': 'rgba(15, 23, 42, 0.08)',
      '--al-frame-highlight': '#ffffff',
      '--al-frame-shadow': '0 10px 25px -10px rgba(15, 23, 42, 0.1)',
      '--al-tile': '#ffffff',
      '--al-tile-edge': 'rgba(15, 23, 42, 0.08)',
      '--al-tile-highlight': '#ffffff',
      '--al-tile-shadow': '0 2px 6px -2px rgba(15, 23, 42, 0.08)',
      '--al-well': 'rgba(15, 23, 42, 0.04)',
      '--al-ink': '#0f172a',
      '--al-muted': '#64748b',
      '--al-thumb': 'rgba(15, 23, 42, 0.16)',
      '--al-ring': 'rgba(15, 23, 42, 0.22)',
      '--al-ring-fill': 'rgba(15, 23, 42, 0.02)',
      '--al-hover': 'brightness(0.98)',
      '--al-press': 'brightness(0.94)',
      '--al-active': 'none'
    },
    dark: {
      '--al-frame': 'rgba(30, 41, 59, 0.75)',
      '--al-frame-edge': 'rgba(255, 255, 255, 0.08)',
      '--al-frame-highlight': 'rgba(255, 255, 255, 0.06)',
      '--al-frame-shadow': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
      '--al-tile': 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      '--al-tile-edge': 'rgba(255, 255, 255, 0.08)',
      '--al-tile-highlight': 'rgba(255, 255, 255, 0.1)',
      '--al-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.5)',
      '--al-well': 'rgba(255, 255, 255, 0.06)',
      '--al-ink': '#f8fafc',
      '--al-muted': 'rgba(241, 245, 249, 0.6)',
      '--al-thumb': 'rgba(255, 255, 255, 0.18)',
      '--al-ring': 'rgba(255, 255, 255, 0.25)',
      '--al-ring-fill': 'rgba(255, 255, 255, 0.04)',
      '--al-hover': 'brightness(1.1)',
      '--al-press': 'brightness(0.88)',
      '--al-active': 'brightness(1.12)'
    }
  };

  class AnimatedList {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.options = Object.assign({
        items: [],
        onItemSelect: null,
        initialSelectedIndex: -1,
        selectOnHover: true,
        enableArrowNavigation: true,
        loop: false,
        animation: 'pop',
        animateOnce: false,
        stagger: 0.04,
        showGradients: true,
        fadeSize: 40,
        displayScrollbar: true,
        frame: false, // Por defecto plano para incrustar limpiamente en paneles
        theme: 'light',
        radius: 12,
        gap: 6,
        width: '100%',
        maxHeight: 'none',
        className: '',
        itemClassName: ''
      }, options);

      this.selected = this.options.initialSelectedIndex;
      this.itemElements = [];
      this.motion = { y: 0, h: 0, vy: 0, vh: 0, ty: 0, th: 0, ready: false };
      this.raf = null;
      this.lastTime = 0;
      this.isKeyboardNav = false;

      this.init();
    }

    init() {
      const opt = this.options;
      const themeVars = THEMES[opt.theme] || THEMES.light;

      // 1. Contenedor Raiz
      this.root = document.createElement('div');
      this.root.className = `animated-list ${opt.frame ? 'animated-list--framed' : ''} ${opt.className}`.trim();
      this.root.style.setProperty('--al-width', typeof opt.width === 'number' ? `${opt.width}px` : opt.width);
      this.root.style.setProperty('--al-radius', `${opt.radius}px`);
      this.root.style.setProperty('--al-gap', `${opt.gap}px`);
      this.root.style.width = '100%';

      Object.entries(themeVars).forEach(([k, v]) => {
        this.root.style.setProperty(k, v);
      });

      // Rim del frame si es enmarcado
      if (opt.frame) {
        const rim = document.createElement('div');
        rim.className = 'animated-list__frame-rim';
        this.root.appendChild(rim);
      }

      // 2. Viewport
      this.viewport = document.createElement('div');
      this.viewport.className = `animated-list__viewport ${!opt.displayScrollbar ? 'animated-list__viewport--bare' : ''}`;
      this.viewport.tabIndex = opt.enableArrowNavigation ? 0 : -1;
      this.viewport.setAttribute('role', 'listbox');
      if (opt.maxHeight && opt.maxHeight !== 'none') {
        this.viewport.style.maxHeight = typeof opt.maxHeight === 'number' ? `${opt.maxHeight}px` : opt.maxHeight;
      }

      // 3. Track
      this.track = document.createElement('div');
      this.track.className = 'animated-list__track';

      // 4. Indicador flotante con fisica de resorte
      this.indicator = document.createElement('div');
      this.indicator.className = 'animated-list__indicator';
      this.ring = document.createElement('div');
      this.ring.className = 'animated-list__ring';
      this.indicator.appendChild(this.ring);
      this.track.appendChild(this.indicator);

      // 5. Items
      this.renderItems();

      this.viewport.appendChild(this.track);
      this.root.appendChild(this.viewport);

      this.container.innerHTML = '';
      this.container.appendChild(this.root);

      // 6. Event listeners
      this.bindEvents();

      // Iniciar animacion de entrada escalonada
      this.animateEntrance();

      if (this.selected >= 0 && this.selected < this.itemElements.length) {
        this.updateIndicator(true);
      }

      // Renderizar iconos lucide si estan disponibles
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    renderItems() {
      this.itemElements = [];
      const opt = this.options;

      opt.items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = `animated-list__item ${opt.itemClassName}`.trim();
        itemEl.setAttribute('role', 'option');
        itemEl.setAttribute('data-index', String(index));
        itemEl.setAttribute('aria-selected', index === this.selected ? 'true' : 'false');
        if (index === this.selected) itemEl.setAttribute('data-selected', '');

        // Lead icon
        if (item.icon) {
          const lead = document.createElement('div');
          lead.className = 'animated-list__lead';
          if (typeof item.icon === 'string') {
            if (item.icon.includes('<') || item.icon.includes('data:')) {
              lead.innerHTML = item.icon;
            } else {
              // Nombre de icono lucide
              lead.innerHTML = `<i data-lucide="${item.icon}" class="w-4 h-4 text-slate-700"></i>`;
            }
          } else if (item.icon instanceof HTMLElement) {
            lead.appendChild(item.icon);
          }
          itemEl.appendChild(lead);
        }

        // Text
        const text = document.createElement('div');
        text.className = 'animated-list__text';

        const title = document.createElement('div');
        title.className = 'animated-list__title text-xs sm:text-[13px] font-semibold text-slate-800';
        title.textContent = item.title || '';
        text.appendChild(title);

        if (item.description) {
          const desc = document.createElement('div');
          desc.className = 'animated-list__description text-[11px] sm:text-xs text-slate-500 font-normal';
          desc.textContent = item.description;
          text.appendChild(desc);
        }

        itemEl.appendChild(text);

        // Meta tag
        if (item.meta) {
          const meta = document.createElement('div');
          meta.className = 'animated-list__meta text-[10.5px] font-medium text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-md';
          meta.textContent = item.meta;
          itemEl.appendChild(meta);
        }

        // Rim
        const rim = document.createElement('div');
        rim.className = 'animated-list__rim';
        itemEl.appendChild(rim);

        // Click handler
        itemEl.addEventListener('click', (e) => {
          this.selectIndex(index, false);
          if (typeof item.onClick === 'function') {
            item.onClick(item, index, e);
          }
          if (typeof opt.onItemSelect === 'function') {
            opt.onItemSelect(item, index, e);
          }
        });

        // Hover handler
        if (opt.selectOnHover) {
          itemEl.addEventListener('mouseenter', () => {
            if (!this.isKeyboardNav) {
              this.selectIndex(index, false);
            }
          });
        }

        this.track.appendChild(itemEl);
        this.itemElements.push(itemEl);
      });
    }

    bindEvents() {
      // Keyboard Navigation
      if (this.options.enableArrowNavigation) {
        this.viewport.addEventListener('keydown', (e) => {
          const count = this.itemElements.length;
          if (!count) return;

          let targetIndex = this.selected;

          if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.isKeyboardNav = true;
            targetIndex = this.options.loop ? (targetIndex + 1) % count : Math.min(count - 1, targetIndex + 1);
            this.selectIndex(targetIndex, false);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.isKeyboardNav = true;
            targetIndex = this.options.loop ? (targetIndex - 1 + count) % count : Math.max(0, targetIndex - 1);
            this.selectIndex(targetIndex, false);
          } else if (e.key === 'Home') {
            e.preventDefault();
            this.selectIndex(0, false);
          } else if (e.key === 'End') {
            e.preventDefault();
            this.selectIndex(count - 1, false);
          } else if (e.key === 'Enter' || e.key === ' ') {
            if (this.selected >= 0 && this.selected < count) {
              e.preventDefault();
              const itemEl = this.itemElements[this.selected];
              if (itemEl) itemEl.click();
            }
          }
        });

        this.viewport.addEventListener('mousemove', () => {
          this.isKeyboardNav = false;
        });
      }

      // Mouse leave -> deseleccionar indicador si corresponde
      this.root.addEventListener('mouseleave', () => {
        if (this.options.selectOnHover && this.options.initialSelectedIndex === -1) {
          this.selectIndex(-1, false);
        }
      });
    }

    animateEntrance() {
      if (this.options.animation === 'none') return;
      const animType = HIDDEN[this.options.animation] ? this.options.animation : 'pop';

      this.itemElements.forEach((el, i) => {
        el.style.transform = HIDDEN[animType].below;
        el.style.opacity = '0';
        el.style.transition = `transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 350ms ease`;
        el.style.transitionDelay = `${(i * this.options.stagger * 1000).toFixed(0)}ms`;

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transform = 'translate3d(0, 0, 0)';
            el.style.opacity = '1';
          });
        });
      });
    }

    selectIndex(index, snap = false) {
      this.selected = index;

      this.itemElements.forEach((el, i) => {
        if (i === index) {
          el.setAttribute('data-selected', '');
          el.setAttribute('aria-selected', 'true');
        } else {
          el.removeAttribute('data-selected');
          el.setAttribute('aria-selected', 'false');
        }
      });

      this.updateIndicator(snap);
    }

    updateIndicator(snap = false) {
      const activeEl = this.itemElements[this.selected];
      if (!activeEl) {
        this.indicator.style.opacity = '0';
        this.motion.ready = false;
        return;
      }

      this.indicator.style.opacity = '1';
      this.motion.ty = activeEl.offsetTop;
      this.motion.th = activeEl.offsetHeight;

      if (snap || !this.motion.ready) {
        this.motion.y = this.motion.ty;
        this.motion.h = this.motion.th;
        this.motion.vy = 0;
        this.motion.vh = 0;
        this.motion.ready = true;
        this.renderIndicatorPosition();
        return;
      }

      if (!this.raf) {
        this.lastTime = performance.now();
        this.raf = requestAnimationFrame((now) => this.springStep(now));
      }
    }

    springStep(now) {
      this.raf = null;
      const dt = Math.min(0.05, (now - this.lastTime) / 1000 || 0);
      this.lastTime = now;

      // Parametros fisicos de resorte
      const omega = 30;
      const zeta = 0.78;
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;

      for (let i = 0; i < steps; i++) {
        this.motion.vy += (omega * omega * (this.motion.ty - this.motion.y) - 2 * zeta * omega * this.motion.vy) * h;
        this.motion.vh += (omega * omega * (this.motion.th - this.motion.h) - 2 * zeta * omega * this.motion.vh) * h;
        this.motion.y += this.motion.vy * h;
        this.motion.h += this.motion.vh * h;
      }

      const isMoving =
        Math.abs(this.motion.ty - this.motion.y) > 0.05 ||
        Math.abs(this.motion.th - this.motion.h) > 0.05 ||
        Math.abs(this.motion.vy) + Math.abs(this.motion.vh) > 0.5;

      if (!isMoving) {
        this.motion.y = this.motion.ty;
        this.motion.h = this.motion.th;
        this.motion.vy = 0;
        this.motion.vh = 0;
      }

      this.renderIndicatorPosition();

      if (isMoving) {
        this.raf = requestAnimationFrame((n) => this.springStep(n));
      }
    }

    renderIndicatorPosition() {
      this.indicator.style.transform = `translate3d(0, ${this.motion.y.toFixed(2)}px, 0)`;
      this.indicator.style.height = `${this.motion.h.toFixed(2)}px`;
    }

    setItems(items) {
      this.options.items = items;
      this.renderItems();
      this.animateEntrance();
      this.selectIndex(this.options.initialSelectedIndex, true);
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    destroy() {
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = null;
      }
      if (this.root && this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
      }
    }
  }

  window.AnimatedList = AnimatedList;
  window.crearAnimatedList = function(container, options) {
    return new AnimatedList(container, options);
  };
})();
