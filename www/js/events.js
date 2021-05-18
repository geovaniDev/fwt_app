$(document).ready(function () {
  const currentDate = new Date(Date.now());

  $("select").formSelect();
  $(".datepicker").datepicker({
    setDefaultDate: true,
    defaultDate: currentDate,
    maxDate: currentDate,
  });
  $(".timepicker").timepicker({
    twelveHour: false,
  });

  $("[type='text']").focusin(() => $(".buttons-wrapper").hide());
  $("[type='text']").focusout(() => $(".buttons-wrapper").show());
});
