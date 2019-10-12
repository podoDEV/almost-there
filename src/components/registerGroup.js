import React, { useState, useEffect, useContext } from 'react';
import * as url from '../apiUrl';
import { GlobalContext } from '../context';
import { Layout } from '../layout';
import DateSelector from './dateSelector';
import MaxMemberInput from './maxMemberInput';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import ActionButton from 'react-native-action-button';

export default function RegisterGroup(props) {
  const [maxMemberCnt, setMaxMemberCnt] = useState('0');
  const [name, setName] = useState('요가파이어');
  const [place, setPlace] = useState('씨맥스');
  const [selectedDay, setSelectedDay] = useState([]);

  useEffect(() => {}, []);

  return (
    <Layout>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.pageTitle}>
          <Text style={styles.pageTitleText}>모임만들기</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={[styles.nameContainer, styles.underline]}>
            <Text style={styles.subTitle}>모임명</Text>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>
          <View style={[styles.datepickerContainer, styles.underline]}>
            <Text style={styles.subTitle}>모임 시간</Text>
            <DateSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          </View>
          <View style={[styles.placeContainer, styles.underline]}>
            <Text style={styles.subTitle}>모임 장소</Text>
            <TextInput
              style={styles.placeSearchInput}
              value={place}
              onChangeText={(text) => {
                setPlace(text);
              }}
            />
          </View>
          <View style={styles.maxMemberContainer}>
            <Text style={styles.subTitle}>최대 멤버수</Text>
            <MaxMemberInput maxMemberCnt={maxMemberCnt} setMaxMemberCnt={setMaxMemberCnt} />
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.registerGroup}>
            <Text style={styles.registerGroupText}>모임 생성</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    color: '#0099ED',
    marginTop: 15
  },
  datepickerContainer: {
    flex: 5,
    paddingHorizontal: 20
  },
  pageTitle: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 55,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 11,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 153, 237, 1)',
    zIndex: 100
  },
  pageTitleText: {
    fontFamily: 'scdreamBold',
    fontSize: 22,
    color: '#fff'
  },
  placeContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  maxMemberContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  person: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  personName: {
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17,
    paddingVertical: 10
  },
  personArea: {
    flexDirection: 'row'
  },
  personImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#0099ED',
    marginVertical: 5,
    marginRight: 15,
    paddingHorizontal: 7,
    paddingVertical: 8
  },
  personAdminSwitch: {
    height: 22
  },
  placeSearchInput: { fontSize: 19, fontFamily: 'scdream', borderWidth: 0, height: 40 },
  nameContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 95
  },
  nameInput: {
    fontSize: 19,
    fontFamily: 'scdream',
    borderWidth: 0,
    height: 40
  },
  invitationCode: {
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17,
    paddingVertical: 10
  },
  finishBtn: {
    fontFamily: 'scdreamBold',
    color: '#FFF',
    fontSize: 17
  },
  underline: {
    borderBottomWidth: 1,
    borderColor: 'rgb(213, 213, 213)',
    paddingBottom: 15
  },
  registerGroup: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20
  },
  registerGroupText: {
    fontFamily: 'scdreamBold',
    color: '#0099ED',
    fontSize: 21
  }
});
