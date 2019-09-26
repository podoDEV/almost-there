import React, { useState, useEffect } from 'react';
import { Layout } from '../layout';
import {
  StyleSheet,
  Text,
  View,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
  TouchableOpacity
} from 'react-native';

export default function EditGroup(props) {
  const { navigation } = props;
  const [date, setDate] = useState(new Date());

  useEffect(() => {}, []);

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text>포도</Text>
        </View>
        <View style={styles.memberInfoContainer}>
          <Text>멤버</Text>
        </View>
        <View style={styles.datepickerContainer}>
          <Text>모임시간</Text>
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
                style={styles.daySelectorBtn}
                onPress={() => {
                  console.log(day);
                }}
              >
                <Text styles={styles.daySelectorText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.placeContainer}>
          <Text>모임장소</Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
    // backgroundColor: '#0099ED'
  },
  title: {
    color: '#fff',
    fontFamily: 'scdream',
    textAlign: 'center',
    fontSize: 29
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
    borderColor: '#979797'
  },
  daySelectorText: {
    fontSize: 18,
    color: '#4a4a4a'
  },
  datepickerContainer: {
    flex: 5
  },
  timePickerContainer: {
    flex: 1
  },
  memberInfoContainer: {
    flex: 1
  },
  titleContainer: {
    flex: 1
  },
  placeContainer: {
    flex: 1
  }
});
