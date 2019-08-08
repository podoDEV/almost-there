import React, { useState } from 'react';
import { Layout } from '../layout';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function RegisterName(props) {
  const { navigation } = props;
  const [name, setName] = useState('');

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>그냥 이름만</Text>
        <TextInput style={styles.nameInput} onChangeText={(text) => setName(text)} value={name} />
        <Button color="white" title="완료👉" onPress={() => navigation.navigate('GroupMap')} />
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
  nameInput: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    fontSize: 25,
    padding: 10,
    marginLeft: 23,
    marginRight: 23,
    textAlign: 'center',
    marginBottom: 15
  }
});
