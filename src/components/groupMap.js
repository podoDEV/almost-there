import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '../layout';
import * as url from '../apiUrl';
import Navigation from './navigation';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function GroupMap(props) {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    fetch(url.getMembers(), { method: 'GET' })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        setMembers(resJson);
      });
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <Navigation />
        <View style={styles.mapContainer}>
          <Text>GOOGLE MAP AREA</Text>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1
  }
});
