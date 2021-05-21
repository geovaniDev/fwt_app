$(document).ready(() => {
  const isAlreadyOpened = localStorage.getItem("@App:already_opened");
  const isUnfinishedRegistration = localStorage.getItem(
    "@App:registration_unfinished"
  );
  const currentUser = localStorage.getItem("@App:current_user");

  // window.location.replace("pages/main.html");
  if (isAlreadyOpened) {
    if (isUnfinishedRegistration)
      return window.location.replace("pages/signup.html");

    window.location.replace(
      currentUser ? "pages/main.html" : "pages/login.html"
    );
  } else {
    localStorage.setItem(
      "@App:users",
      JSON.stringify([{ email: "test", password: "js71h982JKH548jivQ" }])
    );
    window.location.replace("pages/welcome.html");
  }
});
