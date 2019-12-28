import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';

export default class PlaceMarker extends React.Component {
  render() {
    const { region, afterSelectPlace, name } = this.props;

    if (region === null || region.latitude === null || region.longitude === null) {
      return null;
    }

    return (
      <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude
        }}
        centerOffset={{ x: 0, y: -30 }}
        onPress={(e) => afterSelectPlace(e.nativeEvent.coordinate, name)}
      >
        <View style={styles.markerView}>
          <View style={styles.markerTextView}>
            <Text style={styles.markerText}>{this.props.name}</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.point}></View>
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  markerView: {
    flexDirection: 'row'
  },
  markerTextView: {
    marginLeft: 19,
    borderWidth: 2,
    borderRadius: 20,
    padding: 2,
    borderColor: '#0099ED',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center'
  },
  markerText: {
    color: '#000'
  },
  line: {
    width: 21,
    height: 12,
    borderRightColor: '#0099ED',
    borderRightWidth: 2,
    borderBottomRightRadius: -2,
    alignSelf: 'center'
  },
  point: {
    marginLeft: 19,
    width: 3,
    height: 3,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#0099ED',
    alignSelf: 'center'
  }
});
