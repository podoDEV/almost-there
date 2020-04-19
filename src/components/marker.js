import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { isExistProfilePhoto } from '../common';

export default function(props) {
  const { region, destination, name, profileImageUrl, color } = props;

  if (region === null || region.latitude === null || region.longitude === null) {
    return null;
  }

  if (destination) {
    return (
      <Marker coordinate={{ ...region }} centerOffset={{ x: 0, y: -30 }} style={styles.marker}>
        <View style={styles.markerView}>
          <Ionicons name="md-star" size={45} color="#0099ED" style={styles.destination} />
        </View>
        <View style={styles.pointer}>
          <View style={styles.line}></View>
          <View style={styles.point}></View>
        </View>
      </Marker>
    );
  }

  const existPhoto = isExistProfilePhoto(profileImageUrl);
  const borderStyle = { borderColor: color, borderRightColor: color };
  const backgroundStyle = { backgroundColor: color };

  return (
    <Marker coordinate={{ ...region }} centerOffset={{ x: 0, y: -25 }} style={styles.marker}>
      <View style={styles.markerView}>
        {existPhoto ? (
          <Image style={[styles.markerImageArea, borderStyle]} source={{ uri: profileImageUrl }} />
        ) : (
          <Text style={[styles.markerImageArea, borderStyle, backgroundStyle]}>
            {name.slice(0, 2)}
          </Text>
        )}
      </View>
      <View style={styles.pointer}>
        <View style={[styles.line, borderStyle]}></View>
        <View style={[styles.point, borderStyle]}></View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    flex: 1
  },
  markerView: {
    flex: 1
  },
  markerImageArea: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0099ED',
    color: '#fff',
    overflow: 'hidden',
    lineHeight: 40,
    textAlign: 'center',
    fontFamily: 'scdreamBold'
  },
  destination: {
    bottom: -18
  },
  pointer: {
    flex: 1,
    alignItems: 'center'
  },
  line: {
    height: 12,
    borderRightColor: '#0099ED',
    borderRightWidth: 2,
    borderBottomRightRadius: -2
  },
  point: {
    width: 3,
    height: 3,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#0099ED'
  }
});
