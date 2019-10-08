import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EditGroup(props) {
  return (
    <View style={styles.inputContainer}>
      <Text>10 명</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1
  }
});
