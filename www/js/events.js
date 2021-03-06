$(document).ready(() => {
  const currentDate = new Date(Date.now());
  let eventData = {};

  $("#eating_section").hide();

  $("select").formSelect();
  $(".datepicker").datepicker({
    setDefaultDate: true,
    defaultDate: currentDate,
    maxDate: currentDate,
    i18n: {
      cancel: "Cancelar",
      clear: "Limpar",
      done: "Ok",
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthsShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dec",
      ],
      weekdays: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      weekdaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      weekdaysAbbrev: ["D", "S", "T", "Q", "Q", "S", "S"],
    },
  });
  $(".timepicker").timepicker({
    i18n: {
      cancel: "Cancelar",
      clear: "Limpar",
      done: "Ok",
    },
    twelveHour: false,
  });

  $("[type='text']").focusin(() => $(".buttons-wrapper").hide());
  $("[type='text']").focusout(() => $(".buttons-wrapper").show());

  $("[type='number']").focusin(() => $(".buttons-wrapper").hide());
  $("[type='number']").focusout(() => $(".buttons-wrapper").show());

  let currentSection = "type_section";
  $("#action_button").click(() => {
    if (currentSection === "type_section") {
      const eventType = $("#event_type").val();
      const eventTime = $("#event_time").val();
      const eventDate = $("#event_date").val();

      if (!eventType || !eventTime || !eventDate)
        return M.toast({
          html: "Preencha todos os campos!",
          classes: "red darken-1",
        });

      eventData = {
        eventType,
        eventTime,
        eventDate,
      };

      $("#type_section").hide();

      switch (eventType) {
        case "eating":
          currentSection = "eating_section";

          $("#action_button")
            .removeClass(["cyan", "lighten-2"])
            .addClass(["purple", "accent-4"]);
          $("#action_button").text("Adicionar");
          $("#eating_section").show();
          $("#medication_row").hide();
          $("#item_row").show();
          return $("#eating_row").show();

        case "medication":
          currentSection = "eating_section";

          $("#action_button")
            .removeClass(["cyan", "lighten-2"])
            .addClass(["purple", "accent-4"]);
          $("#action_button").text("Adicionar");
          $("#eating_section").show();
          $("#eating_row").hide();
          $("#item_row").hide();
          return $("#medication_row").show();

        default:
          break;
      }
    }

    if (currentSection === "eating_section") {
      const eventItems = JSON.parse(localStorage.getItem("@App:event_items"));
      const itemConsumed = $("#item_consumed").val();
      const qtd = $("#item_qtd").val();
      const medicationName = $("#medication_name").val();

      if (
        (eventData.eventType === "eating" && !itemConsumed) ||
        (eventData.eventType === "eating" && !qtd) ||
        (eventData.eventType === "medication" && !medicationName)
      )
        return M.toast({
          html: "Preencha todos os campos!",
          classes: "red darken-1",
        });

      eventData = {
        ...eventData,
        itemConsumed,
        qtd,
        medicationName,
      };

      M.toast({
        html: "Salvando informações...",
        displayLength: "infinite",
      });

      localStorage.setItem(
        "@App:event_items",
        JSON.stringify([...eventItems, eventData])
      );
      localStorage.setItem("@App:star", true);

      setTimeout(() => M.Toast.dismissAll(), 5000);
      setTimeout(
        () =>
          M.toast({
            html: "Evento salvo com sucesso!",
            classes: "cyan lighten-2",
          }),
        5500
      );
      setTimeout(() => {
        window.location.replace("./main.html");
      }, 6500);
    }
  });
  $("#back_button").click(() => {
    if (currentSection === "type_section") {
      return window.location.replace("./main.html");
    }

    currentSection = "type_section";
    $("#type_section").show();

    $("#action_button")
      .removeClass(["purple", "accent-4"])
      .addClass(["cyan", "lighten-2"]);
    $("#action_button").text("Próximo");
    $("#eating_section").hide();
  });
});
