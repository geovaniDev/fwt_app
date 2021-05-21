function goToEditSection(eventIndex) {
  const API_DATA = {
    consume: [...JSON.parse(localStorage.getItem("@App:event_items"))],
    weight: [{ eventDate: "Mai 18, 2021", eventTime: "11:35", qtd: 45 }],
  };
  const eventHistoryType = sessionStorage.getItem("@App:event_history_type");

  if (
    eventHistoryType !== "peso" &&
    eventHistoryType !== "menstruação" &&
    eventHistoryType !== "anotações" &&
    eventHistoryType !== "refluxo" &&
    eventHistoryType !== "horas de sono"
  ) {
    $("#event_type").val(`Consumo de ${eventHistoryType}`);
  }

  if (eventHistoryType === "peso") {
    $("#event_type").val(`Alteração de ${eventHistoryType}`);
  } else {
    $("#event_type").val(
      eventHistoryType.replace(/^\w/, (char) => char.toUpperCase())
    );
  }

  if (
    eventHistoryType !== "peso" &&
    eventHistoryType !== "menstruação" &&
    eventHistoryType !== "anotações" &&
    eventHistoryType !== "refluxo" &&
    eventHistoryType !== "horas de sono" &&
    eventHistoryType !== "medicações"
  ) {
    $("#event_time").val(API_DATA.consume[eventIndex].eventTime);
    $("#event_date").val(API_DATA.consume[eventIndex].eventDate);
    $("#medication_row").hide();
    $("#qtd_row").show();
    $("#item_qtd").val(API_DATA.consume[eventIndex].qtd);
  } else if (eventHistoryType === "peso") {
    $("#event_time").val(API_DATA.weight[eventIndex].eventTime);
    $("#event_date").val(API_DATA.weight[eventIndex].eventDate);
  } else if (eventHistoryType === "medicações") {
    $("#qtd_row").hide();
    $("#medication_row").show();
    $("#medication_row").val(API_DATA.consume[eventIndex].medicationName);
  } else {
    $("#event_time").val(API_DATA.consume[eventIndex].eventTime);
    $("#event_date").val(API_DATA.consume[eventIndex].eventDate);
  }
  $("#list_section").hide();
  $("#open_chart_button").hide();
  $("#edit_section").show();
  $("#back_button").show();
}

$(document).ready(() => {
  const API_DATA = {
    consume: [...JSON.parse(localStorage.getItem("@App:event_items"))],
    weight: [{ eventDate: "Mai 18, 2021", eventTime: "11:35", qtd: 45 }],
  };
  const eventHistoryType = sessionStorage.getItem("@App:event_history_type");
  const currentDate = new Date(Date.now());

  const monthNames = [
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
    "Dez",
  ];

  const today = new Date();
  const lastMonth = [];

  function enableInputs() {
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

    $("#event_time").removeAttr("readonly");
    $("#event_date").removeAttr("readonly");

    eventHistoryType === "medicações"
      ? $("#medication_name").removeAttr("readonly")
      : $("#item_qtd").removeAttr("readonly");
  }

  function populateTable() {
    const filteredData = API_DATA.consume.filter(
      (data) => data.itemConsumed === eventHistoryType
    );
    const filteredMedicationData = API_DATA.consume.filter(
      (data) => data.eventType === "medication"
    );
    if (
      eventHistoryType !== "peso" &&
      eventHistoryType !== "menstruação" &&
      eventHistoryType !== "anotações" &&
      eventHistoryType !== "refluxo" &&
      eventHistoryType !== "horas de sono" &&
      eventHistoryType !== "medicamentos"
    )
      return filteredData.map(
        (item, index) => `
        <li key="${index}" class="collection-item avatar waves-effect waves-darken-1 fullWidth" onclick="goToEditSection(${index})">
          <i class="material-icons circle green">local_dining</i>
          <span class="title">${item.eventDate}</span>
          <p>${item.eventTime} <br>
          <span id="consume_text">${item.qtd}${
          eventHistoryType === "água" ? "ml" : "g"
        } consumidos.</span>
          </p>
          <a href="#!" class="secondary-content"><i class="material-icons">check_box</i></a>
        </li>
      `
      );
    if (eventHistoryType === "peso")
      return API_DATA.weight.map(
        (item, index) => `
        <li key="${index}" class="collection-item avatar waves-effect waves-darken-1 fullWidth" onclick="goToEditSection(${index})">
          <i class="material-icons circle green">local_dining</i>
          <span class="title">${item.eventDate}</span>
          <p>${item.eventTime} <br>
          <span id="consume_text">${item.qtd}kg.</span>
          </p>
          <a href="#!" class="secondary-content"><i class="material-icons">check_box</i></a>
        </li>
      `
      );
    if (eventHistoryType === "medicamentos")
      return filteredMedicationData.map(
        (item, index) => `
        <li key="${index}" class="collection-item avatar waves-effect waves-darken-1 fullWidth" onclick="goToEditSection(${index})">
          <i class="material-icons circle green">local_dining</i>
          <span class="title">${item.eventDate}</span>
          <p>${item.eventTime} <br>
          <span id="consume_text">${item.medicationName || ""}</span>
          </p>
          <a href="#!" class="secondary-content"><i class="material-icons">check_box</i></a>
        </li>
        `
      );
    return filteredMedicationData.map(
      (item, index) => `
        <li key="${index}" class="collection-item avatar waves-effect waves-darken-1 fullWidth" onclick="goToEditSection(${index})">
          <i class="material-icons circle green">local_dining</i>
          <span class="title">${item.eventDate}</span>
          <p>${item.eventTime}</p>
          <a href="#!" class="secondary-content"><i class="material-icons">check_box</i></a>
        </li>
        `
    );
  }

  $("#edit_section").hide();
  $("#chart_section").hide();

  $("#save_buttons_wrapper").hide();

  $("#edit_button").click(() => {
    $("#open_chart_button").hide();
    $("#edit_button").hide();
    $("#back_button").hide();
    $("#save_buttons_wrapper").show();
    enableInputs();
    $("#event_time").focus();
  });

  $("#cancel_edit_button").click(() => {
    $("#edit_button").show();
    $("#save_buttons_wrapper").hide();
    $("#back_button").show();
  });

  $("#medication_row").hide();
  $("#qtd_row").hide();

  for (let index = 6; index > 0; index -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - index, 1);
    lastMonth.push(monthNames[date.getMonth()]);
  }

  if (
    eventHistoryType !== "peso" &&
    eventHistoryType !== "menstruação" &&
    eventHistoryType !== "anotações" &&
    eventHistoryType !== "refluxo" &&
    eventHistoryType !== "horas de sono"
  ) {
    $("#subtitle_header").text(
      eventHistoryType.replace(/^\w/, (char) => char.toUpperCase())
    );
  } else {
    $("#title_header").text(
      eventHistoryType.replace(/^\w/, (char) => char.toUpperCase())
    );
    $("#subtitle_header").hide();
    eventHistoryType === "peso"
      ? $("#open_chart_button").text("Acompanhamento mensal")
      : $("#open_chart_button").hide();
  }

  $(".collection").html(populateTable(API_DATA));

  $("#open_chart_button").click(() => {
    if ($("#chart_section").is(":hidden")) {
      $("#list_section").hide();
      $("#edit_section").hide();
      $("#chart_section").show();
      if (
        eventHistoryType !== "peso" &&
        eventHistoryType !== "menstruação" &&
        eventHistoryType !== "anotações" &&
        eventHistoryType !== "refluxo" &&
        eventHistoryType !== "horas de sono"
      ) {
        $("#chart_title").text("Consumo por mês");
        $("#chart_subtitle").show();
        $("#chart_subtitle").text(
          eventHistoryType.replace(/^\w/, (char) => char.toUpperCase())
        );
      } else if (eventHistoryType === "peso") {
        $("#chart_title").text("Alterações de peso");
        $("#chart_subtitle").text("Resultados mensais");
      }
      $("#open_chart_button").text(
        eventHistoryType === "peso" ? "Acompanhamento diário" : "Consumo diário"
      );
    } else {
      $("#list_section").show();
      $("#chart_section").hide();
      $("#open_chart_button").text("Consumo mensal");
    }
  });

  $("#back_button").click(() => {
    $("#list_section").show();
    $("#edit_section").hide();
    $("#open_chart_button").show();
    $("#back_button").hide();
  });

  $("#edit_form").on("submit", (event) => {
    event.preventDefault();
    window.location.replace("./main.html");
  });

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: lastMonth,
      datasets: [
        {
          label:
            eventHistoryType === "medicamentos"
              ? "medicamentos tomados"
              : "quantidate consumida em gramas",
          data:
            eventHistoryType === "medicamentos"
              ? [3, 5, 2, 3, 9, 12, 19]
              : [30, 50, 20, 30, 90, 120, 190],
          backgroundColor: ["rgb(153, 102, 255)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
