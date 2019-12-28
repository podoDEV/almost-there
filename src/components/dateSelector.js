import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { removeElementFromArray } from '../common';

export default function EditGroup(props) {
  const days = [
    { title: '월', value: 'MONDAY' },
    { title: '화', value: 'TUESDAY' },
    { title: '수', value: 'WEDNESDAY' },
    { title: '목', value: 'THURSDAY' },
    { title: '금', value: 'FRIDAY' },
    { title: '토', value: 'SATURDAY' },
    { title: '일', value: 'SUNDAY' }
  ];

  function setSelectedDay(day) {
    const index = props.selectedDay.indexOf(day);

    if (index !== -1) {
      props.setSelectedDay([...removeElementFromArray(props.selectedDay, index)]);
    } else {
      props.setSelectedDay([...props.selectedDay, day]);
    }
  }

  return (
    <View style={styles.daySelectorContainer}>
      {days.map((day) => {
        const { title, value } = day;

        return (
          <TouchableOpacity
            key={`dayKey_${value}`}
            style={[
              styles.daySelectorBtn,
              props.selectedDay.includes(value) && styles.dayActiveBtn
            ]}
            onPress={() => {
              setSelectedDay(value);
            }}
          >
            <Text
              style={[
                styles.daySelectorText,
                props.selectedDay.includes(value) && styles.dayActiveText
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
