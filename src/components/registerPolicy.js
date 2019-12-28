import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import Policy from './policy';

// @TODO: 이미지 웹펙에서 base64로 바꿀 수 있는지. 바꿔주는 지
const checkImage = require('../../assets/check.png');
const uncheckImage = require('../../assets/uncheck.png');
const allCheckImage = require('../../assets/check_all.png');
const allUncheckImage = require('../../assets/uncheck_all.png');

export default function RegisterPolicy() {
  const { navigate } = useNavigation();
  const [locationAgree, setLocationAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [allAgree, setAllAgree] = useState(false);

  const moveRegisterName = () => {
    if (!locationAgree || !privacyAgree) {
      return;
    }

    navigate('RegisterName');
  };

  useEffect(() => {
    if (!locationAgree || !privacyAgree) {
      setAllAgree(false);
    } else if (locationAgree && privacyAgree) {
      setAllAgree(true);
    }
  }, [locationAgree, privacyAgree]);

  const toggleAgree = (type) => {
    if (type === 'location') {
      setLocationAgree(!locationAgree);
    } else if (type === 'privacy') {
      setPrivacyAgree(!privacyAgree);
    } else if (type === 'all') {
      setPrivacyAgree(!allAgree);
      setLocationAgree(!allAgree);
    }
  };

  const renderPolicyArea = (type) => {
    const title = type === 'location' ? '위치기반서비스 이용약관' : '개인정보처리방침';
    const agreeType = type === 'location' ? locationAgree : privacyAgree;
    const borderStyle =
      type === 'location' ? [styles.borderBottom] : [styles.borderTop, styles.borderBottom];

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.policyTitleContainer, ...borderStyle]}>
          <Text style={styles.policyTitleText}>{title}</Text>
          <TouchableOpacity style={styles.checkBtn} onPress={() => toggleAgree(type)}>
            <Image style={styles.checkBtnImage} source={agreeType ? checkImage : uncheckImage} />
          </TouchableOpacity>
        </View>
        <Policy type={type} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitleText}>
        잠깐!
        {'\n'}
        시작 전 확인해주세요
      </Text>
      <View style={styles.policyContainer}>
        {renderPolicyArea('location')}
        {renderPolicyArea('privacy')}
      </View>
      <TouchableOpacity style={styles.agreeAllBtnContainer} onPress={() => toggleAgree('all')}>
        <Image
          style={[styles.checkBtnImage, { marginRight: 10 }]}
          source={allAgree ? allCheckImage : allUncheckImage}
        />
        <Text style={styles.agreeAllText}>모두 동의</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.finishBtnContainer} onPress={moveRegisterName}>
        {locationAgree && privacyAgree && <Text style={styles.finishText}>동의합니다</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#0099ED',
    paddingTop: 80,
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  pageTitleText: {
    flex: 1,
    fontFamily: 'scdream',
    fontSize: 29,
    color: '#fff',
    textAlign: 'center'
  },
  finishBtnContainer: {
    alignItems: 'center',
    flex: 1
  },
  finishText: {
    marginTop: 10,
    fontFamily: 'scdreamBold',
    fontSize: 29,
    fontWeight: 'bold',
    color: '#fff'
  },
  agreeAllBtnContainer: {
    justifyContent: 'flex-end',
    alignContent: 'center',
    flexDirection: 'row'
  },
  agreeAllText: {
    fontFamily: 'scdream',
    color: '#fff',
    fontSize: 19
  },
  policyContainer: {
    flex: 6,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10
  },
  policyTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'rgb(213, 213, 213)'
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(213, 213, 213)'
  },
  policyTitleText: {
    fontFamily: 'scdream',
    color: 'rgb(74, 74, 74)',
    fontSize: 19
  },
  checkBtn: {
    width: 22,
    height: 22
  },
  checkBtnImage: {
    width: 22,
    height: 22
  }
});
