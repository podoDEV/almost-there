import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Layout } from '../layout';

export default function Navigation(props) {
  const members = [
    { name: '박민수', abbr: 'MS', admin: true },
    { name: '한정', abbr: 'HJ' },
    { name: '김희범', abbr: 'HB' },
    { name: '이기정', abbr: 'KJ' },
    { name: '김자영', abbr: 'JY', admin: true },
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
              size={12}
              color="#fff"
              onPress={() => toggleFold(!fold)}
            />
          </View>
          <View style={styles.scheduleBrief}>
            <Ionicons name="ios-timer" size={23} style={styles.timerIcon} />
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
                    <Image style={styles.personImage} source={require('../../assets/thumb.jpeg')} />
                    <Text style={styles.personName}>{member.name}</Text>
                    {member.admin && (
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                          name="crown"
                          color="#F5A623"
                          size={15}
                          style={{ marginLeft: 3 }}
                        />
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.meetingInfoBox}>
              <View style={styles.schedule}>
                <Text style={styles.title}>모임시간</Text>
                <Text style={styles.detail}>매주 토요일 오전 11:00</Text>
              </View>
              <View style={styles.place}>
                <Text style={styles.title}>모임장소</Text>
                <Text style={styles.detail}>할리스 강남역점 B1층</Text>
              </View>
              <View style={styles.editIconContainer}>
                <Ionicons name="ios-options" color="#0099ED" size={19} />
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
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1
  },
  navigation: {
    paddingTop: 55,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 11,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 153, 237, 0.8)'
  },
  groupInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupName: {
    fontFamily: 'scdreamBold',
    fontSize: 22,
    color: '#fff'
  },
  foldIcon: {
    color: '#fff'
  },
  scheduleBrief: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  scheduleBriefText: {
    fontFamily: 'scdream',
    fontSize: 22,
    color: '#fff'
  },
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
    fontSize: 11,
    color: '#000',
    marginRight: 14,
    fontFamily: 'scdream'
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
    color: '#0099ED',
    fontSize: 11,
    marginBottom: 14
  },
  detail: {
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17
  },
  foldButton: {
    flex: 1,
    marginLeft: 13
  },
  timerIcon: {
    marginRight: 4,
    color: '#fff'
  },
  editIconContainer: {
    alignSelf: 'flex-end'
  }
});
