import TelegramBot from 'node-telegram-bot-api';
import { getUserByTelegramToken, updateUserById, getUsersByChatID } from '../Mongoose/usersDB.js';
import { getAccsByUserId } from '../Mongoose/accountsDB.js';
import { getLogger } from '../../config/logger.js';

const logger = getLogger();

const runTelegramBot = () => {
  logger.info('Telegram bot is running');
  const token = process.env.TELEGRAM_BOT_TOKEN;

  const bot = new TelegramBot(token, { polling: true });
  bot.onText(/\/start/, (msg) => {
    const chatID = msg.chat.id;

    bot.sendMessage(chatID, 'Hello! Send the token you received in the Telegram connection window.');
  });

  bot.on('message', async (msg) => {
    const { text } = msg;
    if (!text.startsWith('GhbDtN')) return;
    const telegramToken = text;
    const { id: chatID, username } = msg.chat;
    const user = await getUserByTelegramToken(telegramToken)
      .catch((error) => {
        logger.error(error);
      });
    if (!user) {
      bot.sendMessage(chatID, 'User not found');
      return;
    }
    const { chat_ids: chatIDs } = user.telegram;
    const isChatActive = chatIDs
      .some(({ chat_id: currChatID }) => currChatID === `${chatID}`);
    if (isChatActive) {
      bot.sendMessage(chatID, `Chat ${chatID} is already connected to user ${user._id}`);
      return;
    }

    const newChatIDs = [
      ...chatIDs,
      {
        chat_id: chatID,
        username,
      },
    ];

    updateUserById(user._id, {
      telegram: {
        user_token: telegramToken,
        chat_ids: newChatIDs,
      },
    })
      .then(() => {
        bot.sendMessage(chatID, 'Token processed successfully! Thank you!');
      })
      .catch(() => {
        bot.sendMessage(chatID, 'An error occurred! Please try again.');
      });
  });

  bot.onText(/\/accounts/, async (msg) => {
    const chatID = msg.chat.id;

    const users = await getUsersByChatID(chatID)
      .catch((error) => {
        logger.error(error);
      });
    if (users.length === 0) {
      bot.sendMessage(chatID, 'No users found');
      return;
    }

    const accountPromises = users.map((user) => getAccsByUserId(user._id)
      .catch((error) => {
        logger.error(error);
        return [];
      }));

    const accounts = await Promise.all(accountPromises);

    bot.sendMessage(chatID, JSON.stringify(accounts));
  });
};

export default runTelegramBot;
