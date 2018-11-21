var socket = io.connect('http://localhost:1234');
var app = require('./socket.js')(socket);
app.init(socket);






(function name() {
  function output(string) {
    const display = {
        line: document.getElementById('name_output_line'),
        value: ""
    }
    display.value = string;
    display.line.textContent = display.value;
    return display.value
  }

  (function () {
    const form = {
      root: document.getElementById('name_input'),
      field: document.getElementById('name_input_field'),
      submit: document.getElementById('name_input_submit'),
      value: ""
    }

    form.field.addEventListener('keydown', function(evt) {
      form.value = evt.target.value;
      form.field.value = evt.target.value;
    });

    form.submit.addEventListener('click', function() {
      form.root.classList.add('hidden')
      output(form.value)
    });

    return form.value;
  })();
})();
