$(document).ready(() => {
  localStorage.setItem("@App:registration_unfinished", true);

  $("#disease_container").hide();
  $("#pre_disease_container").hide();
  $("#diet_container").hide();

  for (let index = 2; index <= 5; index++) {
    $(`#section${index}`).hide();
  }

  $("#disease").change(function () {
    if (this.checked) {
      $("#disease_container").show();
    } else {
      $("#disease_container").hide();
    }
  });
  $("#no_disease").change(() => $("#disease_container").hide());

  $("#pre_disease").change(function () {
    if (this.checked) {
      $("#pre_disease_container").show();
    } else {
      $("#pre_disease_container").hide();
    }
  });
  $("#no_pre_disease").change(() => $("#pre_disease_container").hide());

  $("#has_diet").change(function () {
    if (this.checked) {
      $("#diet_container").show();
    } else {
      $("#diet_container").hide();
    }
  });
  $("#has_no_diet").change(() => $("#diet_container").hide());

  $("[type='text']").focusin(() => $(".buttons-wrapper").hide());
  $("[type='text']").focusout(() => $(".buttons-wrapper").show());

  let currentSection = 1;
  $("#action_button").click(() => {
    for (let index = currentSection; index <= 5; index++) {
      if (index === 5) {
        $("#action_button")
          .removeClass(["cyan", "lighten-2"])
          .addClass(["red", "darken-1"])
          .text("Finalizar");
      }
      if ($(`#section${index + 1}`).is(":hidden")) {
        $(`#section${index}`).hide();
        $(`#section${index + 1}`).show();
        currentSection++;
        break;
      }
    }
  });
  $("#back_button").click(() => {
    for (let index = currentSection; index >= 1; index--) {
      if (index === 1) {
        window.location.replace("../index.html");
      }
      if ($(`#section${index - 1}`).is(":hidden")) {
        $(`#section${index}`).hide();
        $(`#section${index - 1}`).show();
        currentSection--;
        break;
      }
    }
  });
});
