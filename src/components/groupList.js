import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import { SwipeListView } from 'react-native-swipe-list-view';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';
import { useFocusEffect, useNavigation } from 'react-navigation-hooks';
import ClosingScheduleHeader from './closingScheduleHeader';
import { getSchedule } from '../time';
import { AntDesign } from '@expo/vector-icons';

export default function GroupList(props) {
  const { navigate } = useNavigation();
  const [memberId, setMemberId] = useState(null);
  const [groupList, setGroupList] = useState(null);
  const { accessToken } = useContext(GlobalContext);

  useFocusEffect(
    useCallback(() => {
      const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` }
      };
      fetch(url.membersMe(), options)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((resJson) => {
          setMemberId(resJson.id);
          setGroupList(resJson.groups);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [])
  );

  const leaveGroup = (memberId, groupId) => {
    const options = {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` }
    };
    fetch(url.leaveGroup(memberId, groupId), options)
      .then((res) => {
        if (res.status === 200) {
          console.log('Successfully leaved');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...groupList];
    const prevIndex = groupList.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setGroupList(newData);
  };

  const confirmDelete = (rowMap, id) => {
    Alert.alert(
      '🔥주의🔥',
      '삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            leaveGroup(memberId, id);
            deleteRow(rowMap, id);
          }
        },
        { text: '아니오', style: 'cancel' }
      ],
      { cancelable: false }
    );
  };

  const renderListItem = (data, rowMap) => {
    const {
      item: { name, destination, id, schedule, memberCount },
      index
    } = data;
    const { dayTitleText, timeTitleText } = getSchedule(schedule);

    return (
      <View style={styles.groupList}>
        <TouchableHighlight
          onPress={() => {
            closeRow(rowMap, id);
            navigate('GroupMap', { groupId: id });
          }}
        >
          <View style={styles.groupItem} key={index}>
            <View style={styles.groupLeft}>
              <View style={styles.groupLeftUp}>
                <Text style={styles.groupItemName}>{name}</Text>
                <Text style={styles.groupItemNumbers}>{memberCount}</Text>
              </View>
              <View style={styles.groupLeftDown}>
                <Text style={styles.groupItemLocation}>{destination.name}</Text>
              </View>
            </View>
            <View style={styles.groupRight}>
              <Text style={styles.groupItemDay}>{dayTitleText}</Text>
              <Text style={styles.groupItemTime}>{timeTitleText}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ClosingScheduleHeader groupList={groupList} />
      <SwipeListView
        data={groupList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(data, rowMap) => renderListItem(data, rowMap)}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <Text style={styles.rowText}> </Text>
            <TouchableHighlight
              onPress={() => confirmDelete(rowMap, data.item.id)}
              style={styles.leaveButton}
            >
              <Text style={styles.rowText}>나가기</Text>
            </TouchableHighlight>
          </View>
        )}
        disableRightSwipe={true}
        rightOpenValue={-80}
      />
      <ActionButton
        buttonColor="#0099ED"
        size={70}
        renderIcon={() => <AntDesign name="plus" size={25} color="#fff" />}
      >
        <ActionButton.Item
          buttonColor="#0099ED"
          onPress={() => {
            navigate('RegisterGroup');
          }}
        >
          <Text style={styles.actionBtnText}>모임{'\n'}만들기</Text>
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#0099ED"
          onPress={() => {
            navigate('GroupSearch');
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
    fontSize: 15
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
    justifyContent: 'space-between'
  },
  rowText: {
    color: '#FFFFFF',
    fontFamily: 'scdreamBold'
  },
  leaveButton: {
    width: 80,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
