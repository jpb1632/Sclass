(function() {
  $(function() {
    $(".properties-N1[id=\'gmmlW6kdpj\']").each(function() {
      const $block = $(this);
      let isMobileMenuInitialized = false;
      let isDesktopMenuInitialized = false;
      const BASE_HEADER_TOP = -4;
      const DESKTOP_SECTION_SHIFT = -26;
      const MOBILE_SECTION_SHIFT = -26;

      function getBaseSectionShift() {
        return window.innerWidth <= 992 ? MOBILE_SECTION_SHIFT : DESKTOP_SECTION_SHIFT;
      }

      function forceTopGapFix() {
        const html = document.documentElement;
        const body = document.body;
        if (html) {
          html.style.setProperty("margin-top", "0px", "important");
          html.style.setProperty("padding-top", "0px", "important");
        }
        if (body) {
          body.style.setProperty("margin-top", "0px", "important");
          body.style.setProperty("padding-top", "0px", "important");
        }
        $block[0].style.setProperty("top", BASE_HEADER_TOP + "px", "important");
        const firstSection = document.querySelector(".properties-N4");
        if (firstSection) {
          firstSection.style.setProperty("margin-top", getBaseSectionShift() + "px", "important");
        }
      }
      // 모바일 메뉴 초기화
      function initMobileMenu() {
        if (isMobileMenuInitialized) return;
        const $btnMomenu = $block.find(".btn-momenu");
        $btnMomenu.off("click").on("click", function() {
          if ($block.hasClass("block-active")) {
            $block.removeClass("block-active");
          } else {
            $block.addClass("block-active");
          }
          $block.find(".header-gnbitem").removeClass("item-active");
          $block.find(".header-sublist").removeAttr("style");
        });
        // header-gnbitem 클릭 이벤트
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          const $sublist = $this.find(".header-sublist");
          if ($sublist.length) {
            $thisLink.off("click").on("click", function(event) {
              event.preventDefault();
              const $clickedItem = $(this).parents(".header-gnbitem");
              if (!$clickedItem.hasClass("item-active")) {
                $block.find(".header-gnbitem").removeClass("item-active");
                $block.find(".header-sublist").stop().slideUp(300);
              }
              $clickedItem.toggleClass("item-active");
              $sublist.stop().slideToggle(300);
            });
          }
        });
        isMobileMenuInitialized = true;
      }
      // 데스크탑 메뉴 초기화
      function initDesktopMenu() {
        if (isDesktopMenuInitialized) return;
        $block.find(".header-gnbitem").each(function() {
          const $this = $(this);
          const $thisLink = $this.find(".header-gnblink");
          $thisLink.off("click");
        });
        isDesktopMenuInitialized = true;
      }
      // 해상도에 따른 메뉴 처리
      function handleResize() {
        if (window.innerWidth <= 992) {
          if (!isMobileMenuInitialized) {
            initMobileMenu();
          }
          isDesktopMenuInitialized = false;
        } else {
          if (!isDesktopMenuInitialized) {
            initDesktopMenu();
          }
          isMobileMenuInitialized = false;
        }
      }
      // 스크롤 시 메뉴 처리
      function handleScroll() {
        $block.removeClass("top-menu-active");
        if ($(window).scrollTop() === 0) {
          $block.addClass("header-top-active");
        }
        $(window).scroll(function() {
          if ($(window).scrollTop() > 0) {
            $block.removeClass("header-top-active");
          } else {
            $block.addClass("header-top-active");
          }
        });
      }
      handleScroll();
      forceTopGapFix();
      $(window).on("load resize orientationchange", forceTopGapFix);
      // 전체 메뉴 열기/닫기 처리
      function handleFullMenu() {
        $block.find(".btn-allmenu").on("click", function() {
          $block.find(".header-fullmenu").addClass("fullmenu-active");
        });
        $block.find(".fullmenu-close").on("click", function() {
          $block.find(".header-fullmenu").removeClass("fullmenu-active");
        });
        $block.find(".fullmenu-gnbitem").each(function() {
          const $this = $(this);
          $this.on("mouseover", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").addClass("on");
            }
          });
          $this.on("mouseout", function() {
            if (window.innerWidth > 992) {
              $this.find(".fullmenu-gnblink").removeClass("on");
            }
          });
        });
      }
      handleFullMenu();
      // 리사이즈 시마다 메뉴 동작 초기화
      $(window).on("resize", function() {
        handleResize();
      });
      handleResize();
    });
  });
})();


﻿(function() {
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


(function() {
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
    });
  });
})();

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

(function() {
  $(function() {
    $(".properties-N7[id=\'FgMLw6KEAS\']").each(function() {
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
    });
  });
})();
﻿(function() {
  function initN8Reveal() {
    var section = document.querySelector('.properties-N8[id="ciMLW6keFd"]');
    if (!section) return;

    var items = section.querySelectorAll('.addr');
    if (!items.length) return;

    section.classList.add('reveal-ready');

    var showItems = function() {
      items.forEach(function(item, idx) {
        window.setTimeout(function() {
          item.classList.add('in-view');
        }, idx * 420);
      });
    };

    if (!('IntersectionObserver' in window)) {
      showItems();
      return;
    }

    var observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          showItems();
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initN8Reveal);
  } else {
    initN8Reveal();
  }
})();

(function() {
  $(function() {
    $(".properties-N9[id=\'vzMlw6KehW\']").each(function() {
      const $block = $(this);
      const $checksetWrap = $block.find(".checkset-wrap");
      // 체크박스 그룹 유효성 체크 input 추가
      if ($checksetWrap.length) {
        const $validator = $('<input>', {
          type: 'text',
          required: true,
          style: 'position: absolute; opacity: 0; pointer-events: none;',
          tabindex: -1
        }).insertBefore($checksetWrap.find('.checkset-input').first());
        const $groupChecks = $checksetWrap.find('.checkset-input');
        // 기존 체크박스의 required 속성 제거
        $groupChecks.prop('required', false);
        // 체크박스 상태 변경 이벤트
        $groupChecks.on('change', function() {
          if ($groupChecks.is(':checked')) {
            $validator.val('checked');
            $validator[0].setCustomValidity('');
          } else {
            $validator.val('');
            $validator[0].setCustomValidity('목적을 최소 하나 이상 선택해주세요.');
          }
        });
        // 초기 상태 설정
        $validator.val('');
        $validator[0].setCustomValidity('목적을 최소 하나 이상 선택해주세요.');
      }
    });
  });
})();