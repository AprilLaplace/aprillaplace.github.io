/* === Scroll Reveal — Autum-inspired IntersectionObserver === */
(function() {
  'use strict';

  const SELECTORS = '.reveal, .heading-reveal, .photo-reveal';

  function initReveal() {
    const elements = document.querySelectorAll(SELECTORS);
    if (!elements.length) return;

    // Reveal all elements immediately above viewport + first-visible ones
    // to handle fast-scroll and page-refresh-scrolled scenarios
    elements.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('revealed');
      }
    });

    // IntersectionObserver for below-the-fold reveals
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -30px 0px',
          threshold: 0.05
        }
      );

      elements.forEach(function(el) {
        if (!el.classList.contains('revealed')) {
          observer.observe(el);
        }
      });
    } else {
      // Fallback: reveal all immediately
      elements.forEach(function(el) {
        el.classList.add('revealed');
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
