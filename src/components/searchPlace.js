import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  Keyboard,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import MapView from 'react-native-maps';
import * as url from '../apiUrl';
import MemberMarker from './memberMarker';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.008;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

export default function SearchPlace() {
  const [search, setSearch] = useState('');
  const [placeList, setPlaceList] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapRef, setMapRef] = useState(() => createRef());
  const { navigate, goBack } = useNavigation();

  const searchPlace = () => {
    const placeName = search;
    if (placeName.length < 2) {
      return;
    }
    Keyboard.dismiss();

    const options = { method: 'GET' };
    const KEY = 'AIzaSyC_HtoXyZcvzt_zTFGlfC9isYDlwwp86E8';
    fetch(url.getPlaceLocations(KEY, placeName), options)
      .then((res) => res.json())
      .then((resJson) => {
        const placeList = [];

        resJson.results.forEach((element) => {
          const address = element.formatted_address;
          const name = element.name;
          const { lat, lng } = element.geometry.location;

          const region = {
            latitude: lat,
            longitude: lng
          };

          placeList.push({ name, region, address });
        });

        if (placeList.length) {
          setPlaceList(placeList);
        } else {
          alert('검색결과 없음');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const afterSelectPlace = (coordinate, name) => {
    navigate('RegisterGroup', { coordinate, name });
  };

  const applySelectedPlace = (place) => {
    const { latitude, longitude } = place.region;
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };

    mapRef.current.animateToRegion(newRegion, 500);
    setSelectedPlace(place);
    setPlaceList(null);
  };

  const renderSearchInputHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtnContainer} onPress={() => goBack()}>
          <MaterialIcons name="keyboard-arrow-left" color="#FFF" size={25} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="장소를 검색하세요"
          placeholderTextColor="#fff"
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
          onSubmitEditing={searchPlace}
        />
        <TouchableOpacity style={styles.maginifyContainer} onPress={searchPlace}>
          <MaterialCommunityIcons name="magnify" color="#FFF" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSelectedPlaceHeader = () => {
    const { name, coordinate } = selectedPlace;

    return (
      <View style={{ height: 130, padding: 15, backgroundColor: '#0099ED' }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtnContainer} onPress={() => goBack()}>
            <MaterialIcons name="keyboard-arrow-left" color="#FFF" size={25} />
          </TouchableOpacity>
          <Text style={styles.selectedPlaceText}>{name}</Text>
        </View>
        <TouchableOpacity
          style={styles.selectPlaceBtn}
          onPress={() => afterSelectPlace(coordinate, name)}
        >
          <Text style={styles.selectPlaceBtnText}>모임 장소로 선택</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {selectedPlace ? renderSelectedPlaceHeader() : renderSearchInputHeader()}
      {placeList && (
        <ScrollView style={{ height: '100%', backgroundColor: '#fff' }}>
          {placeList.map((place, idx) => {
            return (
              <TouchableOpacity
                style={styles.placeInfoContainer}
                onPress={() => applySelectedPlace(place)}
                key={`${place.name}_${idx}`}
              >
                <Text style={styles.placeNameText}>{place.name}</Text>
                <Text style={styles.placeAddressText}>{place.address}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <MapView style={styles.map} ref={mapRef} followUserLocation={true}>
        {/* @TODO: 아니 이게 왜 membermarker야  */}
        {selectedPlace && (
          <MemberMarker
            region={selectedPlace.region}
            name={selectedPlace.name}
            markerState={true}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  header: {
    height: 60,
    backgroundColor: '#0099ED',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    height: 60,
    fontSize: 22,
    backgroundColor: '#0099ED',
    color: '#fff',
    width: '80%',
    fontFamily: 'scdream'
  },
  backBtnContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'center'
  },
  maginifyContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'center'
  },
  placeInfoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  placeNameText: {
    fontFamily: 'scdreamBold',
    color: '#0099ED',
    fontSize: 16,
    marginBottom: 9
  },
  placeAddressText: {
    fontFamily: 'scdream',
    color: 'rgb(74, 74, 74)',
    fontSize: 14
  },
  selectedPlaceText: {
    flex: 9,
    fontFamily: 'scdreamBold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'left'
  },
  selectPlaceBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20
  },
  selectPlaceBtnText: {
    flex: 1,
    fontFamily: 'scdreamBold',
    fontSize: 16,
    color: '#0099ED',
    textAlign: 'center',
    paddingVertical: 12
  }
});
