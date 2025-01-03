let io;
const connectedUsers = {};

const emitNotification = (userId, type, message) => {
  if (io) {
    const socketId = connectedUsers[userId];
    if (socketId) {
      io.to(socketId).emit('notification', { userId, type, message });
    }
  }
};

module.exports = { emitNotification };
