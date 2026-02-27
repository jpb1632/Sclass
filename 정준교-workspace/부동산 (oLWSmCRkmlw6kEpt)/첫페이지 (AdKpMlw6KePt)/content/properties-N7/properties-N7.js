(function() {
  function initN7ThumbReveal(sectionEl) {
    if (!sectionEl) return;
    var thumb = sectionEl.querySelector(".thumb");
    if (!thumb) return;

    sectionEl.classList.add("reveal-ready");

    var show = function() {
      thumb.classList.add("in-view");
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
    $(".properties-N7[id='FgMLw6KEAS']").each(function() {
      const $block = $(this);

      // .tabset-link를 클릭했을 때 이벤트 핸들러 실행
      $block.find(".tabset-link").click(function() {
        const $idx = $(this).parent().index();
        $block
          .find(".info .item")
          .eq($idx)
          .addClass("active")
          .siblings()
          .removeClass("active");
        $block
          .find(".thumb .item")
          .eq($idx)
          .addClass("active")
          .siblings()
          .removeClass("active");
      });

      initN7ThumbReveal(this);
    });
  });
})();
