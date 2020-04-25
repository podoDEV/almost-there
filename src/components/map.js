import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Dimensions, Text, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';

import Marker from './marker';
import * as url from '../apiUrl';
import { GlobalContext } from '../context';
import { getThumbColor, debounce } from '../common';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const DEFAULT_PADDING = { top: 200, right: 100, bottom: 100, left: 100 };
const UPDATE_INTERVAL = 10000;
const DEBOUNCE_TIME = 500;

// @TODO:  map load 되고 위치 가져오는 시간 체크
export default function Map(props) {
  const { groupId } = props;
  const [timerId, setTimerId] = useState(null);
  const [members, setMembers] = useState(null);
  const [active, setActive] = useState(false);
  const [destination, setDestination] = useState(null);
  const [markerLocations, setMarkerLocations] = useState([]);
  const { accessToken, id } = useContext(GlobalContext);
  const mapRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      updateLocation();
    }, UPDATE_INTERVAL);

    setTimerId(id);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    fitToCoordinate();
  }, [markerLocations]);

  const fitToCoordinate = () => {
    if (mapRef && markerLocations.length) {
      mapRef.current.fitToCoordinates(markerLocations, {
        edgePadding: DEFAULT_PADDING,
        animated: true
      });
    }
  };

  const clickRefreshBtn = debounce(() => {
    updateLocation();
  }, DEBOUNCE_TIME);

  const updateLocation = async () => {
    await fetchGroupInfo();
    await updateMyLocation();
  };

  const updateMyLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      Alert.alert('👾띠용', '위치 수집 동의를 켜주세요!');
    }

    const positionOptions = {
      accuracy: Location.Accuracy.Highest,
      maximumAge: UPDATE_INTERVAL
    };

    const location = await Location.getCurrentPositionAsync(positionOptions);
    const { longitude, latitude } = location.coords;

    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        latitude,
        longitude
      })
    };

    fetch(url.updateLocation(id), options)
      .then((res) => res.json())
      .then((res) => Promise.resolve(res))
      .catch((error) => Promise.reject(error));
  };

  const fetchGroupInfo = async () => {
    const options = { method: 'GET', headers: { Authorization: `Bearer ${accessToken}` } };

    fetch(url.getGroup(groupId), options)
      .then((res) => res.json())
      .then((resJson) => {
        const { members: mbs, destination: dt } = resJson;
        const { name, location } = dt;
        const { latitude, longitude } = location;

        if (resJson.status === 'ACTIVE') {
          const newMembers = getMemberInfos(mbs);
          setActive(true);
          setDestination({ name, latitude, longitude, isDestination: true });
          setMembers(newMembers);
          setMarkerLocations(makeMarkerLocations(newMembers, dt));
        } else {
          clearInterval(timerId);
          setActive(false);
        }

        return Promise.resolve();
      })
      .catch((error) => Promise.reject(error));
  };

  const makeMarkerLocations = (newMembers, dt) => {
    const locations = [];
    if (newMembers) {
      for (let member of newMembers) {
        if (member.region) {
          locations.push(member.region);
        }
      }
      locations.push(dt.location);
    }

    return locations;
  };

  const getMemberInfos = (memberInfos) =>
    memberInfos.reduce((acc, memberInfo) => {
      const { uuid: id, name, location: region, profileImageUrl } = memberInfo;
      acc = [...acc, { id, name, region, profileImageUrl }];

      return acc;
    }, []);

  function renderNotActiveLayer() {
    return (
      <View style={styles.notActiveLayer}>
        <Text style={styles.notActiveLayerText}>
          아직{'\n'}모임시간이{'\n'}아닙니다
        </Text>
      </View>
    );
  }

  const initialRegion = {
    latitude: 37.4983638,
    longitude: 127.0281122,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={initialRegion}
        followUserLocation={true}
        onLayout={() => {
          setTimeout(() => {
            updateLocation();
          }, 300);
        }}
      >
        {members &&
          members.map((member, idx) => {
            return (
              <Marker
                key={`marker_${idx}`}
                region={member.region}
                name={member.name}
                profileImageUrl={member.profileImageUrl}
                color={getThumbColor(idx)}
              />
            );
          })}
        {destination && (
          <Marker
            key={destination.id}
            region={{
              latitude: destination.latitude,
              longitude: destination.longitude
            }}
            name={destination.name}
            destination={true}
          />
        )}
      </MapView>
      {active ? (
        <ActionButton
          buttonColor="#0099ED"
          renderIcon={() => <MaterialIcons name="gps-fixed" size={35} color="#fff" />}
          onPress={clickRefreshBtn}
          size={60}
        />
      ) : (
        renderNotActiveLayer()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  notActiveLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingTop: '60%'
  },
  notActiveLayerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 55,
    fontFamily: 'scdreamBold',
    color: '#0099ED'
  }
});
