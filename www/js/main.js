function openEventHistory(event) {
  sessionStorage.setItem("@App:event_history_type", event);
}

function openCloseSessionModal() {
  setTimeout(() => {
    $(".sidenav").sidenav("close");
    $("#modal1").modal("open");
  }, 300);
}

$(document).ready(() => {
  const currentUser = JSON.parse(localStorage.getItem("@App:current_user"));
  const star = localStorage.getItem("@App:star");
  const emailField = $("#email_field");
  const femaleOption = $("#female_option");

  currentUser.genre === "male" ? femaleOption.hide() : femaleOption.show();

  $(".sidenav").sidenav();
  $(".tabs").tabs();
  $(".fixed-action-btn").floatingActionButton();
  $(".modal").modal();

  if (star) {
    $("#modal2").modal("open");
  }

  emailField.text(currentUser.email);
});
