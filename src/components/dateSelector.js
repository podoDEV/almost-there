import React, { useState } from 'react';
import { StyleSheet, Text, View, DatePickerIOS, Platform, TouchableOpacity } from 'react-native';
import { removeElementFromArray } from '../common';

export default function EditGroup(props) {
  const [date, setDate] = useState(new Date());
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  function setSelectedDay(day) {
    const index = props.selectedDay.indexOf(day);

    if (index !== -1) {
      props.setSelectedDay([...removeElementFromArray(props.selectedDay, index)]);
    } else {
      props.setSelectedDay([...props.selectedDay, day]);
    }
  }

  return (
    <View style={styles.dateContainer}>
      <View style={styles.timePickerContainer}>
        {Platform.OS === 'ios' ? (
          <DatePickerIOS date={date} onDateChange={setDate} mode="time" />
        ) : (
          <View>Android Datepicker</View>
        )}
      </View>
      <View style={styles.daySelectorContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={`dayKey_${day}`}
            style={[styles.daySelectorBtn, props.selectedDay.includes(day) && styles.dayActiveBtn]}
            onPress={() => {
              setSelectedDay(day);
            }}
          >
            <Text
              style={[
                styles.daySelectorText,
                props.selectedDay.includes(day) && styles.dayActiveText
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flex: 1
  },
  timePickerContainer: {
    flex: 1
  },
  daySelectorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  daySelectorBtn: {
    height: 38,
    width: 38,
    borderWidth: 1,
    borderColor: 'rgb(151, 151, 151)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  daySelectorText: {
    fontFamily: 'scdream',
    fontSize: 18,
    color: 'rgb(74, 74, 74)'
  },
  dayActiveBtn: {
    backgroundColor: '#0099ED',
    borderColor: '#0099ED'
  },
  dayActiveText: {
    color: '#fff'
  }
});
