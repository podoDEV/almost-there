import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';
import ActionButton from 'react-native-action-button';
import { Layout } from '../layout';
import { AntDesign } from '@expo/vector-icons';
import { getSchedule } from '../time';

export default function GroupSearch(props) {
  const { navigate } = useNavigation();
  const [inputValue, setInputValue] = useState(null);
  const [myInfo, setMyInfo] = useState(null);
  const [groupCode, setGroupCode] = useState(null);
  const [groupInfoByGroupCode, setGroupInfoByGroupCode] = useState(null);
  const { accessToken } = useContext(GlobalContext);
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  useEffect(() => {
    fetch(url.membersMe(), options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resJson) => {
        setMyInfo(resJson);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(url.getGroup(groupCode), options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resJson) => {
        setGroupInfoByGroupCode(resJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [groupCode]);

  const addUserToGroup = () => {
    const joinGroupOptions = {
      method: 'POST',
      body: JSON.stringify({
        code: groupCode
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
    fetch(url.joinGroup(myInfo.id), joinGroupOptions)
      .then((res) => {
        if (res.status === 200) {
          console.log('success to add a new user to group');
          navigate('GroupList');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Layout>
      <View style={groupListStyle.container}>
        <View style={groupListStyle.groupCode}>
          <Text style={groupListStyle.groupCodeTitle}>모임 코드 입력</Text>
          <View style={groupListStyle.groupCodeInputContainer}>
            <TextInput
              style={groupListStyle.groupCodeInput}
              editable
              autoFocus={true}
              autoCapitalize={'none'}
              allowFontScaling={false}
              onChangeText={(value) => {
                setInputValue(value);
              }}
            />
            <AntDesign
              name={'arrowright'}
              size={15}
              color="#31ACF1"
              onPress={() => setGroupCode(inputValue)}
            />
          </View>
        </View>
        {groupInfoByGroupCode && (
          <View style={groupListStyle.groupInfo}>
            <View style={groupListStyle.groupName}>
              <Text style={groupListStyle.groupNameTile}>{groupInfoByGroupCode.name}</Text>
              <Text style={groupListStyle.groupMemberNumber}>
                {groupInfoByGroupCode.memberCount}
              </Text>
            </View>
            <View style={groupListStyle.groupLocation}>
              <Text style={groupListStyle.groupLocationTitle}>모임장소</Text>
              <Text style={groupListStyle.groupLocationName}>
                {groupInfoByGroupCode.destination.name}
              </Text>
            </View>
            <View style={groupListStyle.groupTime}>
              <Text style={groupListStyle.groupTimeTitle}>모임시간</Text>
              <Text style={groupListStyle.groupTimeText}>
                {getSchedule(groupInfoByGroupCode.schedule).dayTitleText}
              </Text>
            </View>
          </View>
        )}
        {groupInfoByGroupCode && (
          <ActionButton
            buttonColor="#0099ED"
            buttonText="참가"
            buttonTextStyle={{
              marginTop: 4,
              fontSize: 17,
              fontFamily: 'scdreamBold',
              textAlign: 'center'
            }}
            onPress={() => {
              addUserToGroup();
            }}
            size={70}
          />
        )}
      </View>
    </Layout>
  );
}

const groupListStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  groupCode: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1
  },
  groupCodeTitle: {
    color: '#31ACF1',
    fontFamily: 'scdreamBold',
    fontSize: 14,
    marginBottom: 15
  },
  groupCodeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  groupCodeInput: {
    height: 22,
    width: 200,
    fontFamily: 'scdream',
    fontSize: 19,
    color: 'rgb(74, 74, 74)'
  },
  groupInfo: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15
  },
  groupName: {
    flexDirection: 'row',
    marginBottom: 27
  },
  groupNameTile: {
    color: '#31ACF1',
    fontFamily: 'scdreamBold',
    fontSize: 19,
    marginRight: 9
  },
  groupMember: {
    marginBottom: 34
  },
  groupMemberNumber: {
    fontFamily: 'scdream',
    fontSize: 18
  },
  groupMemberText: {
    color: '#31ACF1',
    fontFamily: 'scdreamBold',
    fontSize: 12
  },
  groupMemberItem: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  groupMemberItemName: {
    fontSize: 16,
    paddingTop: 12,
    fontFamily: 'scdream'
  },
  groupLocation: {
    flexDirection: 'column',
    marginBottom: 30
  },
  groupLocationTitle: {
    color: '#31ACF1',
    fontFamily: 'scdreamBold',
    fontSize: 12
  },
  groupLocationName: {
    fontSize: 16,
    paddingTop: 12,
    fontFamily: 'scdream'
  },
  groupTime: {
    width: '50%',
    flexDirection: 'column'
  },
  groupTimeTitle: {
    color: '#31ACF1',
    fontFamily: 'scdreamBold',
    fontSize: 12
  },
  groupTimeText: {
    fontSize: 16,
    paddingTop: 12,
    fontFamily: 'scdream'
  },
  createButton: {
    backgroundColor: '#31ACF1',
    width: 50
  }
});
