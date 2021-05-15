$(document).ready(() => {
  $("#login-form").on("submit", (e) => {
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
    window.location.href = "pages/main.html";
  });
  // window.location.href = "pages/main.html";
});
