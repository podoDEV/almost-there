import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Layout } from '../../layout';
import PersonInfo from './personInfo';

export const members = [
  { name: '박민수', abbr: 'MS', admin: true },
  { name: '한정', abbr: 'HJ' },
  { name: '김희범', abbr: 'HB' },
  { name: '이기정', abbr: 'KJ' },
  { name: '김자영', abbr: 'JY', admin: true },
  { name: '전해성', abbr: 'HS' }
];

export default function GroupInfo(props) {
  return (
    <Layout>
      <View style={memberInfoStyles.infoContainer}>
        <View style={memberInfoStyles.memberInfoBox}>
          <View style={memberInfoStyles.member}>
            <Text style={styles.title}>멤버</Text>
            {members.map((member) => (
              <PersonInfo member={member} key={member.name} />
            ))}
          </View>
        </View>
        <View style={memberInfoStyles.meetingInfoBox}>
          <View style={styles.schedule}>
            <Text style={styles.title}>모임시간</Text>
            <Text style={styles.detail}>매주 토요일 오전 11:00</Text>
          </View>
          <View style={styles.place}>
            <Text style={styles.title}>모임장소</Text>
            <Text style={styles.detail}>할리스 강남역점 B1층</Text>
          </View>
          <View style={styles.editIconContainer}>
            <EvilIcons
              name="gear"
              color="#0099ED"
              size={25}
              onPress={() => props.navigation.navigate('EditGroup')}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}

export const memberInfoStyles = StyleSheet.create({
  infoContainer: {
    flex: 5,
    flexDirection: 'row',
    paddingLeft: 19,
    paddingRight: 27,
    paddingVertical: 17
  },
  meetingInfoBox: {
    flex: 3,
    paddingBottom: 10
  },
  memberInfoBox: {
    flex: 4
  },
  member: {
    flex: 1
  }
});

const styles = StyleSheet.create({
  place: {
    flex: 1
  },
  schedule: {
    flex: 1
  },
  title: {
    fontFamily: 'scdreamBold',
    color: '#0099ED',
    fontSize: 11,
    marginBottom: 14
  },
  detail: {
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17
  },
  editIconContainer: {
    alignSelf: 'flex-end'
  }
});
