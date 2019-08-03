import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GroupMap(props) {
  return (
    <View style={styles.container}>
      <Text>GroupMap</Text>
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
