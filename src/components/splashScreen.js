import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function RegisterName(props) {
  const { navigation } = props;

  return (
    <View style={styles.splash}>
      <Text>splashScreen</Text>
      <Button title="go registerName" onPress={() => navigation.navigate('RegisterName')} />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});
