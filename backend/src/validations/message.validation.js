const Joi = require('@hapi/joi');

const createMessage = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    senderChatID: Joi.string().required(),
    receiverChatID: Joi.string().required(),
  }),
};

const getMessages = {
  query: Joi.object().keys({
    text: Joi.string(),
    from: Joi.string(),
  }),
};

const getMessagesByUserId = {
  query: Joi.object().keys({
    userId: Joi.string().required(),
    toId: Joi.string().required(),
  }),
};

module.exports = {
  createMessage,
  getMessages,
  getMessagesByUserId,
};
