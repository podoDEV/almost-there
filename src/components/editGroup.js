import React, { useState, useEffect } from 'react';
import { Layout } from '../layout';
import DateSelector from './dateSelector';
import MaxMemberInput from './maxMemberInput';
import { StyleSheet, Text, View } from 'react-native';

export default function EditGroup(props) {
  const [selectedDay, setSelectedDay] = useState([]);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text>포도</Text>
        </View>
        <View style={styles.memberInfoContainer}>
          <Text style={styles.subTitle}>멤버</Text>
        </View>
        <View style={styles.datepickerContainer}>
          <Text style={styles.subTitle}>모임 시간</Text>
          <DateSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        </View>
        <View style={styles.placeContainer}>
          <Text style={styles.subTitle}>모임 장소</Text>
        </View>
        <View style={styles.maxMemberContainer}>
          <Text style={styles.subTitle}>최대 멤버수</Text>
          <MaxMemberInput />
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
  subTitle: {
    fontFamily: 'scdreamBold',
    fontSize: 14,
    color: '#0099ED'
  },
  datepickerContainer: {
    flex: 5,
    paddingHorizontal: 20
  },
  memberInfoContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  titleContainer: {
    flex: 1
  },
  placeContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  maxMemberContainer: {
    flex: 1,
    paddingHorizontal: 20
  }
});
