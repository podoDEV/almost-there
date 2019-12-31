import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { getSchedule } from '../time';

export default function closingScheduleHeader(props) {
  const { groupList } = props;
  const getTimeTitle = (schedule) => {
    const { timeTitleText, dayTitleText } = getSchedule(schedule);

    return `${dayTitleText} ${timeTitleText}`;
  };

  return (
    <View>
      {groupList && groupList.length ? (
        <View style={styles.latestMeeting}>
          <View style={styles.latestMeetingSection}>
            <Text style={styles.soon}>곧...</Text>
          </View>
          <View style={styles.latestMeetingSection}>
            <Text style={styles.meetingName}>{groupList[0].name}</Text>
            <Text style={styles.meetingRestTime}>모임 20분 전</Text>
          </View>
          <View style={styles.meetingInfo}>
            <View style={styles.meetingDetail}>
              <MaterialIcons name={'timer'} size={25} color="#fff" />
              <Text style={styles.meetingTime}>{getTimeTitle(groupList[0].schedule)}</Text>
            </View>
            <View style={styles.meetingDetail}>
              <SimpleLineIcons name={'location-pin'} size={25} color="#fff" />
              <Text style={styles.meetingLocation}>{groupList[0].destination.name}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeMessageSection}>
            <View style={styles.welcomeMessageContainer}>
              <Text style={styles.welcomeMessage}>반가워요!</Text>
            </View>
            <View style={styles.welcomeMessageContainer}>
              <Text style={styles.welcomeMessage}>아래 +버튼을 눌러</Text>
            </View>
            <View>
              <Text style={styles.welcomeMessageBold}>모임을 추가해 보세요!</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeSection: {
    height: 230,
    backgroundColor: '#0099ED',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 25,
    paddingBottom: 41
  },
  welcomeMessageSection: {
    flex: 1,
    width: 312,
    height: 109,
    justifyContent: 'flex-end'
  },
  welcomeMessageContainer: {
    marginBottom: 10
  },
  welcomeMessage: {
    color: '#FFFFFF',
    fontFamily: 'scdream',
    fontSize: 23
  },
  welcomeMessageBold: {
    fontSize: 32,
    letterSpacing: 0.51,
    color: '#FFFFFF',
    fontFamily: 'scdreamBold'
  },
  latestMeeting: {
    height: 230,
    backgroundColor: '#0099ED',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 25,
    paddingBottom: 15
  },
  latestMeetingSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignContent: 'center',
    paddingBottom: 10
  },
  meetingInfo: {
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 15
  },
  meetingDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 5
  },
  soon: {
    color: '#FFF',
    paddingBottom: 5,
    fontSize: 15,
    fontFamily: 'scdream'
  },
  meetingName: {
    color: '#FFF',
    fontSize: 35,
    textAlignVertical: 'bottom',
    fontFamily: 'scdreamBold'
  },
  meetingRestTime: {
    color: '#FEBABA',
    paddingLeft: 10,
    fontSize: 15
  },
  meetingTime: {
    fontFamily: 'scdream',
    flexDirection: 'column',
    color: '#FFF',
    paddingLeft: 5,
    fontSize: 20
  },
  meetingLocation: {
    color: '#FFF',
    paddingLeft: 5,
    fontSize: 20,
    fontFamily: 'scdream',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
