import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import * as url from '../apiUrl';
import { GlobalContext } from '../context';
import DateSelector from './dateSelector';
import ScrollTimePicker from './ScrollTimePicker';
import { getSchedule } from '../time';
import { GROUP_NAME_MAX_LENGTH } from './registerGroup';
import { isExistProfilePhoto, getThumbColor } from '../common';

export default function EditGroup(props) {
  const { accessToken } = useContext(GlobalContext);
  const { navigate, goBack } = useNavigation();
  const groupId = useNavigationParam('groupId');
  const [time, setTime] = useState(null);
  const [groupInfo, setGroupInfo] = useState(null);
  const [place, setPlace] = useState(null);
  const [selectedDay, setSelectedDay] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    };
    fetch(url.getGroup(groupId), options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resJson) => {
        const {
          schedule,
          destination: { name, location },
          name: groupName
        } = resJson;
        setGroupInfo(resJson);
        setTime(getSchedule(schedule).time);
        setSelectedDay(schedule.dayOfWeek);
        setPlace({ name, coordinate: location });
        setGroupName(groupName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const { params } = props.navigation.state;
    if (params) {
      const { name, coordinate } = params;
      setPlace({ name, coordinate });
    }
  }, [props.navigation.state.params]);

  const renderFinishBtn = !!place && !!selectedDay.length && !!groupName.length;

  const finishEditing = () => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        appointedAt: '2019-12-22T03:16:44.899Z',
        destination: {
          location: {
            ...place.coordinate
          },
          name: place.name
        },
        maximumCount: 10,
        name: groupName,
        schedule: {
          dayOfWeeks: [...selectedDay],
          hour: time.hour,
          meridiem: time.meridiem,
          minute: time.min
        }
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };

    fetch(url.putGroup(groupId), options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(() => {
        goBack();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {groupInfo && time && (
          <View style={{ flex: 1 }}>
            <View style={[styles.memberInfoContainer, styles.underline]}>
              <Text style={styles.subTitle}>멤버</Text>
              {groupInfo.members.map((member, idx) => (
                <View key={`info_${idx}`} style={styles.person}>
                  <View style={styles.personArea}>
                    {isExistProfilePhoto(member.profileImageUrl) ? (
                      <Image
                        style={[styles.personImage, { borderColor: getThumbColor(idx) }]}
                        source={{ uri: member.profileImageUrl }}
                      />
                    ) : (
                      <Text
                        style={[
                          styles.personImage,
                          { borderColor: getThumbColor(idx), backgroundColor: getThumbColor(idx) }
                        ]}
                      >
                        {member.name.slice(0, 2)}
                      </Text>
                    )}
                    <Text style={styles.personName} numberOfLines={1} ellipsizeMode="tail">
                      {member.name}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={[styles.nameContainer, styles.underline]}>
              <Text style={styles.subTitle}>모임명</Text>
              <TextInput
                style={styles.nameInput}
                value={groupName}
                onChangeText={(text) => {
                  if (text.length < GROUP_NAME_MAX_LENGTH) {
                    setGroupName(text);
                  } else {
                    alert('이름 길이를 줄여주세요!');
                  }
                }}
                placeholder="모임명을 입력하세요"
              />
            </View>
            <View style={[styles.datepickerContainer, styles.underline]}>
              <Text style={styles.subTitle}>모임 시간</Text>
              <ScrollTimePicker time={time} setTime={setTime} />
              <DateSelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            </View>
            <View style={styles.placeContainer}>
              <Text style={styles.subTitle}>모임 장소</Text>
              <TouchableOpacity
                onPress={() => {
                  navigate('PlaceSearch', { page: 'EditGroup' });
                }}
                style={{ marginTop: 10 }}
              >
                <Text
                  style={[styles.placeSearchInput, !place && styles.placeSearchInputPlaceHolder]}
                >
                  {place ? place.name : '검색하기'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.finishBtnContainer}>
        {renderFinishBtn && (
          <TouchableOpacity onPress={finishEditing} style={styles.registerGroup}>
            <Text style={styles.registerGroupText}>수정 완료</Text>
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
  memberInfoContainer: {
    flex: 3,
    paddingHorizontal: 20
  },
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
  placeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 50
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
    flex: 1,
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17,
    paddingVertical: 10,
    width: '75%'
  },
  personArea: {
    flex: 1,
    flexDirection: 'row'
  },
  personImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    marginVertical: 5,
    marginRight: 15,
    color: '#fff',
    overflow: 'hidden',
    textAlign: 'center',
    fontFamily: 'scdreamBold',
    fontSize: 10,
    lineHeight: 32
  },
  placeSearchInput: { fontSize: 19, fontFamily: 'scdream', borderWidth: 0, height: 40 },
  placeSearchInputPlaceHolder: { color: '#bbb' },
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
  }
});
