module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    socket.on('join-org', (orgSlug) => {
      socket.join(`org-${orgSlug}`);
      console.log(`Socket ${socket.id} joined room: org-${orgSlug}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Attach broadcast method directly to the io object
  io.emitStatusUpdate = (orgSlug, data) => {
    io.to(`org-${orgSlug}`).emit('status-update', data);
  };
};