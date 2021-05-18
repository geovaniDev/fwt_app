$(document).ready(() => {
  const isAlreadyOpened = localStorage.getItem("@App:already_opened");
  const isUnfinishedRegistration = localStorage.getItem(
    "@App:registration_unfinished"
  );
  const userData = localStorage.getItem("@App:auth_data");

  window.location.replace("pages/events.html");
  // if (isAlreadyOpened) {
  //   if (isUnfinishedRegistration)
  //     return window.location.replace("pages/signup.html");

  //   window.location.replace(
  //     userData && userData.authToken ? "pages/main.html" : "pages/login.html"
  //   );
  // } else {
  //   window.location.replace("pages/welcome.html");
  // }
});
