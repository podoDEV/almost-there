import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '../layout';

export default function RegisterName(props) {
  const { navigation } = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('RegisterName');
    }, 500);
  }, []);

  return (
    <Layout>
      <View style={styles.splash}>
        <Text>진짜</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099ED',
    color: '#fff'
  }
});
