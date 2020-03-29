// JS Goes here - ES6 supported

import "./css/main.css";

import Snackbar from "./snackbar";

document.addEventListener("DOMContentLoaded", () => {
  const apiEndpoint = process.env.NODE_ENV === "production" ? "https://moon.aerokube.com/license" : "http://localhost:8080/license";
  const reset = function() {
    grecaptcha.reset();
  };
  const notify = function(color, message) {
    Snackbar.show({
      backgroundColor: color,
      pos: "top-center",
      showAction: false,
      duration: 7000,
      text: message
    });
  };
  const success = function(message) {
    notify("#43a047", message);
  };
  const failure = function(message) {
    notify("#d32f2f", message);
  };
  window.onSubmit = function() {
    $.ajax({
      url: apiEndpoint,
      data: $("form#license-form").serialize(),
      success: function() {
        success("Пробный лицензионный ключ был отправлен на указанный адрес электронной почты");
        reset();
      },
      error: function(xhr) {
        failure(`Не удалось отправить пробный лицензионный ключ: ${xhr.responseText}`);
        reset();
      }
    });
  };
});
