import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { SimpleLineIcons, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { getSchedule } from '../time';

export default function Navigation(props) {
  const { navigate, goBack } = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);
  const { groupInfo, owner } = props;
  const [fold, toggleFold] = useState(true);
  useEffect(() => {
    if (!isLoaded && props.groupInfo) {
      setIsLoaded(true);
    }
  });

  return (
    <View style={styles.naviContainer}>
      {isLoaded && (
        <View>
          <View style={styles.navigation}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onPress={() => goBack()}
            >
              <MaterialIcons name="keyboard-arrow-left" color="#FFF" size={25} />
              <Text style={{ fontFamily: 'scdream', fontSize: 14, color: '#fff' }}>
                나의 리스트
              </Text>
            </TouchableOpacity>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName} numberOfLines={1} ellipsizeMode="tail">
                {groupInfo.name}
              </Text>
              <TouchableOpacity onPress={() => toggleFold(!fold)} style={styles.foldButtonArea}>
                <SimpleLineIcons
                  style={styles.foldButton}
                  name={fold ? 'arrow-down' : 'arrow-up'}
                  size={12}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
          {!fold && (
            <View style={styles.infoContainer}>
              <View style={styles.memberInfoBox}>
                <ScrollView style={styles.member}>
                  <Text style={styles.title}>멤버</Text>
                  {groupInfo.members.map((member, idx) => (
                    <View key={`info_${idx}`} style={styles.person}>
                      <Image style={styles.personImage} source={{ uri: member.profileImageUrl }} />
                      <Text style={styles.personName} numberOfLines={1} ellipsizeMode="tail">
                        {member.name}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.meetingInfoBox}>
                <View style={styles.schedule}>
                  <Text style={styles.title}>모임시간</Text>
                  <Text style={styles.detail}>
                    {getSchedule(groupInfo.schedule).dayTitleText}
                    {'\n'}
                    {getSchedule(groupInfo.schedule).timeTitleText}
                  </Text>
                </View>
                <View style={styles.place}>
                  <Text style={styles.title}>모임장소</Text>
                  <Text style={styles.detail}>{groupInfo.destination.name}</Text>
                </View>
                {owner && (
                  <TouchableOpacity
                    style={styles.editIconContainer}
                    onPress={() => navigate('EditGroup', { groupId: groupInfo.id })}
                  >
                    <EvilIcons name="gear" color="#0099ED" size={25} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
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
    flex: 1,
    paddingVertical: 11,
    flexDirection: 'row',
    backgroundColor: '#0099ED',
    width: '100%'
  },
  groupInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  groupName: {
    flex: 2,
    textAlign: 'right',
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
    marginLeft: 5,
    paddingTop: 5,
    width: 10
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
    paddingBottom: 10,
    justifyContent: 'flex-start'
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
    height: 150
  },
  schedule: {
    height: 150
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
  timerIcon: {
    marginRight: 4,
    color: '#fff'
  },
  editIconContainer: {
    alignSelf: 'flex-end'
  }
});
