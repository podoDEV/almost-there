import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '../layout';

const sizes = [10, 20, 40, 23, 35, 95, 100, 150, 33];

export default function RegisterName(props) {
  const [fontSizeList, setFontSizeList] = useState([10]);
  const { navigation } = props;

  useEffect(() => {
    if (fontSizeList.length === 10) {
      setTimeout(() => {
        navigation.navigate('RegisterName');
      }, 500);
    } else {
      setTimeout(() => {
        setFontSizeList([...fontSizeList, sizes[fontSizeList.length]]);
      }, 200);
    }
  });

  return (
    <Layout>
      <View style={styles.splash}>
        {fontSizeList.map((size) => (
          <Text
            key={`key_${size}_jinzza`}
            style={{
              fontFamily: 'scdreamBold',
              fontSize: size,
              color: '#fff',
              position: 'absolute'
              // top: size / 10,
              // left: size / 10
            }}
          >
            진짜
          </Text>
        ))}
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
