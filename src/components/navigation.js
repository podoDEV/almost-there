import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Layout } from '../layout';

export default function Navigation(props) {
  const members = [
    { name: '박민수', abbr: 'MS' },
    { name: '한정', abbr: 'HJ' },
    { name: '김희범', abbr: 'HB' },
    { name: '이기정', abbr: 'KJ' },
    { name: '김자영', abbr: 'JY' },
    { name: '전해성', abbr: 'HS' }
  ];
  const [fold, toggleFold] = useState(true);

  return (
    <Layout>
      <View style={styles.naviContainer}>
        <View style={styles.navigation}>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>포도</Text>
            <SimpleLineIcons
              style={styles.foldButton}
              name={fold ? 'arrow-up' : 'arrow-down'}
              size={13}
              color="#0099ED"
              onPress={() => toggleFold(!fold)}
            />
          </View>
          <View style={styles.scheduleBrief}>
            <Text style={styles.scheduleBriefText}>11:00 오전</Text>
          </View>
        </View>
        {!fold && (
          <View style={styles.infoContainer}>
            <View style={styles.memberInfoBox}>
              <View style={styles.member}>
                <Text style={styles.title}>멤버</Text>
                {members.map((member) => (
                  <View key={member.name} style={styles.person}>
                    <Text style={styles.personAbbr}>{member.abbr}</Text>
                    <Text style={styles.personName}>{member.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.meetingInfoBox}>
              <View style={styles.place}>
                <Text style={styles.title}>모임장소</Text>
                <Text style={styles.detail}>할리스 강남역점 B1층</Text>
              </View>
              <View style={styles.schedule}>
                <Text style={styles.title}>모임시간</Text>
                <Text style={styles.detail}>매주 토요일 오전 11:00</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  naviContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1
  },
  navigation: {
    flex: 1,
    paddingTop: 48,
    paddingLeft: 20,
    paddingRight: 27,
    paddingBottom: 20,
    flexDirection: 'row',
    alignContent: 'space-between',
    color: '#fff',
    backgroundColor: '#0099ed'
  },
  groupInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  groupName: {
    fontFamily: 'scdreamBold',
    fontSize: 22,
    color: '#0099ED'
  },
  foldIcon: {},
  scheduleBrief: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  scheduleBriefText: {
    fontFamily: 'scdream',
    fontSize: 22,
    color: '#0099ED'
  },
  infoContainer: {
    flex: 5,
    flexDirection: 'row'
  },
  meetingInfoBox: {
    flex: 3
  },
  memberInfoBox: {
    flex: 5
  },
  person: {
    flex: 1,
    flexDirection: 'row'
  },
  personName: {
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17,
    paddingVertical: 10
  },
  personAbbr: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#0099ED',
    marginVertical: 5,
    fontSize: 11,
    color: '#000',
    marginRight: 14,
    paddingHorizontal: 7,
    paddingVertical: 8,
    fontFamily: 'scdream'
  },
  member: {
    flex: 1
  },
  place: {
    flex: 1
  },
  schedule: {
    flex: 1
  },
  title: {
    fontFamily: 'scdreamBold',
    color: '#0099ED'
  },
  detail: {
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17
  },
  foldButton: {
    flex: 1,
    marginLeft: 13
  }
});
