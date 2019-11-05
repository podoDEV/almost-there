import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';
import Navigation from './navigation';
import ActionButton from 'react-native-action-button';
import { Layout } from '../layout';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function GroupSearch(props) {
  const { navigation } = props;
  const { accessToken } = useContext(GlobalContext);

  const CreateGroup = () => {
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
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>모임 찾기</Text>
        </View>
        <View style={styles.groupCode}>
          <Text style={styles.groupCodeTitle}>모임 코드 입력</Text>
          <View style={styles.groupCodeInputContainer}>
            <TextInput
              style={styles.groupCodeInput}
              editable
              autoFocus={true}
              autoCapitalize={'none'}
              allowFontScaling={false}
            />
            <AntDesign
              name={'arrowright'}
              size={15}
              color="#31ACF1"
              style={styles.groupCodeInputIcon}
            />
          </View>
        </View>
        <View style={styles.groupInfo}>
          <View style={styles.groupName}>
            <Text style={styles.groupNameTile}>포도</Text>
            <Text style={styles.groupMemberNumber}>6</Text>
          </View>
          <View style={styles.groupMember}>
            <Text style={styles.groupMemberText}>멤버</Text>
            <View style={styles.groupMemberItem}>
              <Text style={styles.groupMemberItemName}>김자영</Text>
              <Text style={styles.groupMemberItemName}>김자영</Text>
              <Text style={styles.groupMemberItemName}>김자영</Text>
              <Text style={styles.groupMemberItemName}>김자영</Text>
              <Text style={styles.groupMemberItemName}>김자영</Text>
              <Text style={styles.groupMemberItemName}>김자영</Text>
            </View>
          </View>
          <View style={styles.groupDetail}>
            <View style={styles.groupLocation}>
              <Text style={styles.groupLocationTitle}>모임장소</Text>
              <Text style={styles.groupLocationName}>할리스 강남역점 B1층</Text>
            </View>
            <View style={styles.groupTime}>
              <Text style={styles.groupTimeTtile}>모임시간</Text>
              <Text style={styles.groupTimeText}>매주 토요일 11:00 오전</Text>
            </View>
          </View>
        </View>
        <ActionButton
          buttonColor="#0099ED"
          buttonText={'참가'}
          buttonTextStyle={{
            marginTop: 4,
            fontSize: 17,
            fontFamily: 'scdreamBold',
            textAlign: 'center',
            verticalAlign: 'center'
          }}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 50,
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
    fontSize: 17,
    fontFamily: 'scdreamBold'
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
    width: 200
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
    width: '50%',
    fontSize: 16,
    paddingTop: 12,
    fontFamily: 'scdream'
  },
  groupDetail: {
    flexDirection: 'row'
  },
  groupLocation: {
    width: '50%',
    flexDirection: 'column'
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
  groupTimeTtile: {
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
