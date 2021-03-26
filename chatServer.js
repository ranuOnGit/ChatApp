const express = require('express');
const path = require('path');
const app = express();
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(path.join(__dirname, 'chatApplication')));

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
