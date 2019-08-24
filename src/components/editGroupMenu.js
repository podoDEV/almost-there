import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout } from '../layout';
import Navigation from './navigation';
import Map from './map';

export default function EditGroupMenu(props) {
  useEffect(() => {
    // @TODO: 해당 멤버 정보 prop으로 넘겨주기
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
