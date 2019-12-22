import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { SimpleLineIcons } from '@expo/vector-icons';
import { headerStyles } from '../styles/header';
import Navigation from '../components/navigation';
import * as url from '../apiUrl';
import { GlobalContext } from '../context';

export const myListHeader = () => {
  const { navigate } = useNavigation();

  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.headerTitle}>나의 리스트</Text>
      <SimpleLineIcons
        name="settings"
        size={20}
        color="#fff"
        onPress={() => navigate('Settings')}
      />
    </View>
  );
};

export const groupMapHeader = (navigation) => {
  const [groupInfo, setGroupInfo] = useState(null);
  const { accessToken } = useContext(GlobalContext);
  useEffect(() => {
    fetch(url.getGroup(1), {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resJson) => {
        setGroupInfo(resJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Navigation groupInfo={groupInfo} navigation={navigation} />
    </View>
  );
};
