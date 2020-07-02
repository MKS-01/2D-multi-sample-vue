const express = require('express');
const http = require('http').Server(express);
const socketio = require('socket.io')(http);

var position = {
  x: 200,
  y: 200,
};

socketio.on('connection', (socket) => {
  socket.emit('position', position);

  socket.on('move', (data) => {
    switch (data) {
      case 'left':
        position.x -= 5;
        socketio.emit('position', position);
        break;
      case 'right':
        position.x += 5;
        socketio.emit('position', position);
        break;
      case 'up':
        position.y -= 5;
        socketio.emit('position', position);
        break;
      case 'down':
        position.y += 5;
        socketio.emit('position', position);
        break;
    }
  });
});

http.listen(3000, () => {
  console.log('🚀 listening  at 3000:');
});
