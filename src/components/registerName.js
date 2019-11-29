import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';

export default function RegisterName(props) {
  const { navigation } = props;
  const [name, setName] = useState('');
  const userInfo = useContext(GlobalContext);

  async function handlePressIcon() {
    console.log('click!');
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          name,
          uuid: userInfo.uuid
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(url.postMembers(), options)
        .then((res) => res.json())
        .then((resJson) => {
          const {
            member: { id, name },
            accessToken
          } = resJson;

          userInfo.accessToken = accessToken;
          userInfo.id = id;
          userInfo.name = name;

          AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
        })
        .then(() => {
          const code = '32E550';
          const joinGroupOptions = {
            method: 'POST',
            body: JSON.stringify({
              code
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.accessToken}`
            }
          };
          fetch(url.joinGroup(userInfo.id), joinGroupOptions)
            .then((res) => res.json())
            .then(() => {
              navigation.navigate('RegisterPhoto');
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
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
    fontFamily: 'scdream',
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
