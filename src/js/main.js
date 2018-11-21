var socket = io.connect('http://localhost:4000');
var app = require('./socket.js')(socket);
app.init(socket);






(function form() {

  const form = {
    root: document.getElementById('name_form'),
    field: document.getElementById('name_field'),
    submit: document.getElementById('name_submit'),
    value: ""
  }


  form.field.addEventListener('keydown', function(evt) {
    form.value = evt.target.value;
    form.field.value = evt.target.value;
  });

  form.submit.addEventListener('click', function() {
    form.root.classList.add('hidden')
    console.log(form.root);

    //form.value = evt.target.value;
  });

  return form.value;
})();
