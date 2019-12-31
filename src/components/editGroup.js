import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Image,
  TextInput,
  TouchableOpacity,
  Clipboard,
  Share
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import * as url from '../apiUrl';
import { GlobalContext } from '../context';
import DateSelector from './dateSelector';
// import MaxMemberInput from './maxMemberInput';
import ScrollTimePicker from './ScrollTimePicker';
import { getTime, getSchedule } from '../time';

export default function EditGroup(props) {
  const { accessToken } = useContext(GlobalContext);
  const { navigate } = useNavigation();
  const groupId = useNavigationParam('groupId');
  const [time, setTime] = useState(null);
  const [groupInfo, setGroupInfo] = useState(null);
  // const [maxMemberCnt, setMaxMemberCnt] = useState('0');
  const [place, setPlace] = useState(null);
  const [selectedDay, setSelectedDay] = useState([]);

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
        setGroupInfo(resJson);
        const {
          schedule,
          destination: { name, location }
        } = resJson;
        setTime(getSchedule(schedule).time);
        setSelectedDay(schedule.dayOfWeek);
        setPlace({ name, coordinate: location });
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

  async function copyToClipboard() {
    const { code, name } = groupInfo;
    Share.share({
      message: `🙋‍♂️ ${name} 모임코드: ${code}.\n-------\n앱스토어에서 진짜 다와가를 만나보세요! 👇\n링크: https://apps.apple.com/us/app/podolist/id1439078928`
    });
  }

  const renderFinishBtn = !!place && !!selectedDay.length;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {groupInfo && time && (
        <ScrollView style={{ flex: 1 }}>
          <View style={[styles.memberInfoContainer, styles.underline]}>
            <Text style={styles.subTitle}>멤버</Text>
            {groupInfo.members.map((member, idx) => (
              <View key={`info_${idx}`} style={styles.person}>
                <View style={styles.personArea}>
                  <Image style={styles.personImage} source={{ uri: member.profileImageUrl }} />
                  <Text style={styles.personName} numberOfLines={1} ellipsizeMode="tail">
                    {member.name}
                  </Text>
                </View>
                {/* <Switch style={styles.personAdminSwitch} /> */}
              </View>
            ))}
            <TouchableOpacity
              onPress={() => {
                copyToClipboard();
              }}
            >
              <Text style={styles.invitationCode}>+ 초대 코드({groupInfo && groupInfo.code})</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.datepickerContainer, styles.underline]}>
            <Text style={styles.subTitle}>모임 시간</Text>
            <View style={styles.timePickerContainer}>
              <ScrollTimePicker time={time} setTime={setTime} />
            </View>
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
              <Text style={[styles.placeSearchInput, !place && styles.placeSearchInputPlaceHolder]}>
                {place ? place.name : '검색하기'}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.maxMemberContainer}>
          <Text style={styles.subTitle}>최대 멤버수</Text>
          <MaxMemberInput maxMemberCnt={maxMemberCnt} setMaxMemberCnt={setMaxMemberCnt} />
        </View> */}
        </ScrollView>
      )}
      {renderFinishBtn && (
        <ActionButton
          buttonColor="#0099ED"
          renderIcon={() => <Text style={styles.finishBtn}>완료</Text>}
          onPress={this.renderMarkers}
          size={70}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
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
    flex: 1,
    paddingHorizontal: 20
  },
  timePickerContainer: {
    flex: 1
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
    borderColor: '#0099ED',
    marginVertical: 5,
    marginRight: 15,
    paddingHorizontal: 7,
    paddingVertical: 8
  },
  personAdminSwitch: {
    // flex: 1
  },
  placeSearchInput: { fontSize: 19, fontFamily: 'scdream', borderWidth: 0, height: 40 },
  placeSearchInputPlaceHolder: { color: '#bbb' },
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
  }
});
