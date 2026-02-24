(function() {
  $(function() {
    $(".properties-N4[id=\'pGmlW6KDwI\']").each(function() {
      const $block = $(this);
      const $closeBtn = $block.find(".slide-close");
      function syncSlideClosePosition() {
        if (!$closeBtn.length) return;
        if (window.innerWidth <= 992) {
          $closeBtn[0].style.setProperty("top", "0.2rem", "important");
          $closeBtn[0].style.setProperty("right", "5.1rem", "important");
          $closeBtn[0].style.setProperty("left", "auto", "important");
          $closeBtn[0].style.setProperty("bottom", "auto", "important");
          $closeBtn[0].style.setProperty("transform", "none", "important");
          $closeBtn[0].style.setProperty("background", "transparent", "important");
          $closeBtn[0].style.setProperty("border-radius", "0", "important");
          $closeBtn[0].style.setProperty("width", "2.8rem", "important");
          $closeBtn[0].style.setProperty("height", "2.8rem", "important");
          $closeBtn[0].style.setProperty("font-size", "2.6rem", "important");
        } else {
          $closeBtn[0].style.setProperty("top", "1rem", "important");
          $closeBtn[0].style.setProperty("right", "1rem", "important");
          $closeBtn[0].style.setProperty("left", "auto", "important");
          $closeBtn[0].style.setProperty("bottom", "auto", "important");
          $closeBtn[0].style.setProperty("transform", "none", "important");
          $closeBtn[0].style.setProperty("background", "rgba(15, 29, 54, 0.45)", "important");
          $closeBtn[0].style.setProperty("border-radius", "50%", "important");
          $closeBtn[0].style.setProperty("width", "3.4rem", "important");
          $closeBtn[0].style.setProperty("height", "3.4rem", "important");
          $closeBtn[0].style.setProperty("font-size", "2.4rem", "important");
        }
      }
      syncSlideClosePosition();
      $(window).on("load resize orientationchange", syncSlideClosePosition);
      // Swiper
      const swiper = new Swiper(".properties-N4[id=\'pGmlW6KDwI\'] .swiper", {
        loop: true,
        speed: 1000,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: $block.find(".swiper-pagination")[0],
          clickable: true,
        },
      });
      // ?뺤?
      $block.find(".btn-pause").click(function() {
        swiper.autoplay.stop();
        $(this).removeClass("active");
        $(this).siblings().addClass("active");
      });
      // ?ъ깮
      $block.find(".btn-play").click(function() {
        swiper.autoplay.start();
        $(this).removeClass("active");
        $(this).siblings().addClass("active");
      });
      // ?щ씪?대뱶 ?대┃ 留곹겕 鍮꾪솢?깊솕
      $block.find(".swiper-slide a").on("click", function(event) {
        event.preventDefault();
      });
      // ?щ씪?대뵫 ?앹뾽 ?リ린
      $block.find(".slide-close").on("click", function() {
        swiper.autoplay.stop();
        $block.find(".slide-area").addClass("is-closed");
      });
    });
  });
})();

