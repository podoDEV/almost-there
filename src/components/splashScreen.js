import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import LottieView from 'lottie-react-native';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';

export default function RegisterName(props) {
  const { navigation } = props;
  const userInfo = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      getUserSession();
    }, 2000);
  }, []);

  function login() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        uuid: userInfo.uuid
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(url.login(), options)
      .then((res) => res.json())
      .then((resJson) => {
        const { accessToken } = resJson;
        userInfo.accessToken = accessToken;
        AsyncStorage.setItem('ACCESS_TOKEN', accessToken, () => {
          navigation.navigate('GroupList');
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function getUserSession() {
    const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      fetch(url.membersMe(), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            navigation.navigate('RegisterName');
          }
        })
        .then((resJson) => {
          const { name, id } = resJson;
          userInfo.name = name;
          userInfo.id = id;
          userInfo.accessToken = accessToken;
          AsyncStorage.setItem('ACCESS_TOKEN', accessToken, () => {
            navigation.navigate('GroupList');
          });
        })
        .catch((err) => {
          console.log('need to register name', err);
        });
    } else {
      const { uuid } = userInfo;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(url.getMembers(uuid), options)
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.length) {
            const { name, id } = resJson[0];
            userInfo.name = name;
            userInfo.id = id;
            login();
          } else {
            navigation.navigate('RegisterName');
          }
        });
    }
  }

  return (
    <View style={styles.splash}>
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        style={{
          flex: 1
        }}
        source={require('../../assets/lottie/splash.json')}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#0099ED'
  }
});
