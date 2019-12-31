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

export function getTimePickerSet() {
  const MERIDIEM = ['AM', 'PM'];
  const HOUR = Array.from(Array(13).keys());
  HOUR.shift();
  const MIN_NUM = Array.from(Array(60).keys());
  const MIN = MIN_NUM.map((min) => {
    return min < 10 ? '0' + min : min.toString();
  });

  return {
    MERIDIEM,
    HOUR,
    MIN
  };
}

export function getTime(time) {
  const tt = spacetime(time);
  const hourNumber = tt.hour();

  return {
    meridiem: tt.ampm(),
    hour: hourNumber > 12 ? hourNumber - 12 : hourNumber,
    min: tt.minute()
  };
}

function getTimeTitleText(time) {
  const { meridiem, hour, min } = time;
  const meridiemTitle = meridiem === 'am' ? '오전' : '오후';
  const hourTitle = hour >= 10 ? hour : `0${hour}`;
  const minTitle = min >= 10 ? min : `0${min}`;

  return `${meridiemTitle} ${hourTitle}:${minTitle}`;
}

export function getSchedule(schedule) {
  const { dayOfWeek, hour, minute } = schedule;
  const tempTime = spacetime([2019, 1, 1, hour, minute]);

  const time = getTime(tempTime);
  const timeTitleText = getTimeTitleText(time);
  let dayTitleText = '매주 ';

  dayOfWeek.map((value) => {
    const { title } = days.filter((obj) => obj.value === value)[0];
    dayTitleText += `${title},`;
  });
  dayTitleText = dayTitleText.slice(0, dayTitleText.length - 1);

  return {
    time,
    dayTitleText,
    timeTitleText
  };
}
