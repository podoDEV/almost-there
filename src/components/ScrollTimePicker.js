import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ScrollPicker from './scrollPicker';
import { getTimePickerSet, getTime } from '../time';

export default function ScrollTimePicker(props) {
  const {
    time: { hour, meridiem, min },
    setTime
  } = props;
  const { MERIDIEM, HOUR, MIN } = getTimePickerSet();

  const updateTime = () => {
    setTime({
      hour: this.hour.getSelected(),
      meridiem: this.meridiem.getSelected(),
      min: this.min.getSelected()
    });
  };

  return (
    <View style={styles.container}>
      <ScrollPicker
        ref={(meridiem) => {
          this.meridiem = meridiem;
        }}
        dataSource={MERIDIEM}
        wrapperHeight={105}
        selectedIndex={meridiem === 'am' ? 0 : 1}
        onValueChange={updateTime}
      />
      <ScrollPicker
        ref={(hour) => {
          this.hour = hour;
        }}
        dataSource={HOUR}
        wrapperHeight={105}
        selectedIndex={hour - 1}
        onValueChange={updateTime}
      />
      <Text>:</Text>
      <ScrollPicker
        ref={(min) => {
          this.min = min;
        }}
        dataSource={MIN}
        wrapperHeight={105}
        selectedIndex={min}
        onValueChange={updateTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 140,
    alignItems: 'center',
    paddingHorizontal: 80
  }
});
