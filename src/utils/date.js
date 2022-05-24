import dayjs from 'dayjs';

export function getPartOfTheDay(hour) {
  if (hour < 11) return 'morning';
  if (hour === 12) return 'noon';
  if (hour < 18) return 'afternoon';
  if (hour < 21) return 'evening';

  return 'night';
}

export function convertWeekDay(day) {
  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][day];
}

export function formatTime(time) {
  return dayjs(time).format('hh:mm A');
}

export function hasTimeElapsed(time) {
  const now = dayjs();
  return (
    now.hour() >= dayjs(time).hour() && now.minute() > dayjs(time).minute()
  );
}

export function isTimeRangeNow(timeRange) {
  const now = new Date().getTime();
  const startTime = new Date(timeRange[0]).getTime();
  const endTime = new Date(timeRange[1]).getTime();

  return startTime < now && endTime > now;
}
