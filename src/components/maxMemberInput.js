import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function MaxMemberInput(props) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.text}
        value={props.maxMemberCnt}
        onChangeText={(text) => {
          props.setMaxMemberCnt(text);
        }}
        keyboardType="numeric"
      />
      <Text style={styles.text}> 명</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    alignContent: 'center'
  },
  text: {
    fontSize: 19,
    fontFamily: 'scdream',
    borderWidth: 0
  }
});
