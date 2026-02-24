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