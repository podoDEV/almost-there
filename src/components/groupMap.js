import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '../layout';
import * as url from '../apiUrl';
import Navigation from './navigation';
<<<<<<< HEAD
import Map from './map';
=======
import { SimpleLineIcons } from '@expo/vector-icons';
>>>>>>> 711cb1943479d9b834867e57be5ad6ed61c1be80

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
          <Map />
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
