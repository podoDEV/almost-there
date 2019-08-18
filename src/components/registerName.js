import React, { useState, useEffect, useContext } from 'react';
import { Layout } from '../layout';
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';

export default function RegisterName(props) {
  const { navigation } = props;
  const [name, setName] = useState('');
  const userInfo = useContext(GlobalContext);

  useEffect(() => {
    getUserSession();
  }, []);

  async function getUserSession() {
    const userName = await AsyncStorage.getItem('USER_NAME');
    if (userName) {
      userInfo.name = await userName;
      await navigation.navigate('GroupMap');
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
            navigation.navigate('GroupMap');
          }
        });
    }
  }

  async function handlePressIcon() {
    try {
      fetch(url.postMembers(), {
        method: 'POST',
        body: JSON.stringify({
          name,
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
          const { id, name } = resJson;
          userInfo.id = id;
          userInfo.name = name;
          navigation.navigate('GroupMap');
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      // @TODO: 에러 팝업!
      console.error(err);
    }
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>그냥 이름만</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.nameInput} onChangeText={(text) => setName(text)} value={name} />
          <MaterialCommunityIcons
            style={styles.icon}
            name="arrow-right"
            size={20}
            color="#fff"
            onPress={handlePressIcon}
          />
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#0099ED'
  },
  title: {
    color: '#fff',
    fontFamily: 'scdream',
    textAlign: 'center',
    fontSize: 29
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    marginLeft: 23,
    marginRight: 23
  },
  nameInput: {
    flex: 9,
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 5,
    paddingLeft: 25
  },
  icon: {
    flex: 1
  }
});
