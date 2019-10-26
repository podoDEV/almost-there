import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Layout } from '../layout';

export default function Setting(props) {
  return (
    <Layout>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.pageTitle}>
          <Text style={styles.pageTitleText}>설정</Text>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemInnerContainer}>
            <Text style={styles.itemTitle}>내 계정</Text>
            <View style={styles.itemUserInfoContainer}>
              <Text style={styles.itemUserInfoText}>김자영</Text>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="rgb(155,155,155)" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.underline}></View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemInnerContainer}>
            <Text style={styles.itemTitle}>정보</Text>
            <View style={styles.itemUserInfoContainer}>
              <Text style={styles.itemUserInfoText}>진짜 다와가 1.0</Text>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="rgb(155,155,155)" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemInnerContainer}>
            <Text style={styles.itemTitle}>알림</Text>
            <View style={styles.itemUserInfoContainer}>
              <Text style={styles.itemUserInfoText}>푸쉬 알림 ON</Text>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="rgb(155,155,155)" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.underline}></View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemInnerContainer}>
            <Text style={styles.itemTitle}>이용약관 및 서비스 해지</Text>
            <View style={styles.itemUserInfoContainer}>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="rgb(155,155,155)" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemInnerContainer}>
            <Text style={styles.itemTitle}>개인 정보 처리 방침</Text>
            <View style={styles.itemUserInfoContainer}>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="rgb(155,155,155)" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemInnerContainer}>
            <Text style={styles.itemTitle}>위치 기반 서비스 이용약관</Text>
            <View style={styles.itemUserInfoContainer}>
              <MaterialIcons name="keyboard-arrow-right" size={30} color="rgb(155,155,155)" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  underline: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  container: {
    flex: 1,
    alignContent: 'center'
  },
  pageTitle: {
    width: '100%',
    paddingTop: 55,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 11,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 153, 237, 1)',
    zIndex: 100
  },
  pageTitleText: {
    fontFamily: 'scdreamBold',
    fontSize: 17,
    color: '#fff'
  },
  itemContainer: {
    height: 75,
    paddingLeft: 20,
    paddingRight: 15
  },
  itemInnerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontFamily: 'scdream',
    fontSize: 19,
    color: 'rgb(74, 74, 74)'
  },
  itemUserInfoContainer: { flexDirection: 'row', alignItems: 'center' },
  itemUserInfoText: {
    fontFamily: 'scdreamBold',
    fontSize: 16,
    color: 'rgb(0, 153, 237)'
  }
});
