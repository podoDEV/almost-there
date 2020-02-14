import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import Policy from './policy';

const allCheckImage = require('../../assets/check_all.png');
const allUncheckImage = require('../../assets/uncheck_all.png');

export default function RegisterPolicy() {
  const { navigate } = useNavigation();
  const [agree, setAgree] = useState(false);
  const [policyType, setPolicyType] = useState(null);

  const moveRegisterName = () => {
    if (!agree) {
      Alert.alert('흐음!', '동의해야 가입할 수 있어요ㅠㅠ😢');
      return;
    }

    navigate('RegisterName');
  };

  const renderPolicy = () => {
    // @TODO: 디자인 반영 필요
    return (
      <View style={styles.policyArea}>
        <TouchableOpacity
          style={{ paddingHorizontal: 10, paddingTop: 5 }}
          onPress={() => setPolicyType(null)}
        >
          <Ionicons name={'ios-close'} size={25} color="#111" />
        </TouchableOpacity>
        <Policy type={policyType} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {policyType && renderPolicy()}
      <View style={styles.pageTitleArea}>
        {/* @TODO: 눈 이미지 추가해야함 */}
        {/* <Image style={styles.eyeImage} source={allCheckImage} /> */}
        <Text style={{ fontFamily: 'scdreamBold', fontSize: 96, color: '#fff', marginBottom: 20 }}>
          @_@
        </Text>
        <Text style={styles.pageTitleText}>시작 전 확인해주세요</Text>
      </View>
      <View style={styles.finishBtnArea}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.agreeAllBtnContainer} onPress={() => setAgree(!agree)}>
            <Image
              style={[styles.checkBtnImage, { marginRight: 10 }]}
              source={agree ? allCheckImage : allUncheckImage}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={() => setAgree(!agree)}>
              <Text style={styles.agreeAllText}>서비스 이용 약관에 동의합니다.</Text>
            </TouchableOpacity>
            <View style={styles.policyContainer}>
              <TouchableOpacity onPress={() => setPolicyType('location')}>
                <Text style={styles.policyText}>위치 기반 서비스 이용약관</Text>
              </TouchableOpacity>
              <Text style={styles.policyText}>{', '}</Text>
              <TouchableOpacity onPress={() => setPolicyType('privacy')}>
                <Text style={styles.policyText}>개인정보처리 방침</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.finishBtnContainer, agree && styles.agreedBtnContainer]}
          onPress={moveRegisterName}
        >
          <Text style={[styles.finishText, agree && styles.agreedText]}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099ED',
    paddingBottom: 25
  },
  pageTitleArea: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  eyeImage: {
    width: 218,
    height: 110
  },
  pageTitleText: {
    fontFamily: 'scdream',
    fontSize: 34,
    color: '#fff'
  },
  finishBtnArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 15
  },
  finishBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    height: 50,
    marginTop: 15
  },
  finishText: {
    fontFamily: 'scdreamBold',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  agreeAllBtnContainer: {
    justifyContent: 'flex-end',
    alignContent: 'center',
    flexDirection: 'row'
  },
  agreedBtnContainer: {
    backgroundColor: '#fff'
  },
  agreedText: {
    color: '#0099ED'
  },
  agreeAllText: {
    fontFamily: 'scdream',
    color: '#fff',
    fontSize: 19
  },
  policyContainer: {
    flexDirection: 'row',
    marginTop: 5
  },
  checkBtn: {
    width: 22,
    height: 22
  },
  checkBtnImage: {
    width: 22,
    height: 22
  },
  policyText: {
    fontFamily: 'scdream',
    fontSize: 12,
    color: '#fff'
  },
  policyArea: {
    height: '80%',
    width: '100%',
    position: 'absolute',
    overflow: 'scroll',
    zIndex: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.85)'
  }
});
