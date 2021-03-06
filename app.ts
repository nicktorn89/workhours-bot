import { TaskObject } from 'types';
import { getWorkingDaysCount, roundHours, sumAllHours } from './utils';

require('dotenv/config');

const TogglClient = require('toggl-api');
const toggle = new TogglClient({ apiToken: process.env.TOGGL_TOKEN });

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });

const goalHours = 168;

const date = new Date();
const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

const startDate = new Date(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
const endDate = new Date(`${lastDayOfMonth.getMonth() + 1}/${lastDayOfMonth.getDate()}/${lastDayOfMonth.getFullYear()}`);

toggle.getTimeEntries(firstDayOfMonth, lastDayOfMonth, (error: any, allDaysData: TaskObject[]) => {
  if (error) return;

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(23, 59, 59, 999);

  toggle.getTimeEntries(dayStart, dayEnd, (error: any, todayData: TaskObject[]) => {
    if (error) return;

    const remainingDays = getWorkingDaysCount(startDate, endDate);

    const currentDayHours = roundHours(sumAllHours(todayData));

    const currentHoursSum = sumAllHours(allDaysData);

    const remainingHours = roundHours(goalHours - currentHoursSum);

    const averageHoursPerDay = roundHours(remainingHours / remainingDays);

    bot.sendMessage(Number(process.env.CHAT_ID), `
      Спасибо за продуктивный рабочий день. Вы отработали ${currentDayHours} час(а/ов).
      До цели (${goalHours} часов) осталось - ${remainingHours} час(а/ов). Примерно ${averageHoursPerDay} в день.
    `);
  });
});
