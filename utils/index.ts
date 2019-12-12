import { TaskObject } from 'types';

export const getWorkingDaysCount = (startDate: Date, endDate: Date) => {
  let count = 0;
  const currentDate = startDate;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    if (!(dayOfWeek === 6 || dayOfWeek === 0)) count++;

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
};

export const sumAllHours = (data: TaskObject[]) => {
  const hours = data.map((item) => {
    const startTime = new Date(item.start);
    const stopTime = item.stop ? new Date(item.stop) : new Date();

    return ((stopTime.getTime() - startTime.getTime()) / 1000) / 3600;
  });

  return hours.reduce((prevValue: number, currentValue: number) => prevValue + currentValue, 0);
};

export const roundHours = (value: number) => Math.floor(value * 100) / 100;
