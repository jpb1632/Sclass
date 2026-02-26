(function() {
  const POPUP_HIDE_KEY = "sclass_popup_hide_until";

  function getTomorrowMidnight() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();
  }

  function isPopupHidden() {
    try {
      const value = Number(localStorage.getItem(POPUP_HIDE_KEY) || 0);
      return value > Date.now();
    } catch (_) {
      return false;
    }
  }

  function hidePopup($overlay) {
    $overlay.addClass("is-hidden");
  }

  $(function() {
    $(".properties-N4[id='pGmlW6KDwI']").each(function() {
      const $block = $(this);
      const $overlay = $block.find(".popup-overlay");
      const $close = $block.find(".popup-close-btn");
      const $dayoff = $block.find(".popup-dayoff-check");

      $block.find(".popup-card img").attr("draggable", "false");

      if (isPopupHidden()) {
        hidePopup($overlay);
        return;
      }

      $close.on("click", function() {
        if ($dayoff.is(":checked")) {
          try {
            localStorage.setItem(POPUP_HIDE_KEY, String(getTomorrowMidnight()));
          } catch (_) {}
        }
        hidePopup($overlay);
      });
    });
  });
})();
