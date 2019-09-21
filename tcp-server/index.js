// Source: https://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener
// Modifications: Lucas Baerenfaenger (@lambdarookie, lambdarookie.com)

const net = require('net');

const server = net.createServer((connectionListener) => {
  console.log('client connected');
  
  connectionListener.write('hello\r\n');

  connectionListener.on('data', function(data) {
    console.log('data received: ' + data.toString());
  });

  connectionListener.on('end', () => {
    console.log('client disconnected');
  });
  
  // connectionListener.pipe(connectionListener);
  // Commented out after I read this:
  // https://stackoverflow.com/questions/20085513/using-pipe-in-node-js-net
});

server.on('error', (error) => {
  throw error;
});

server.listen(8124, () => {
  console.log('server bound');
});
