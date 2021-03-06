import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import spacetime from 'spacetime';
import DateSelector from './dateSelector';
import ScrollTimePicker from './ScrollTimePicker';
import { GlobalContext } from '../context';
import { getTime } from '../time';
import * as url from '../apiUrl';

export const GROUP_NAME_MAX_LENGTH = 15;

export default function RegisterGroup(props) {
  const { navigate } = useNavigation();
  const { meridiem, hour, min } = getTime(spacetime.now('Asia/Seoul'));
  const [name, setName] = useState('');
  const [place, setPlace] = useState(null);
  const [selectedDay, setSelectedDay] = useState([]);
  const [time, setTime] = useState({ hour, min, meridiem });
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    const { params } = props.navigation.state;
    if (params) {
      const { name, coordinate } = params;
      setPlace({ name, coordinate });
    }
  }, [props.navigation.state.params]);

  function clickCreateGroupBtn() {
    const createGroupOptions = {
      method: 'POST',
      body: JSON.stringify({
        appointedAt: '2019-12-22T03:16:44.899Z',
        destination: {
          location: {
            ...place.coordinate
          },
          name: place.name
        },
        name,
        schedule: {
          dayOfWeeks: [...selectedDay],
          hour: time.hour,
          meridiem: time.meridiem,
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

  const renderFinishBtn = !!name.length && !!place && !!selectedDay.length;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1 }}>
          <View style={[styles.nameContainer, styles.underline]}>
            <Text style={styles.subTitle}>모임명</Text>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={(text) => {
                if (text.length < GROUP_NAME_MAX_LENGTH) {
                  setName(text);
                } else {
                  alert('이름 길이를 줄여주세요!');
                }
              }}
              placeholder="모임명을 입력하세요"
            />
          </View>
          <View style={[styles.datepickerContainer, styles.underline]}>
            <Text style={styles.subTitle}>모임 시간</Text>
            <View style={styles.dateContainer}>
              <ScrollTimePicker time={time} setTime={setTime} />
              <DateSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            </View>
          </View>
          <View style={styles.placeContainer}>
            <Text style={styles.subTitle}>모임 장소</Text>
            <TouchableOpacity
              onPress={() => {
                navigate('PlaceSearch', { page: 'RegisterGroup' });
              }}
              style={{ marginTop: 10 }}
            >
              <Text style={[styles.placeSearchInput, !place && styles.placeSearchInputPlaceHolder]}>
                {place ? place.name : '검색하기'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.finishBtnContainer}>
        {renderFinishBtn && (
          <TouchableOpacity
            onPress={() => {
              clickCreateGroupBtn();
            }}
            style={styles.registerGroup}
          >
            <Text style={styles.registerGroupText}>모임 생성</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateContainer: {
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
    height: 250,
    paddingHorizontal: 20
  },
  placeContainer: {
    height: 80,
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
    // flex: 1,
    height: 80,
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
  finishBtnContainer: {
    // flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  registerGroup: {
    alignItems: 'center',
    marginVertical: 'auto',
    borderWidth: 1,
    borderColor: '#0099ED',
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    marginBottom: 30,
    width: '90%'
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
