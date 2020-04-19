import spacetime from 'spacetime';

export const days = [
  { title: '월', value: 'MONDAY' },
  { title: '화', value: 'TUESDAY' },
  { title: '수', value: 'WEDNESDAY' },
  { title: '목', value: 'THURSDAY' },
  { title: '금', value: 'FRIDAY' },
  { title: '토', value: 'SATURDAY' },
  { title: '일', value: 'SUNDAY' }
];

const sortDayValue = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7
};

export function getTimePickerSet() {
  const MERIDIEM = ['AM', 'PM'];
  const HOUR = Array.from(Array(13).keys());
  HOUR.shift();
  const MIN_NUM = Array.from(Array(60).keys());
  const MIN = MIN_NUM.filter((min) => !(min % 5)).map((min) => {
    return min < 10 ? '0' + min : min.toString();
  });

  return {
    MERIDIEM,
    HOUR,
    MIN
  };
}

export function getTime(time, fiveUnit = true) {
  const tt = spacetime(time, 'Asia/Seoul');
  const hourNumber = tt.hour();

  return {
    meridiem: tt.ampm().toUpperCase(),
    hour: hourNumber > 12 ? hourNumber - 12 : hourNumber,
    min: fiveUnit ? parseInt(tt.minute() / 5) * 5 : tt.minute()
  };
}

function getTimeTitleText(time) {
  const { meridiem, hour, min } = time;
  const meridiemTitle = meridiem === 'AM' ? '오전' : '오후';
  const hourTitle = hour >= 10 ? hour : `0${hour}`;
  const minTitle = min >= 10 ? min : `0${min}`;

  return `${meridiemTitle} ${hourTitle}:${minTitle}`;
}

function getHourWithMeridiem(meridiem, hour) {
  if (meridiem === 'AM' && hour === 12) {
    return 0;
  }

  if (meridiem === 'PM' && hour !== 12) {
    return hour + 12;
  }

  return hour;
}

export function getSchedule(schedule) {
  const { dayOfWeek, hour, minute, meridiem } = schedule;
  const hourWithMeridiem = getHourWithMeridiem(meridiem, hour);
  const tempTime = spacetime([2019, 1, 1, hourWithMeridiem, minute], 'Asia/Seoul');

  const time = getTime(tempTime);
  const timeTitleText = getTimeTitleText(time);
  let dayTitleText = '매주 ';

  dayOfWeek
    .sort((d1, d2) => sortDayValue[d1] - sortDayValue[d2])
    .map((value) => {
      const { title } = days.filter((obj) => obj.value === value)[0];
      console.log(value);
      dayTitleText += `${title},`;
    });
  dayTitleText = dayTitleText.slice(0, dayTitleText.length - 1);

  return {
    time,
    dayTitleText,
    timeTitleText
  };
}
