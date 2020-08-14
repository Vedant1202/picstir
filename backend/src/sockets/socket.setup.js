const socketIO = require('socket.io');
const config = require('../config/config');
const logger = require('../config/logger');

const io = socketIO.listen(config.socket_port).sockets;
logger.info(`Listening to socket connections on port: ${config.socket_port}`);

const socketSetup = () => {
  io.on('connection', (socket) => {
    const { chatID } = socket.handshake.query;
    socket.join(chatID);

    socket.on('disconnect', () => {
      socket.leave(chatID);
    });

    socket.on('send_message', (message) => {
      const { receiverChatID, senderChatID } = message;
      socket.to(receiverChatID).emit('receive_message', {
        ...message,
      });
      socket.to(senderChatID).emit('sent_message', {
        ...message,
      });
    });
  });
};

module.exports = socketSetup;
