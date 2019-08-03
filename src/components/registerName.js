import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function RegisterName(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>RegisterName</Text>
      <Button title="go registerName" onPress={() => navigation.navigate('SplashScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
});
