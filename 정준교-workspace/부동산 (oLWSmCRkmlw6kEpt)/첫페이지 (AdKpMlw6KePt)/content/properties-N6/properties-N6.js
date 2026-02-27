(function() {
  function initN6Reveal() {
    var section = document.querySelector('.properties-N6[id="Wtmlw6KE6z"]');
    if (!section) return;

    var items = section.querySelectorAll(".n6-image-item");
    if (!items.length) return;

    section.classList.add("reveal-ready");

    var show = function() {
      items.forEach(function(item, idx) {
        window.setTimeout(function() {
          item.classList.add("in-view");
        }, idx * 220);
      });
    };

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          show();
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    });

    observer.observe(section);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initN6Reveal);
  } else {
    initN6Reveal();
  }
})();
