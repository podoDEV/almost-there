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
  Clipboard
} from 'react-native';
import spacetime from 'spacetime';
import * as url from '../apiUrl';
import { GlobalContext } from '../context';
import { Layout } from '../layout';
import DateSelector from './dateSelector';
import MaxMemberInput from './maxMemberInput';
import ScrollTimePicker from './ScrollTimePicker';
import { getTime } from '../time';
import ActionButton from 'react-native-action-button';

export default function EditGroup(props) {
  const { accessToken } = useContext(GlobalContext);

  // @TODO: 서버에서 가져온 값으로 적여야함
  const { meridiem, hour, min } = getTime(spacetime.now());
  const [time, setTime] = useState({ hour, min, meridiem });
  const [groupInfo, setGroupInfo] = useState(null);
  const [maxMemberCnt, setMaxMemberCnt] = useState('0');
  const [place, setPlace] = useState('씨맥스');
  const [selectedDay, setSelectedDay] = useState([]);

  useEffect(() => {
    fetch(url.getMembers(), { method: 'GET' })
      .then((res) => res.json())
      .then(() => {
        const options = {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` }
        };
        fetch(url.getGroup(1), options)
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
          })
          .then((resJson) => {
            setGroupInfo(resJson);
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, []);

  async function copyToClipboard() {
    await Clipboard.setString('ABCDEF');
    alert('초대코드 복사 완료!');
  }

  return (
    <Layout>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.groupNameContainer}>
          <Text style={styles.groupName}>포도</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={[styles.memberInfoContainer, styles.underline]}>
            <Text style={styles.subTitle}>멤버</Text>
            {groupInfo &&
              groupInfo.members.map((member, idx) => (
                <View key={`info_${idx}`} style={styles.person}>
                  <View style={styles.personArea}>
                    <Image style={styles.personImage} source={{ uri: member.profileImageUrl }} />
                    <Text style={styles.personName}>{member.name}</Text>
                  </View>
                  <Switch style={styles.personAdminSwitch} />
                </View>
              ))}
            <TouchableOpacity
              onPress={() => {
                copyToClipboard();
              }}
            >
              {/* @TODO: 카카오 공유하기 들어가야함 */}
              <Text style={styles.invitationCode}>+ 초대 코드(AAAAAA)</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.datepickerContainer, styles.underline]}>
            <Text style={styles.subTitle}>모임 시간</Text>
            <View style={styles.timePickerContainer}>
              <ScrollTimePicker time={time} setTime={setTime} />
            </View>
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
        </ScrollView>
        <ActionButton
          buttonColor="#0099ED"
          renderIcon={() => <Text style={styles.finishBtn}>완료</Text>}
          onPress={this.renderMarkers}
          size={70}
        />
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
  memberInfoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 95
  },
  groupNameContainer: {
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
  timePickerContainer: {
    flex: 1
  },
  groupName: {
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
