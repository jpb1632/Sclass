(function() {
  function initN6Reveal() {
    var section = document.querySelector('.properties-N6[id="Wtmlw6KE6z"]');
    if (!section) return;

    var items = section.querySelectorAll('.n6-image-item');
    if (!items.length) return;

    section.classList.add('reveal-ready');

    if (!('IntersectionObserver' in window)) {
      items.forEach(function(item) {
        item.classList.add('in-view');
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.4,
      rootMargin: '0px 0px -6% 0px'
    });

    items.forEach(function(item) {
      observer.observe(item);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initN6Reveal);
  } else {
    initN6Reveal();
  }
})();
