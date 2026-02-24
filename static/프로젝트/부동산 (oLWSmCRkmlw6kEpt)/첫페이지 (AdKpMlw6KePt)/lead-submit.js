(function() {
  "use strict";

  // TODO: 諛고룷??Google Apps Script Web App URL濡?援먯껜?섏꽭??
  // ?? https://script.google.com/macros/s/AKfycb.../exec
  var GAS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyJZ8DGxmMrI1ynZsbYQbaqM7qGp4De5-fpaO6UU7dj4n8_ONkoo8J-4dKTM7VIrw4NnA/exec";

  var SUCCESS_MESSAGE = "?곷떞?좎껌???묒닔?섏뿀?듬땲?? 怨??곕씫?쒕━寃좎뒿?덈떎.";
  var FAILURE_MESSAGE = "?꾩넚 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎. ?좎떆 ???ㅼ떆 ?쒕룄??二쇱꽭??";
  var URL_REQUIRED_MESSAGE = "Google Apps Script URL??癒쇱? ?ㅼ젙??二쇱꽭??";

  var NAME_PATTERN = /^[A-Za-z\uAC00-\uD7A3]+$/;
  var PHONE_PATTERN = /^010\d{8}$/;

  function sanitizeName(value) {
    return String(value || "").replace(/[^A-Za-z\uAC00-\uD7A3]/g, "").trim();
  }

  function sanitizePhone(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 11);
  }

  function setButtonLoading($button, loading, defaultHtml) {
    if (!$button || !$button.length) return;
    $button.prop("disabled", loading);
    if (loading) {
      $button.data("default-html", defaultHtml || $button.html());
      $button.html("?꾩넚以?..");
    } else {
      $button.html(defaultHtml || $button.data("default-html") || $button.html());
    }
  }

  function validateCommon(payload) {
    if (!payload.name) return { ok: false, message: "?대쫫???낅젰??二쇱꽭??", field: "name" };
    if (!NAME_PATTERN.test(payload.name)) return { ok: false, message: "?대쫫? ?쒓? ?먮뒗 ?곸뼱留??낅젰??二쇱꽭??", field: "name" };
    if (!PHONE_PATTERN.test(payload.phone)) return { ok: false, message: "?대???踰덊샇??010?쇰줈 ?쒖옉?섎뒗 11?먮━ ?レ옄留??낅젰??二쇱꽭??", field: "phone" };
    if (!payload.agree) return { ok: false, message: "媛쒖씤?뺣낫 ?섏쭛/?댁슜?숈쓽??泥댄겕??二쇱꽭??", field: "agree" };
    return { ok: true };
  }

  function validateConsultation(payload) {
    var base = validateCommon(payload);
    if (!base.ok) return base;
    if (!payload.purpose || !payload.purpose.length) {
      return { ok: false, message: "紐⑹쟻? 理쒖냼 ?섎굹 ?댁긽 ?좏깮??二쇱꽭??", field: "purpose" };
    }
    return { ok: true };
  }

  async function sendToGAS(payload) {
    if (!GAS_WEBHOOK_URL) {
      throw new Error(URL_REQUIRED_MESSAGE);
    }

    var params = new URLSearchParams();
    params.set("payload", JSON.stringify(payload));

    // Apps Script CORS ?쒖빟 ?뚰뵾瑜??꾪빐 no-cors ?ъ슜.
    await fetch(GAS_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      body: params
    });
  }

  function focusByField(ctx, field) {
    if (!ctx) return;
    if (field === "name" && ctx.$name && ctx.$name.length) ctx.$name.trigger("focus");
    if (field === "phone" && ctx.$phone && ctx.$phone.length) ctx.$phone.trigger("focus");
    if (field === "agree" && ctx.$agree && ctx.$agree.length) ctx.$agree.trigger("focus");
  }

  $(function() {
    var $consultSection = $(".properties-N9[id='vzMlw6KehW']").first();
    var $consultForm = $consultSection.find(".form-group form").first();

    if ($consultForm.length) {
      var $name = $consultForm.find("#properties-N9-inputset-a-1").first();
      var $phone = $consultForm.find("#properties-N9-inputset-a-2").first();
      var $purposeChecks = $consultForm.find(".checkset-wrap .checkset-input");
      var $region = $consultForm.find("#properties-N9-inputset-a-3").first();
      var $message = $consultForm.find("#properties-N9-textarea-a-1").first();
      var $agree = $consultForm.find("#checkset-properties-N9-b-1").first();
      var $submit = $consultForm.find("button[type='submit']").first();

      // 湲곗〈 ?몃뱾???쒓굅 ???꾩옱 濡쒖쭅?쇰줈 ?듭씪
      $consultForm.off("submit.privacyConsentGuard");
      $consultForm.off("submit.gasLead");

      $name.off("input.nameFilter").on("input.nameFilter", function(event) {
        if (event.originalEvent && event.originalEvent.isComposing) return;
        var normalized = sanitizeName($(this).val());
        if ($(this).val() !== normalized) $(this).val(normalized);
      });

      $phone.off("input.phoneFilter").on("input.phoneFilter", function() {
        var normalized = sanitizePhone($(this).val());
        if ($(this).val() !== normalized) $(this).val(normalized);
      });

      $consultForm.on("submit.gasLead", async function(event) {
        event.preventDefault();

        var payload = {
          source: "consultation",
          name: sanitizeName($name.val()),
          phone: sanitizePhone($phone.val()),
          purpose: $purposeChecks.filter(":checked").map(function() {
            return $(this).val();
          }).get(),
          region: String($region.val() || "").trim(),
          message: String($message.val() || "").trim(),
          agree: !!$agree.prop("checked")
        };

        $name.val(payload.name);
        $phone.val(payload.phone);

        var check = validateConsultation(payload);
        if (!check.ok) {
          alert(check.message);
          focusByField({ $name: $name, $phone: $phone, $agree: $agree }, check.field);
          return;
        }

        var defaultHtml = $submit.html();
        setButtonLoading($submit, true, defaultHtml);
        try {
          await sendToGAS(payload);
          alert(SUCCESS_MESSAGE);
          $consultForm[0].reset();
        } catch (error) {
          alert(error && error.message ? error.message : FAILURE_MESSAGE);
        } finally {
          setButtonLoading($submit, false, defaultHtml);
        }
      });
    }

    var $quickBar = $(".fixed-consult-bar.is-split").first();
    if ($quickBar.length) {
      var $qName = $quickBar.find(".consult-form input[type='text']").first();
      var $qPhone = $quickBar.find(".consult-form input[type='tel']").first();
      var $qAgree = $quickBar.find(".consult-privacy-check").first();
      var $qSubmit = $quickBar.find(".consult-submit").first();

      // 湲곗〈 ?몃뱾???쒓굅 ???꾩옱 濡쒖쭅?쇰줈 ?듭씪
      $qSubmit.off("click.privacyConsentGuard");
      $qSubmit.off("click.gasLead");

      $qName.off("input.nameFilter").on("input.nameFilter", function(event) {
        if (event.originalEvent && event.originalEvent.isComposing) return;
        var normalized = sanitizeName($(this).val());
        if ($(this).val() !== normalized) $(this).val(normalized);
      });

      $qPhone.off("input.phoneFilter").on("input.phoneFilter", function() {
        var normalized = sanitizePhone($(this).val());
        if ($(this).val() !== normalized) $(this).val(normalized);
      });

      $qSubmit.on("click.gasLead", async function(event) {
        event.preventDefault();

        var payload = {
          source: "quick_bar",
          name: sanitizeName($qName.val()),
          phone: sanitizePhone($qPhone.val()),
          agree: !!$qAgree.prop("checked")
        };

        $qName.val(payload.name);
        $qPhone.val(payload.phone);

        var check = validateCommon(payload);
        if (!check.ok) {
          alert(check.message);
          focusByField({ $name: $qName, $phone: $qPhone, $agree: $qAgree }, check.field);
          return;
        }

        var defaultHtml = $qSubmit.html();
        setButtonLoading($qSubmit, true, defaultHtml);
        try {
          await sendToGAS(payload);
          alert(SUCCESS_MESSAGE);
          $qName.val("");
          $qPhone.val("");
          $qAgree.prop("checked", false);
        } catch (error) {
          alert(error && error.message ? error.message : FAILURE_MESSAGE);
        } finally {
          setButtonLoading($qSubmit, false, defaultHtml);
        }
      });
    }
  });
})();

