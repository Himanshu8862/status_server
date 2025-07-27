let io = null;

function initIO(server) {
  const { Server } = require('socket.io');
  io = new Server(server, {
    cors: { origin: 'http://localhost:3000', credentials: true }
  });
  return io;
}

function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

module.exports = { initIO, getIO };