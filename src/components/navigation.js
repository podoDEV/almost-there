import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import spacetime from 'spacetime';
import { SimpleLineIcons, Ionicons, EvilIcons } from '@expo/vector-icons';
import { Layout } from '../layout';

export default function Navigation(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { groupInfo } = props;
  const [fold, toggleFold] = useState(true);

  useEffect(() => {
    if (!isLoaded && props.groupInfo) {
      setIsLoaded(true);
    }
  });

  return (
    <Layout>
      <View style={styles.naviContainer}>
        {isLoaded && (
          <View>
            <View style={styles.navigation}>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{groupInfo.name}</Text>
                <TouchableOpacity onPress={() => toggleFold(!fold)} style={styles.foldButtonArea}>
                  <SimpleLineIcons
                    style={styles.foldButton}
                    name={fold ? 'arrow-down' : 'arrow-up'}
                    size={12}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.scheduleBrief}>
                <Ionicons name="ios-timer" size={23} style={styles.timerIcon} />
                <Text style={styles.scheduleBriefText}>
                  {spacetime(groupInfo.appointedAt).unixFmt('hh:mm')}
                </Text>
              </View>
            </View>
            {!fold && (
              <View style={styles.infoContainer}>
                <View style={styles.memberInfoBox}>
                  <View style={styles.member}>
                    <Text style={styles.title}>멤버</Text>
                    {groupInfo.members.map((member, idx) => (
                      <View key={`info_${idx}`} style={styles.person}>
                        <Image
                          style={styles.personImage}
                          source={{ uri: member.profileImageUrl }}
                        />
                        <Text style={styles.personName}>{member.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.meetingInfoBox}>
                  <View style={styles.schedule}>
                    <Text style={styles.title}>모임시간</Text>
                    <Text style={styles.detail}>
                      {spacetime(groupInfo.appointedAt).unixFmt('yyyy-MM-dd hh:mm')}
                    </Text>
                  </View>
                  <View style={styles.place}>
                    <Text style={styles.title}>모임장소</Text>
                    <Text style={styles.detail}>{groupInfo.destination.name}</Text>
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
            )}
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
  foldButton: {
    flex: 1,
    marginLeft: 13
  },
  foldButtonArea: {
    flex: 1,
    paddingTop: 5,
    width: 10
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
    paddingVertical: 17,
    minHeight: 200
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
