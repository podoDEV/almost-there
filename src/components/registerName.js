import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Alert } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RegisterName(props) {
  const { navigate } = useNavigation();
  const [name, setName] = useState('');
  const userInfo = useContext(GlobalContext);

  async function handlePressIcon() {
    if (!name.length || name.length > 10) {
      Alert.alert('흐음!!', '이름은 최소 한글자, 최대 열글자에요!🙋‍♂️');
      return;
    }

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
          navigate('RegisterPhoto');
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
        <TouchableOpacity onPress={handlePressIcon} style={styles.icon}>
          <MaterialCommunityIcons name="arrow-right" size={32} color="#fff" />
        </TouchableOpacity>
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
    fontSize: 34
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginTop: 95,
    marginLeft: 23,
    marginRight: 23,
    paddingBottom: 10
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
    flex: 1,
    textAlign: 'right'
  }
});
