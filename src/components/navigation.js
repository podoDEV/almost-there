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
          <Text style={{ fontFamily: 'scdream', fontSize: 14, color: '#fff' }}>나의 리스트</Text>
        </TouchableOpacity>
        {isLoaded && (
          <View style={styles.groupInfo}>
            <Text style={styles.groupName} numberOfLines={1} ellipsizeMode="tail">
              {groupInfo.name}
            </Text>
            <TouchableOpacity style={styles.foldButtonContainer} onPress={() => toggleFold(!fold)}>
              <SimpleLineIcons
                style={styles.foldButton}
                name={fold ? 'arrow-down' : 'arrow-up'}
                size={12}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={{ flex: 1 }}></View>
      </View>
      {isLoaded && !fold && (
        <View style={styles.infoContainer}>
          <View style={styles.memberInfoBox}>
            <Text style={styles.title}>멤버</Text>
            <ScrollView style={styles.memberScroll}>
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
  );
}

const styles = StyleSheet.create({
  naviContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    padding: 0,
    margin: 0
  },
  navigation: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 15,
    flexDirection: 'row',
    backgroundColor: '#0099ED',
    width: '100%'
  },
  groupInfo: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  groupName: {
    fontFamily: 'scdreamBold',
    fontSize: 20,
    color: '#fff',
    maxWidth: '75%'
  },
  foldIcon: {
    color: '#fff'
  },
  foldButtonContainer: { height: 24, width: 24, justifyContent: 'center', alignItems: 'center' },
  foldButton: {
    height: 12,
    width: 12
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
  memberScroll: {
    height: 335
  },
  person: {
    flex: 1,
    flexDirection: 'row'
  },
  personName: {
    fontFamily: 'scdream',
    color: '#0099ED',
    fontSize: 17,
    paddingVertical: 10,
    width: '60%'
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
