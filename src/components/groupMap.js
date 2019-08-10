import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Layout } from '../layout';
import Navigation from './navigation';
import Map from './map';

export default function GroupMap(props) {
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
