$(document).ready(() => {
  $("#disease_container").hide();

  $("#disease").change(function () {
    if (this.checked) {
      $("#disease_container").show();
    } else {
      $("#disease_container").hide();
    }
  });
});
