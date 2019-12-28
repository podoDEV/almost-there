import React from 'react';
import { StyleSheet, Dimensions, Keyboard, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import * as url from '../apiUrl';
import PlaceMarker from './placeMarker';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

export default class SearchPlace extends React.Component {
  mapRef = React.createRef();
  state = {
    search: '',
    placeList: null
  };

  searchPlace = () => {
    const placeName = this.state.search;
    if (placeName.length < 2) {
      return;
    }
    Keyboard.dismiss();

    const options = { method: 'GET' };
    fetch(url.getPlaceLocations('AIzaSyC_HtoXyZcvzt_zTFGlfC9isYDlwwp86E8', placeName), options)
      .then((res) => res.json())
      .then((resJson) => {
        const placeList = [];

        resJson.results.forEach((element) => {
          const name = element.name;
          const { lat, lng } = element.geometry.location;

          const region = {
            latitude: lat,
            longitude: lng
          };

          placeList.push({ name, region });
        });

        if (placeList.length > 0) {
          const latitude = placeList[0].region.latitude;
          const longitude = placeList[0].region.longitude;

          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          };

          this.mapRef.current.animateToRegion(newRegion, 500);

          this.setState({ placeList: placeList });
        } else {
          alert('검색결과 없음');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  afterSelectPlace = (coordinate, name) => {
    this.props.navigation.navigate('RegisterGroup', { coordinate, name });
  };

  render() {
    return (
      <MapView style={styles.map} ref={this.mapRef} followUserLocation={true}>
        <TextInput
          style={{ width: '100%', backgroundColor: 'white', padding: 10, fontSize: 13 }}
          placeholder="장소 검색"
          onChangeText={(text) => {
            this.setState({ search: text });
          }}
          value={this.state.search}
          onSubmitEditing={this.searchPlace}
        />
        {this.state.placeList &&
          this.state.placeList.map((place, idx) => {
            return (
              <PlaceMarker
                key={`place_${idx}`}
                region={place.region}
                name={place.name}
                afterSelectPlace={this.afterSelectPlace}
              />
            );
          })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});
