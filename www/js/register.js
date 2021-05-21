$(document).ready(() => {
  let state = {};
  localStorage.setItem("@App:registration_unfinished", true);

  $("#disease_container").hide();
  $("#pre_disease_container").hide();
  $("#diet_container").hide();

  $("select").formSelect();

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

  $("[type='number']").focusin(() => $(".buttons-wrapper").hide());
  $("[type='number']").focusout(() => $(".buttons-wrapper").show());

  let currentSection = 1;
  $("#action_button").click(() => {
    const genre = $("#genre").val();
    const age = $("#age").val();

    const weight = $("#weight").val();
    const height = $("#height").val();

    const disease = $("#disease");
    const noDisease = $("#no_disease");
    const diseaseName = $("#disease_name").val();

    const preDisease = $("#pre_disease");
    const noPreDisease = $("#no_pre_disease");
    const preDiseaseName = $("#pre_disease_name").val();
    const preDiseaseDate = $("#pre_disease_date").val();

    const mainDiseaseDate = $("#main_disease_date").val();
    const hasDiet = $("#has_diet");
    const hasNoDiet = $("#has_no_diet");
    const eatingTime = $("#eating_time").val();

    for (let index = currentSection; index <= 5; index++) {
      switch (index) {
        case 1:
          if (!genre || !age)
            return M.toast({
              html: "Preencha todos os campos!",
              classes: "red darken-1",
            });
          break;

        case 2:
          if (!weight || !height)
            return M.toast({
              html: "Preencha todos os campos!",
              classes: "red darken-1",
            });
          break;

        case 3:
          if (
            (!disease.is(":checked") && !noDisease.is(":checked")) ||
            (disease.is(":checked") && !diseaseName)
          )
            return M.toast({
              html: "Preencha todos os campos!",
              classes: "red darken-1",
            });
          break;

        case 4:
          if (
            (!preDisease.is(":checked") && !noPreDisease.is(":checked")) ||
            (preDisease.is(":checked") && !preDiseaseName) ||
            (preDisease.is(":checked") && !preDiseaseDate)
          )
            return M.toast({
              html: "Preencha todos os campos!",
              classes: "red darken-1",
            });
          $("#action_button")
            .removeClass(["cyan", "lighten-2"])
            .addClass(["red", "darken-1"])
            .text("Finalizar");
          break;

        case 5:
          if (
            !mainDiseaseDate ||
            (!hasDiet.is(":checked") && !hasNoDiet.is(":checked")) ||
            (hasDiet.is(":checked") && !eatingTime)
          )
            return M.toast({
              html: "Preencha todos os campos!",
              classes: "red darken-1",
            });

          const users = JSON.parse(localStorage.getItem("@App:users"));
          const registerData = JSON.parse(
            localStorage.getItem("@App:register_data")
          );

          state = {
            ...registerData,

            genre,
            age,

            weight,
            height,

            disease: disease.is(":checked"),
            diseaseName,

            preDisease: preDisease.is(":checked"),
            preDiseaseName,
            preDiseaseDate,

            mainDiseaseDate,
            hasDiet: hasDiet.is(":checked"),
            eatingTime,

            authToken: 1234,
          };

          M.toast({
            html: "Salvando informações...",
            displayLength: "infinite",
          });

          localStorage.setItem("@App:users", JSON.stringify([...users, state]));
          localStorage.setItem("@App:current_user", JSON.stringify(state));
          localStorage.removeItem("@App:register_data");
          localStorage.removeItem("@App:registration_unfinished");
          localStorage.setItem(
            "@App:event_items",
            JSON.stringify([
              {
                eventType: "eating",
                eventDate: "Mai 18, 2021",
                eventTime: "11:35",
                qtd: 23,
                itemConsumed: "carboidratos",
              },
              {
                eventType: "eating",
                eventDate: "Mai 18, 2021",
                eventTime: "11:35",
                qtd: 23,
                itemConsumed: "proteínas",
              },
              {
                eventType: "eating",
                eventDate: "Mai 18, 2021",
                eventTime: "11:35",
                qtd: 23,
                itemConsumed: "vitaminas",
              },
              {
                eventType: "eating",
                eventDate: "Mai 18, 2021",
                eventTime: "11:35",
                qtd: 23,
                itemConsumed: "água",
              },
              {
                eventType: "medication",
                eventDate: "Mai 18, 2021",
                eventTime: "11:35",
                qtd: 23,
                medicationName: "Dipirona",
              },
            ])
          );

          setTimeout(() => M.Toast.dismissAll(), 5000);
          setTimeout(
            () =>
              M.toast({
                html: "Evento salvo com sucesso!",
                classes: "cyan lighten-2",
              }),
            5500
          );
          return setTimeout(() => {
            window.location.replace("./main.html");
          }, 6500);

        default:
          break;
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
      if (index === 1) return window.location.replace("../index.html");

      $("#action_button")
        .removeClass(["red", "darken-1"])
        .addClass(["cyan", "lighten-2"])
        .text("Próximo");

      if ($(`#section${index - 1}`).is(":hidden")) {
        $(`#section${index}`).hide();
        $(`#section${index - 1}`).show();
        currentSection--;
        break;
      }
    }
  });
});
