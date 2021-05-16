$(document).ready(() => {
  $("#login_form").on("submit", (e) => {
    const addressField = $("#address");
    const userNameField = $("#user_name");
    const passwordField = $("#password");

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

  $("#register_form").on("submit", (event) => {
    const emailField = $("#email");
    const phoneField = $("#phone");
    const passwordField = $("#password");

    const state = {
      email: emailField.val(),
      phone: phoneField.val(),
      password: passwordField.val(),
    };

    event.preventDefault();
    localStorage.setItem("@App:register_data", JSON.stringify(state));
    localStorage.setItem("@App:already_opened", true);
    window.location.replace("./register.html");
  });
});
