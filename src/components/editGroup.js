import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { Layout } from '../layout';
import PersonInfo from './navigation/personInfo';
import { members, memberInfoStyles } from './navigation/groupInfo';

function GroupNameArea(groupName) {
  return (
    <View style={styles.naviContainer}>
      <View style={styles.navigation}>
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{groupName}</Text>
        </View>
      </View>
    </View>
  );
}

export default function EditGroup(props) {
  useEffect(() => {
    // @TODO: 해당 멤버 정보 prop으로 넘겨주기
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        {GroupNameArea('포도')}
        <View style={memberInfoStyles.infoContainer}>
          <View style={memberInfoStyles.memberInfoBox}>
            <View style={memberInfoStyles.member}>
              {members.map((member) => (
                <PersonInfo member={member} key={member.name} editMode={true} />
              ))}
            </View>
          </View>
        </View>
        <View style={styles.timepickerContainer}>
          <Text>timepickerContainer</Text>
        </View>
        <View style={styles.placeContainer}>
          <Text>placeContainer</Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  naviContainer: {
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
  timepickerContainer: {
    flex: 4
  },
  placeContainer: {
    flex: 2
  }
});
