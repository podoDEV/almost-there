import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import * as url from '../apiUrl';

export default function RegisterName(props) {
  const [test, setTest] = useState(null);
  const { navigation } = props;
  useEffect(() => {
    fetch(url.test(), { method: 'GET' })
      .then((res) => res.json())
      .then((resJson) => {
        setTest(resJson.result);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <View style={styles.splash}>
      <Text>HELLO</Text>
      {test ? (
        test.map((elem) => {
          return (
            <Text key={elem.name}>
              {elem.age}, {elem.name}
            </Text>
          );
        })
      ) : (
        <ActivityIndicator size="small" color="#0099ED" />
      )}
      <Button title="go registerName" onPress={() => navigation.navigate('RegisterName')} />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
