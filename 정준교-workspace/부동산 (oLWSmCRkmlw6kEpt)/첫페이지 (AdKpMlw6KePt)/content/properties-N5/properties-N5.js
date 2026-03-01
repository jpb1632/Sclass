(function() {
  function initN5MobileZoom(sectionEl) {
    if (!sectionEl || sectionEl.querySelector(".n5-lightbox")) return;
    var coarseMq = window.matchMedia("(pointer: coarse)");
    var mobileMq = window.matchMedia("(max-width: 992px)");
    var canOpen = function() {
      return coarseMq.matches || mobileMq.matches;
    };

    var overlay = document.createElement("div");
    overlay.className = "n5-lightbox";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = [
      '<div class="n5-lightbox-inner" role="dialog" aria-modal="true" aria-label="프리미엄 이미지 상세보기">',
      '  <img class="n5-lightbox-image" alt="프리미엄 이미지 상세보기">',
      '  <button type="button" class="n5-lightbox-close" aria-label="닫기">&times;</button>',
      "</div>"
    ].join("");
    sectionEl.appendChild(overlay);

    var lightboxImage = overlay.querySelector(".n5-lightbox-image");
    var closeButton = overlay.querySelector(".n5-lightbox-close");
    var images = Array.prototype.slice.call(sectionEl.querySelectorAll(".n5-card-thumb img"));
    var currentIndex = -1;
    var scrollBackup = "";
    var touchStartX = 0;
    var touchStartY = 0;
    var touchDeltaX = 0;
    var touchDeltaY = 0;
    var touchTracking = false;

    var close = function() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      lightboxImage.removeAttribute("src");
      document.body.style.overflow = scrollBackup;
      currentIndex = -1;
    };

    var renderIndex = function(index) {
      if (!images.length) return;
      var count = images.length;
      currentIndex = ((index % count) + count) % count;
      var target = images[currentIndex];
      lightboxImage.src = target.getAttribute("src") || "";
      lightboxImage.alt = target.getAttribute("alt") || "프리미엄 이미지 상세보기";
    };

    var openByIndex = function(index) {
      if (!images.length || !canOpen()) return;
      scrollBackup = document.body.style.overflow || "";
      renderIndex(index);
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    var showPrev = function() {
      if (!overlay.classList.contains("is-open")) return;
      renderIndex(currentIndex - 1);
    };

    var showNext = function() {
      if (!overlay.classList.contains("is-open")) return;
      renderIndex(currentIndex + 1);
    };

    overlay.addEventListener("click", function(evt) {
      if (evt.target === overlay || evt.target === closeButton) {
        close();
      }
    });

    document.addEventListener("keydown", function(evt) {
      if (!overlay.classList.contains("is-open")) return;
      if (evt.key === "Escape") {
        close();
      } else if (evt.key === "ArrowLeft") {
        showPrev();
      } else if (evt.key === "ArrowRight") {
        showNext();
      }
    });

    overlay.addEventListener(
      "touchstart",
      function(evt) {
        if (!overlay.classList.contains("is-open")) return;
        var touch = evt.touches && evt.touches[0];
        if (!touch) return;
        touchTracking = true;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchDeltaX = 0;
        touchDeltaY = 0;
      },
      { passive: true, capture: true }
    );

    overlay.addEventListener(
      "touchmove",
      function(evt) {
        if (!overlay.classList.contains("is-open") || !touchTracking) return;
        var touch = evt.touches && evt.touches[0];
        if (!touch) return;
        touchDeltaX = touch.clientX - touchStartX;
        touchDeltaY = touch.clientY - touchStartY;

        // In lightbox, prioritize horizontal swipe for next/prev.
        if (Math.abs(touchDeltaX) > Math.abs(touchDeltaY)) {
          evt.preventDefault();
        }
      },
      { passive: false, capture: true }
    );

    overlay.addEventListener(
      "touchend",
      function(evt) {
        if (!overlay.classList.contains("is-open") || !touchTracking) return;
        var touch = evt.changedTouches && evt.changedTouches[0];
        if (touch) {
          touchDeltaX = touch.clientX - touchStartX;
          touchDeltaY = touch.clientY - touchStartY;
        }

        if (Math.abs(touchDeltaX) > 42 && Math.abs(touchDeltaX) > Math.abs(touchDeltaY) * 1.2) {
          if (touchDeltaX < 0) {
            showNext();
          } else {
            showPrev();
          }
        }

        touchTracking = false;
        touchDeltaX = 0;
        touchDeltaY = 0;
      },
      { passive: true, capture: true }
    );

    images.forEach(function(img, index) {
      img.classList.add("n5-zoomable");
      img.addEventListener("click", function() {
        openByIndex(index);
      });
    });
  }

  function initN5Reveal(sectionEl) {
    if (!sectionEl) return;
    var cards = sectionEl.querySelectorAll(".swiper-slide .n5-card");
    if (!cards.length) return;

    sectionEl.classList.add("reveal-ready");

    var show = function() {
      cards.forEach(function(card, idx) {
        window.setTimeout(function() {
          card.classList.add("in-view");
        }, idx * 120);
      });
    };

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    var observer = new IntersectionObserver(
      function(entries, obs) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            show();
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    observer.observe(sectionEl);
  }

  $(function() {
    $(".properties-N5[id='mbmLw6KE2H']").each(function() {
      var blockSelector = ".properties-N5[id='mbmLw6KE2H']";
      new Swiper(blockSelector + " .n5-swiper", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        speed: 700,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        navigation: {
          prevEl: blockSelector + " .n5-btn-prev",
          nextEl: blockSelector + " .n5-btn-next"
        },
        pagination: {
          el: blockSelector + " .n5-pagination",
          clickable: true
        },
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 }
        }
      });

      initN5MobileZoom(this);
      initN5Reveal(this);
    });
  });
})();
