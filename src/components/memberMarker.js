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
        >
          <View style={styles.markerView}>
            {/* markerTextView가 앞에 있는 이유는 absolute 사용시 RN이 뒤에 있는 컴포넌트를 위로 올리기 때문에 */}
            <View style={styles.markerTextView}>
              <Text style={styles.markerText}>{this.props.name}</Text>
            </View>
            <Image
              style={styles.markerImage}
              source={{ uri: 'https://avatars2.githubusercontent.com/u/35371660?s=460&v=4' }}
            />
          </View>
          <View style={styles.line}></View>
          <View style={styles.point}></View>
        </Marker>
      );
    } else {
      console.log(this.props.region.latitude, this.props.region.longitude);
      return (
        <Marker
          coordinate={{
            latitude: this.props.region.latitude,
            longitude: this.props.region.longitude
          }}
          centerOffset={{ x: 0, y: -10 }}
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
  markerView: {
    flexDirection: 'row'
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0099ED'
  },
  markerTextView: {
    height: 25,
    borderWidth: 2,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftColor: 'transparent',
    padding: 2,
    marginLeft: 36,
    borderColor: '#0099ED',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    position: 'absolute'
  },
  markerText: {
    color: '#000'
  },
  destination: {
    width: 47,
    height: 49,
    bottom: 0,
    paddingLeft: 3,
    position: 'absolute'
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
