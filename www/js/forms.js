$(document).ready(() => {
  $("#login_form").on("submit", (e) => {
    const addressField = $("#address");
    const passwordField = $("#password");
    const userNameField = $("#user_name");

    const state = {
      userName: userNameField.val(),
      address: {
        type: addressField.val().includes("@") ? "email" : "phone",
        value: addressField.val(),
      },
    };

    e.preventDefault();
    localStorage.setItem("@App:auth_data", JSON.stringify(state));
    localStorage.setItem("@App:already_opened", true);
    window.location.replace("./main.html");
  });

  $("#register_form").on("submit", (e) => {
    const addressField = $("#address");
    const passwordField = $("#password");
    const userNameField = $("#user_name");

    const state = {
      userName: userNameField.val(),
      address: {
        type: addressField.val().includes("@") ? "email" : "phone",
        value: addressField.val(),
      },
    };

    e.preventDefault();
    localStorage.setItem("@App:auth_data", JSON.stringify(state));
    localStorage.setItem("@App:already_opened", true);
    window.location.replace("./main.html");
  });
});
