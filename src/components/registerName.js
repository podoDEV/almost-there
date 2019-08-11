import React, { useState, useEffect, useContext } from 'react';
import { Layout } from '../layout';
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../context';

export default function RegisterName(props) {
  const { navigation } = props;
  const [name, setName] = useState('');
  const userInfo = useContext(GlobalContext);

  useEffect(() => {
    getUserSession();
  }, []);

  async function getUserSession() {
    const sessionId = await AsyncStorage.getItem('SESSION_ID');
    if (sessionId) {
      userInfo.sessionId = sessionId;
      navigation.navigate('GroupMap');
    }
  }

  async function handlePressIcon() {
    try {
      await AsyncStorage.setItem('SESSION_ID', '1234');
      await navigation.navigate('GroupMap');
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
