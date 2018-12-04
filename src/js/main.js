const Client = require('./Client');
const socket = io.connect('http://localhost:1234')
const client = new Client
const app = require('./socket')(socket, client)
//const events = require('./events');
//const set = events(app, client)

const nameForms = require('./nameHandler')();








app.init()
//set.init();
