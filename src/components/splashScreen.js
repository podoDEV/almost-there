import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { GlobalContext } from '../context';
import { Layout } from '../layout';
import * as url from '../apiUrl';

export default function RegisterName(props) {
  const { navigation } = props;
  const userInfo = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      getUserSession();
    }, 1000);
  }, []);

  function login() {
    fetch(url.login(), {
      method: 'POST',
      body: JSON.stringify({
        uuid: userInfo.uuid
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        const { accessToken } = resJson;
        userInfo.accessToken = accessToken;
        AsyncStorage.setItem('ACCESS_TOKEN', accessToken, () => {
          navigation.navigate('GroupMap');
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
          navigation.navigate('GroupMap');
        })
        .catch((err) => {
          console.log('need to register name', err);
        });
    } else {
      const { uuid } = userInfo;
      fetch(url.getMembers(uuid), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          return res.json();
        })
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
    <Layout>
      <View style={styles.splash}>
        <Text>진짜</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099ED',
    color: '#fff'
  }
});
