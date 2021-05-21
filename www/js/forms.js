$(document).ready(() => {
  $("#login_form").on("submit", (e) => {
    const addressField = $("#address");
    const passwordField = $("#password");

    const users = JSON.parse(localStorage.getItem("@App:users"));

    const state = {
      address: {
        type: addressField.val().includes("@") ? "email" : "phone",
        value: addressField.val(),
      },
      password: passwordField.val(),
    };

    console.log(Object.values(state));

    const validUser = users.find(
      (user) =>
        (user.email === state.address.value &&
          user.password === state.password) ||
        (user.phone === state.address.value && user.password === state.password)
    );

    e.preventDefault();

    if (validUser) {
      localStorage.setItem("@App:auth_data", JSON.stringify(state));
      localStorage.setItem("@App:already_opened", true);
      localStorage.setItem("@App:current_user", JSON.stringify(validUser));
      localStorage.removeItem("@App:registration_unfinished");
      localStorage.setItem(
        "@App:event_items",
        JSON.stringify([
          {
            eventType: "eating",
            eventDate: "Mai 18, 2021",
            eventTime: "11:35",
            qtd: 23,
            itemConsumed: "carboidratos",
          },
          {
            eventType: "eating",
            eventDate: "Mai 18, 2021",
            eventTime: "11:35",
            qtd: 23,
            itemConsumed: "proteínas",
          },
          {
            eventType: "eating",
            eventDate: "Mai 18, 2021",
            eventTime: "11:35",
            qtd: 23,
            itemConsumed: "vitaminas",
          },
          {
            eventType: "eating",
            eventDate: "Mai 18, 2021",
            eventTime: "11:35",
            qtd: 23,
            itemConsumed: "água",
          },
          {
            eventType: "medication",
            eventDate: "Mai 18, 2021",
            eventTime: "11:35",
            qtd: 23,
            medicationName: "Dipirona",
          },
        ])
      );
      window.location.replace("./main.html");
    } else {
      M.toast({
        html: "Usuário inválido!",
        classes: "red darken-1",
      });
    }
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
