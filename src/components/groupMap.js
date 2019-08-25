import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '../layout';
import * as url from '../apiUrl';
import Navigation from './navigation';
import Map from './map';

export default function GroupMap(props) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(url.getMembers(), { method: 'GET' })
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        // setMembers(resJson);
      });
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map />
        </View>
        <Navigation />
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
