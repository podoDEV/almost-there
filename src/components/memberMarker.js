import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default class MemberMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (
      this.props.region == null ||
      this.props.region.latitude == null ||
      this.props.region.longitude == null
    ) {
      return null;
    }

    if (this.props.markerState == null || !this.props.markerState) {
      return (
        <Marker
          coordinate={{
            latitude: this.props.region.latitude,
            longitude: this.props.region.longitude
          }}
          centerOffset={{ x: 0, y: -30 }}
          style={styles.marker}
        >
          <View style={styles.markerView}>
            <Image style={styles.markerImage} source={{ uri: this.props.profileImageUrl }} />
            <View style={styles.markerTextView}>
              <Text style={styles.markerText}>{this.props.name}</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.point}></View>
        </Marker>
      );
    } else {
      return (
        <Marker
          coordinate={{
            latitude: this.props.region.latitude,
            longitude: this.props.region.longitude
          }}
          centerOffset={{ x: 0, y: -10 }}
          style={styles.marker}
        >
          <Ionicons name="md-star" size={45} color="#0099ED" style={styles.destination} />
          <View style={styles.line}></View>
          <View style={styles.point}></View>
        </Marker>
      );
    }
  }
}

const styles = StyleSheet.create({
  marker: {
    flex: 1,
    overflow: 'hidden'
  },
  markerView: {
    flexDirection: 'row'
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0099ED',
    zIndex: 100
  },
  markerTextView: {
    height: 25,
    borderWidth: 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftColor: 'transparent',
    paddingLeft: 2,
    paddingRight: 7,
    paddingVertical: 2,
    left: -4,
    borderColor: '#0099ED',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    position: 'relative',
    flexDirection: 'row',
    zIndex: 10
  },
  markerText: {
    color: '#000'
  },
  destination: {
    width: 47,
    height: 49,
    bottom: -18,
    paddingLeft: 3,
    flexDirection: 'row',
    position: 'relative'
  },
  line: {
    width: 21,
    height: 12,
    borderRightColor: '#0099ED',
    borderRightWidth: 2,
    borderBottomRightRadius: -2
  },
  point: {
    marginLeft: 18,
    width: 3,
    height: 3,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#0099ED'
  }
});
