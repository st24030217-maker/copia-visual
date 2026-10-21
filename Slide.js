/**
 * Slide.js
 * Vanilla JS adapter for loading-dev Slide component
 */
(function() {
  'use strict';

  function renderSlideHtml(options = {}) {
    const size = options.size || 48;
    const speed = options.speed || 2400;
    const color = options.color || '#334155';
    const className = options.className || '';

    return `
      <div class="ld-slide ${className}" style="--ld-size: ${size}px; --ld-duration: ${speed}ms; color: ${color};" role="status" aria-label="Cargando">
        <div class="ld-slide-dot" data-step="0"></div>
        <div class="ld-slide-dot" data-step="1"></div>
        <div class="ld-slide-dot" data-step="2"></div>
      </div>
    `.trim();
  }

  function mountSlide(container, options = {}) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return null;
    el.innerHTML = renderSlideHtml(options);
    return el.firstElementChild;
  }

  window.renderSlideHtml = renderSlideHtml;
  window.mountSlide = mountSlide;
  window.Slide = {
    render: renderSlideHtml,
    mount: mountSlide
  };
})();
