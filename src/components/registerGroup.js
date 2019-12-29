import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import spacetime from 'spacetime';
// import MaxMemberInput from './maxMemberInput';
import DateSelector from './dateSelector';
import ScrollTimePicker from './ScrollTimePicker';
import { GlobalContext } from '../context';
import { getTime } from '../time';
import * as url from '../apiUrl';

export default function RegisterGroup(props) {
  const { navigate } = useNavigation();
  const { meridiem, hour, min } = getTime(spacetime.now());
  // const [maxMemberCnt, setMaxMemberCnt] = useState('0');
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [selectedDay, setSelectedDay] = useState([]);
  const [time, setTime] = useState({ hour, min, meridiem });
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    if (props.navigation.state.params) {
      setPlace(props.navigation.state.params.name);
    }
  }, [props.navigation.state.params]);

  function clickCreateGroupBtn() {
    console.log(time.meridiem, accessToken);

    // @TODO: appointedAt 제거 필요. 장소 받아와야함
    const createGroupOptions = {
      method: 'POST',
      body: JSON.stringify({
        appointedAt: '2019-12-22T03:16:44.899Z',
        destination: {
          location: {
            latitude: 0,
            longitude: 0
          },
          name: place
        },
        name,
        schedule: {
          dayOfWeeks: [...selectedDay],
          hour: time.hour + time.meridiem === 'AM' ? 0 : 12,
          minute: time.min
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
    fetch(url.postGroups(), createGroupOptions)
      .then((res) => res.json())
      .then(() => {
        navigate('GroupList');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.nameContainer, styles.underline]}>
          <Text style={styles.subTitle}>모임명</Text>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            placeholder="모임명을 입력하세요"
          />
        </View>
        <View style={[styles.datepickerContainer, styles.underline]}>
          <Text style={styles.subTitle}>모임 시간</Text>
          <View style={styles.dateContainer}>
            <View style={styles.timePickerContainer}>
              <ScrollTimePicker time={time} setTime={setTime} />
            </View>
            <DateSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          </View>
        </View>
        <View style={styles.placeContainer}>
          <Text style={styles.subTitle}>모임 장소</Text>
          <TouchableOpacity
            onPress={() => {
              navigate('SearchPlace');
            }}
            style={{ marginTop: 10 }}
          >
            <Text
              style={[styles.placeSearchInput, !place.length && styles.placeSearchInputPlaceHolder]}
            >
              {place.length ? place : '검색하기'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.maxMemberContainer}>
          <Text style={styles.subTitle}>최대 멤버수</Text>
          <MaxMemberInput maxMemberCnt={maxMemberCnt} setMaxMemberCnt={setMaxMemberCnt} />
        </View> */}
        <TouchableOpacity
          onPress={() => {
            clickCreateGroupBtn();
          }}
          style={styles.registerGroup}
        >
          <Text style={styles.registerGroupText}>모임 생성</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  dateContainer: {
    flex: 1
  },
  timePickerContainer: {
    flex: 1
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
  placeSearchInputPlaceHolder: { color: '#bbb' },
  nameContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20
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
  },
  searchPlaceText: {
    color: 'rgb(74, 74, 74)',
    fontSize: 19,
    fontFamily: 'scdream'
  }
});
