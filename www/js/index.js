$(document).ready(() => {
  const isAlreadyOpened = localStorage.getItem("@App:already_opened");
  const userData = localStorage.getItem("@App:auth_data");

  StatusBar.backgroundColorByHexString("#aa00ff");

  if (isAlreadyOpened) {
    window.location.replace(
      userData && userData.authToken ? "pages/main.html" : "pages/login.html"
    );
  } else {
    window.location.replace("pages/welcome.html");
  }
});
