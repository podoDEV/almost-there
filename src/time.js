import spacetime from 'spacetime';

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
