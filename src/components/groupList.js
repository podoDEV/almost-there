import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import ActionButton from 'react-native-action-button';
import { SwipeListView } from 'react-native-swipe-list-view';
import { GlobalContext } from '../context';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import * as url from '../apiUrl';

export default function GroupList(props) {
  const { navigation } = props;
  const [groupList, setGroupList] = useState(null);
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    };
    fetch(url.getGroups(), options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resJson) => {
        setGroupList(resJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.latestMeeting}>
        <View style={styles.latestMeetingSection}>
          <Text style={styles.soon}>곧...</Text>
        </View>
        <View style={styles.latestMeetingSection}>
          <Text style={styles.meetingName}>포도</Text>
          <Text style={styles.meetingRestTime}>모임 20분 전</Text>
        </View>
        <View style={styles.meetingInfo}>
          <View style={styles.meetingDetail}>
            <MaterialIcons name={'timer'} size={25} color="#fff" />
            <Text style={styles.meetingTime}>11:00 오전 토요일</Text>
          </View>
          <View style={styles.meetingDetail}>
            <SimpleLineIcons name={'location-pin'} size={25} color="#fff" />
            <Text style={styles.meetingLocation}>할리스 강남역점 B1층</Text>
          </View>
        </View>
      </View>
      <SwipeListView
        data={groupList}
        renderItem={(data, rowMap) => {
          return (
            <View style={styles.groupList}>
              <TouchableHighlight
                onPress={() => {
                  navigation.navigate('GroupMap');
                }}
              >
                <View style={styles.groupItem} key={data.index}>
                  <View style={styles.groupLeft}>
                    <View style={styles.groupLeftUp}>
                      <Text style={styles.groupItemName}>{data.item.name}</Text>
                      <Text style={styles.groupItemNumbers}>3</Text>
                    </View>
                    <View style={styles.groupLeftDown}>
                      <Text style={styles.groupItemLocation}>{data.item.destination.name}</Text>
                    </View>
                  </View>
                  <View style={styles.groupRight}>
                    <Text style={styles.groupItemDay}>격주 토요일</Text>
                    <Text style={styles.groupItemTime}>2:00 오후</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          );
        }}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <Text style={styles.rowText}> </Text>
            <Text style={styles.rowText}>나가기</Text>
          </View>
        )}
        disableRightSwipe={true}
        rightOpenValue={-80}
      />
      <ActionButton buttonColor="#0099ED">
        <ActionButton.Item
          buttonColor="#0099ED"
          onPress={() => {
            navigation.navigate('RegisterGroup');
          }}
        >
          <Text style={styles.actionBtnText}>모임{'\n'}만들기</Text>
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#0099ED"
          onPress={() => {
            navigation.navigate('GroupSearch');
          }}
        >
          <Text style={styles.actionBtnText}>모임{'\n'}찾기</Text>
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 35,
    backgroundColor: '#31ACF1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
  headerText: {
    color: '#fff',
    fontSize: 15,
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
  },
  groupList: {
    flexDirection: 'column'
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#FFFFFF'
  },
  groupLeft: {
    flexDirection: 'column'
  },
  groupLeftUp: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  groupItemName: {
    color: '#31ACF1',
    fontSize: 20,
    fontFamily: 'scdreamBold'
  },
  groupItemNumbers: {
    color: 'rgba(74,74,74,1.0)',
    fontSize: 20,
    paddingLeft: 10,
    fontFamily: 'scdream'
  },
  groupLeftDown: {
    flexDirection: 'row'
  },
  groupItemLocation: {
    color: 'rgba(74,74,74,1.0)',
    fontFamily: 'scdream'
  },
  groupRight: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  groupItemDay: {
    color: '#31ACF1',
    fontFamily: 'scdream'
  },
  groupItemTime: {
    color: '#31ACF1',
    fontFamily: 'scdream'
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontFamily: 'scdreamBold',
    textAlign: 'center',
    fontSize: 13
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FF0A00',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 18
  },
  rowText: {
    color: '#FFFFFF',
    fontFamily: 'scdreamBold'
  }
});
