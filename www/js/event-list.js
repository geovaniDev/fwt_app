const API_DATA = [
  { eventDate: "Mai 18, 2021", eventTime: "11:35", qtd: 23, unity: "g" },
  { eventDate: "Mai 18, 2021", eventTime: "12:00", qtd: 23, unity: "g" },
  { eventDate: "Mai 18, 2021", eventTime: "14:00", qtd: 23, unity: "g" },
];

function goToEditSection(eventIndex) {
  const eventHistoryType = sessionStorage.getItem("@App:event_history_type");

  if (
    eventHistoryType !== "peso" &&
    eventHistoryType !== "menstruação" &&
    eventHistoryType !== "anotações" &&
    eventHistoryType !== "refluxos" &&
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

  $("#event_time").val(API_DATA[eventIndex].eventTime);
  $("#event_date").val(API_DATA[eventIndex].eventDate);
  $("#list_section").hide();
  $("#open_chart_button").hide();
  $("#edit_section").show();
  $("#back_button").show();
}

$(document).ready(() => {
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
  }

  function populateTable(data) {
    return data.map((item, index) => {
      return `
        <li key="${index}" class="collection-item avatar waves-effect waves-darken-1 fullWidth" onclick="goToEditSection(${index})">
          <i class="material-icons circle green">local_dining</i>
          <span class="title">${item.eventDate}</span>
          <p>${item.qtd}${item.unity} consumidos. <br>
            ${item.eventTime}
          </p>
          <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
        </li>
      `;
    });
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

  for (let index = 6; index > 0; index -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - index, 1);
    lastMonth.push(monthNames[date.getMonth()]);
  }

  if (
    eventHistoryType !== "peso" &&
    eventHistoryType !== "menstruação" &&
    eventHistoryType !== "anotações" &&
    eventHistoryType !== "refluxos" &&
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
  }

  $(".collection").html(populateTable(API_DATA));

  $("#open_chart_button").click(() => {
    if ($("#chart_section").is(":hidden")) {
      $("#list_section").hide();
      $("#edit_section").hide();
      $("#chart_section").show();
      $("#open_chart_button").text("Consumo diário");
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

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: lastMonth,
      datasets: [
        {
          label: "quantidate consumida",
          data: [12, 19, 3, 5, 2, 3, 9],
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
