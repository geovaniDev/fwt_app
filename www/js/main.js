function openEventHistory(event) {
  sessionStorage.setItem("@App:event_history_type", event);
}

$(document).ready(() => {
  $(".sidenav").sidenav();
  $(".tabs").tabs();
  $(".fixed-action-btn").floatingActionButton();
});
