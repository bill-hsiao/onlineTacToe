const socket = io.connect('http://localhost:1234');
const app = require('./socket.js')(socket);



app.init();



document.getElementById('game_area').addEventListener('click', getValue)

function getValue(evt) {
  let val = evt.target.id;
  console.log(val);
  app.sendMove(val);
}


(function name() {
  function output(string) {
    const display = {
        line: document.getElementById('name_output_line'),
        value: ""
    }
    display.value = string;
    display.line.textContent = display.value;
    app.sendName(string);
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
