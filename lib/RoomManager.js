async function doAsyncOp () {
  var val = await asynchronousOperation();
  console.log(val);
  return val;
};


async function queue() {
  const clients = [];
  let lobby = Object.keys(io.sockets.adapter.rooms['lobby'].sockets);
  let id = (lobby.length > 2 ? lobby[0] : lobby[1])
  clients.push(io.sockets.adapter.nsp.connected[id]);
}

function
