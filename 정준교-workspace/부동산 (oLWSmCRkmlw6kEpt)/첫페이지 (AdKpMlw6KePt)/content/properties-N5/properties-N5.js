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
      '<div class="n5-lightbox-inner" role="dialog" aria-modal="true" aria-label="프리미엄 이미지 확대보기">',
      '  <img class="n5-lightbox-image" alt="프리미엄 이미지 확대보기">',
      '  <button type="button" class="n5-lightbox-close" aria-label="닫기">&times;</button>',
      "</div>"
    ].join("");
    sectionEl.appendChild(overlay);

    var lightboxImage = overlay.querySelector(".n5-lightbox-image");
    var closeButton = overlay.querySelector(".n5-lightbox-close");
    var scrollBackup = "";

    var close = function() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      lightboxImage.removeAttribute("src");
      document.body.style.overflow = scrollBackup;
    };

    var open = function(src, alt) {
      if (!src || !canOpen()) return;
      scrollBackup = document.body.style.overflow || "";
      lightboxImage.src = src;
      lightboxImage.alt = alt || "프리미엄 이미지 확대보기";
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    overlay.addEventListener("click", function(evt) {
      if (evt.target === overlay || evt.target === closeButton) {
        close();
      }
    });

    document.addEventListener("keydown", function(evt) {
      if (evt.key === "Escape" && overlay.classList.contains("is-open")) {
        close();
      }
    });

    var images = sectionEl.querySelectorAll(".n5-card-thumb img");
    images.forEach(function(img) {
      img.classList.add("n5-zoomable");
      img.addEventListener("click", function() {
        open(img.getAttribute("src"), img.getAttribute("alt"));
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

    observer.observe(sectionEl);
  }

  $(function() {
    $(".properties-N5[id='mbmLw6KE2H']").each(function() {
      const blockSelector = ".properties-N5[id='mbmLw6KE2H']";
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
