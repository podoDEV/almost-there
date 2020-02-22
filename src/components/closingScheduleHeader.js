import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { getSchedule, getTime } from '../time';
import spacetime from 'spacetime';

export default function closingScheduleHeader(props) {
  const { groupList } = props;
  const [group, setGroup] = useState(null);
  const getTimeTitle = (schedule) => {
    const { timeTitleText, dayTitleText } = getSchedule(schedule);

    return `${dayTitleText} ${timeTitleText}`;
  };

  useEffect(() => {
    if (groupList) {
      setGroup(groupList.find((group) => group.status === 'ACTIVE'));
    }
  }, [groupList]);

  const getDiffTime = () => {
    const { schedule } = group;
    const { hour, min } = getTime(spacetime.now('Asia/Seoul'), false);
    const diff = schedule.hour * 60 + schedule.minute - hour * 60 - min;

    return {
      diff,
      after: diff < 0
    };
  };

  const renderActiveHeader = () => {
    const { diff, after } = getDiffTime();

    return (
      <View style={styles.latestMeeting}>
        <View style={styles.latestMeetingSection}>
          <Text style={styles.soon}>{after ? '지금!' : '곧...'}</Text>
        </View>
        <View style={styles.latestMeetingSection}>
          <Text style={styles.meetingName}>{group.name}</Text>
          <Text style={styles.meetingRestTime}>
            모임 {Math.abs(diff)}분 {after ? '지남' : '전'}
          </Text>
        </View>
        <View style={styles.meetingInfo}>
          <View style={styles.meetingDetail}>
            <MaterialIcons name={'timer'} size={25} color="#fff" />
            <Text style={styles.meetingTime}>{getTimeTitle(group.schedule)}</Text>
          </View>
          <View style={styles.meetingDetail}>
            <SimpleLineIcons name={'location-pin'} size={25} color="#fff" />
            <Text style={styles.meetingLocation}>{group.destination.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyHeader = () => {
    return (
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
    );
  };

  const renderInactiveHeader = () => {
    return (
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeMessageSection}>
          <View style={styles.welcomeMessageContainer}>
            <Text style={styles.welcomeMessage}>반가워요!</Text>
          </View>
          <View style={styles.welcomeMessageContainer}>
            <Text style={styles.welcomeMessageBold}>임박한 모임이{'\n'}없습니다!</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      {group
        ? renderActiveHeader()
        : groupList && groupList.length
        ? renderInactiveHeader()
        : renderEmptyHeader()}
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
