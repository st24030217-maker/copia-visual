/**
 * @react-bits/AnimatedContent-JS-CSS
 * Wrapper & engine that animates elements in on scroll or mount, from any direction.
 */
(function () {
  const EASE_MAP = {
    'power1.out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'power2.out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    'power3.out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    'power3.in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    'power4.out': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    'expo.out': 'cubic-bezier(0.19, 1, 0.22, 1)',
    'back.out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'back.out(1.7)': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'back.out(1.4)': 'cubic-bezier(0.28, 1.38, 0.6, 1)',
    'bounce.out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    'linear': 'linear'
  };

  function resolveEase(ease) {
    if (!ease) return EASE_MAP['power3.out'];
    return EASE_MAP[ease] || ease;
  }

  /**
   * Core AnimatedContent function matching @react-bits/AnimatedContent-JS-CSS props
   */
  function AnimatedContent(element, options = {}) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el || !(el instanceof HTMLElement)) return null;

    const {
      container = null,
      distance = 100,
      direction = 'vertical',
      reverse = false,
      duration = 0.8,
      ease = 'power3.out',
      initialOpacity = 0,
      animateOpacity = true,
      scale = 1,
      threshold = 0.1,
      delay = 0,
      disappearAfter = 0,
      disappearDuration = 0.5,
      disappearEase = 'power3.in',
      onComplete = null,
      onDisappearanceComplete = null,
      immediate = false
    } = options;

    if (el._rbAnimatedCleanup) {
      el._rbAnimatedCleanup();
    }

    const isHorizontal = direction === 'horizontal';
    const offset = reverse ? -distance : distance;
    const startTransform = isHorizontal
      ? `translate3d(${offset}px, 0, 0) scale(${scale})`
      : `translate3d(0, ${offset}px, 0) scale(${scale})`;
    const endTransform = 'translate3d(0, 0, 0) scale(1)';
    const startOpacity = animateOpacity ? initialOpacity : 1;

    el.classList.add('rb-animated-content');
    el.style.opacity = String(startOpacity);
    el.style.transform = startTransform;
    el.style.visibility = 'visible';

    let anim = null;
    let disappearAnim = null;
    let disappearTimer = null;
    let observer = null;
    let hasPlayed = false;

    const playAnimation = () => {
      if (hasPlayed) return;
      hasPlayed = true;

      if (typeof el.animate !== 'function') {
        el.style.opacity = '1';
        el.style.transform = 'none';
        if (typeof onComplete === 'function') onComplete();
        return;
      }

      anim = el.animate(
        [
          { opacity: startOpacity, transform: startTransform },
          { opacity: 1, transform: endTransform }
        ],
        {
          duration: Math.max(0, duration * 1000),
          delay: Math.max(0, delay * 1000),
          easing: resolveEase(ease),
          fill: 'forwards'
        }
      );

      anim.onfinish = () => {
        el.style.opacity = '1';
        el.style.transform = '';
        if (typeof onComplete === 'function') onComplete();

        if (disappearAfter > 0) {
          const exitOffset = reverse ? distance : -distance;
          const exitTransform = isHorizontal
            ? `translate3d(${exitOffset}px, 0, 0) scale(0.8)`
            : `translate3d(0, ${exitOffset}px, 0) scale(0.8)`;
          const exitOpacity = animateOpacity ? initialOpacity : 0;

          disappearTimer = setTimeout(() => {
            disappearAnim = el.animate(
              [
                { opacity: 1, transform: endTransform },
                { opacity: exitOpacity, transform: exitTransform }
              ],
              {
                duration: Math.max(0, disappearDuration * 1000),
                easing: resolveEase(disappearEase),
                fill: 'forwards'
              }
            );
            disappearAnim.onfinish = () => {
              if (typeof onDisappearanceComplete === 'function') {
                onDisappearanceComplete();
              }
            };
          }, disappearAfter * 1000);
        }
      };
    };

    if (immediate || typeof IntersectionObserver === 'undefined') {
      requestAnimationFrame(playAnimation);
    } else {
      let rootEl = container || document.getElementById('snap-main-container') || null;
      if (typeof rootEl === 'string') {
        rootEl = document.querySelector(rootEl);
      }

      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              playAnimation();
              if (observer) observer.disconnect();
            }
          });
        },
        {
          root: rootEl,
          threshold: Math.max(0, Math.min(1, threshold))
        }
      );
      observer.observe(el);
    }

    const cleanup = () => {
      if (observer) observer.disconnect();
      if (disappearTimer) clearTimeout(disappearTimer);
      if (anim) anim.cancel();
      if (disappearAnim) disappearAnim.cancel();
    };

    el._rbAnimatedCleanup = cleanup;
    return { play: playAnimation, kill: cleanup };
  }

  /**
   * Initialize any element with [data-animated-content]
   */
  function initDeclarativeAnimatedContent(root = document) {
    const nodes = root.querySelectorAll('[data-animated-content]');
    nodes.forEach(el => {
      if (el.dataset.acInitialized === 'true') return;
      el.dataset.acInitialized = 'true';

      AnimatedContent(el, {
        distance: el.dataset.acDistance !== undefined ? Number(el.dataset.acDistance) : 50,
        direction: el.dataset.acDirection || 'vertical',
        reverse: el.dataset.acReverse === 'true',
        duration: el.dataset.acDuration !== undefined ? Number(el.dataset.acDuration) : 0.75,
        ease: el.dataset.acEase || 'power3.out',
        initialOpacity: el.dataset.acInitialOpacity !== undefined ? Number(el.dataset.acInitialOpacity) : 0,
        animateOpacity: el.dataset.acAnimateOpacity !== 'false',
        scale: el.dataset.acScale !== undefined ? Number(el.dataset.acScale) : 0.98,
        threshold: el.dataset.acThreshold !== undefined ? Number(el.dataset.acThreshold) : 0.1,
        delay: el.dataset.acDelay !== undefined ? Number(el.dataset.acDelay) : 0,
        disappearAfter: el.dataset.acDisappearAfter !== undefined ? Number(el.dataset.acDisappearAfter) : 0
      });
    });
  }

  /**
   * Animate the initial dashboard (#section-inicio) cards & tables with @react-bits/AnimatedContent-JS-CSS
   */
  function animateDashboardInicio() {
    const inicio = document.getElementById('section-inicio');
    if (!inicio || inicio.classList.contains('hidden')) return;

    const topBar = inicio.querySelector(':scope > div:first-child');
    if (topBar) {
      AnimatedContent(topBar, {
        distance: 28,
        direction: 'vertical',
        reverse: true,
        duration: 0.65,
        ease: 'power3.out',
        scale: 0.99,
        delay: 0.02
      });
    }

    const stageCards = inicio.querySelectorAll(':scope > .grid > div');
    stageCards.forEach((card, idx) => {
      AnimatedContent(card, {
        distance: 44,
        direction: 'vertical',
        duration: 0.72,
        ease: 'power3.out',
        scale: 0.97,
        delay: 0.06 + idx * 0.065
      });
    });

    const generalTableCard = inicio.querySelector(':scope > div:last-child');
    if (generalTableCard && generalTableCard !== topBar) {
      AnimatedContent(generalTableCard, {
        distance: 48,
        direction: 'vertical',
        duration: 0.78,
        ease: 'power3.out',
        scale: 0.985,
        delay: 0.28
      });
    }
  }

  /**
   * Automatically animate newly rendered views inside #section-dynamic
   * (Order details, tabs, Doctor details, and all sidebar modules)
   */
  function animateDynamicSection(container) {
    if (!container || container.classList.contains('hidden')) return;

    const rootCard = container.firstElementChild;
    if (!rootCard) return;

    AnimatedContent(rootCard, {
      distance: 36,
      direction: 'vertical',
      duration: 0.6,
      ease: 'power3.out',
      scale: 0.985,
      delay: 0,
      immediate: true
    });

    // Animate internal blocks / grid children with subtle stagger
    const innerBlocks = rootCard.querySelectorAll(':scope > .grid > div, :scope > div > .grid > div');
    innerBlocks.forEach((block, index) => {
      if (index > 8) return;
      AnimatedContent(block, {
        distance: 26,
        direction: index % 2 === 0 ? 'vertical' : 'horizontal',
        reverse: false,
        duration: 0.58,
        ease: 'power3.out',
        scale: 0.98,
        delay: 0.05 + index * 0.05,
        immediate: true
      });
    });

    initDeclarativeAnimatedContent(container);
  }

  function setupObservers() {
    initDeclarativeAnimatedContent(document);
    animateDashboardInicio();

    // Login card animation if on login page
    const loginCard = document.querySelector('.login-card, main > div > .bg-white, form#loginForm');
    if (loginCard && !document.getElementById('section-inicio')) {
      AnimatedContent(loginCard.closest('.rounded-3xl') || loginCard, {
        distance: 45,
        direction: 'vertical',
        duration: 0.8,
        ease: 'power3.out',
        scale: 0.96,
        immediate: true
      });
    }

    // Observe #section-dynamic for module / order / tab renders
    const dynamicSection = document.getElementById('section-dynamic');
    if (dynamicSection) {
      let rafId = null;
      const dynObserver = new MutationObserver(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          animateDynamicSection(dynamicSection);
        });
      });
      dynObserver.observe(dynamicSection, { childList: true });
    }

    // Observe #section-inicio when returning to Inicio
    const inicioSection = document.getElementById('section-inicio');
    if (inicioSection) {
      const inicioObserver = new MutationObserver(mutations => {
        mutations.forEach(m => {
          if (m.attributeName === 'class' && !inicioSection.classList.contains('hidden')) {
            animateDashboardInicio();
          }
        });
      });
      inicioObserver.observe(inicioSection, { attributes: true, attributeFilter: ['class'] });
    }

    // Observe modals opening (.hidden removed) to animate their inner dialog card
    const modalIds = ['modalCanceladas', 'modalPendientes', 'modalUniversalForm', 'modalOdonto', 'modalDigitalCard'];
    modalIds.forEach(id => {
      const modalEl = document.getElementById(id);
      if (!modalEl) return;
      const modalObs = new MutationObserver(mutations => {
        mutations.forEach(m => {
          if (m.attributeName === 'class' && !modalEl.classList.contains('hidden')) {
            const dialog = modalEl.firstElementChild;
            if (dialog) {
              AnimatedContent(dialog, {
                distance: 34,
                direction: 'vertical',
                duration: 0.48,
                ease: 'back.out(1.4)',
                scale: 0.94,
                immediate: true
              });
            }
          }
        });
      });
      modalObs.observe(modalEl, { attributes: true, attributeFilter: ['class'] });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupObservers);
  } else {
    setupObservers();
  }

  window.AnimatedContent = AnimatedContent;
  window.initAnimatedContent = initDeclarativeAnimatedContent;
})();
