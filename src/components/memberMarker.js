import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class MemberMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Marker
        coordinate={{
          latitude: this.props.region.latitude,
          longitude: this.props.region.longitude
        }}
      >
        <View style={styles.markerView}>
          <Image
            style={styles.markerImage}
            source={{ uri: 'https://avatars2.githubusercontent.com/u/35371660?s=460&v=4' }}
          />
          <Text>{this.props.name}</Text>
        </View>
      </Marker>
    );
  }
}

const styles = StyleSheet.create({
  markerView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  markerImage: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  markerText: {
    color: '#000'
  }
});
