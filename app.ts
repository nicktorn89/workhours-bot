import { usersDAOSingletone } from './usersDAO';

require('dotenv/config');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const HARDCODED_CHAT_ID = Number(process.env.CHAT_ID);

bot.on('message', (msg: any) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message

  console.log('chatId', chatId);

  usersDAOSingletone.createUser({ chatId });

  bot.sendMessage(chatId, 'Received your message');
});
