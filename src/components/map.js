import React from 'react';
import { StyleSheet, View, Dimensions, Platform, Text } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import MemberMarker from './memberMarker';
import * as url from '../apiUrl';
import { GlobalContext } from '../context';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
const UPDATE_INTERVAL = 1000;

export default class Map extends React.Component {
  timerId = null;
  markerLoaded = false;
  mapRef = React.createRef();
  state = {
    region: null,
    destination: null,
    members: null,
    active: false
  };

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      this.getGroupInfo();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { active } = this.state;

    if (active !== prevState.active && active) {
      this.renderMarkers();
    }

    if (prevProps !== this.props) {
      this.getGroupInfo();
    }
  }

  renderMarkers = () => {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.updateMyLocationAndReRender();
    }, UPDATE_INTERVAL);
  };

  getGroupInfo = () => {
    const { accessToken } = this.context;
    const options = { method: 'GET', headers: { Authorization: `Bearer ${accessToken}` } };
    fetch(url.getGroup(this.props.groupId), options)
      .then((res) => res.json())
      .then((resJson) => {
        const {
          members,
          destination: {
            name,
            location: { latitude, longitude }
          },
          status
        } = resJson;

        if (status === 'ACTIVE') {
          const memberInfoList = this.getMemberInfos(members);
          this.setState(
            {
              active: true,
              destination: { name, latitude, longitude, isDestination: true },
              members: memberInfoList
            },
            () => {
              if (!this.state.markerLoaded) {
                this.fitToAllMarkers();
              }
            }
          );
        } else {
          clearInterval(this.timerId);
          this.setState({ active: false });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getMemberInfos = (memberInfos) => {
    const memberInfoList = [];
    for (let memberInfo of memberInfos) {
      const { uuid: id, name, location: region, profileImageUrl } = memberInfo;
      memberInfoList.push({ id, name, region, profileImageUrl });
    }
    return memberInfoList;
  };

  updateMyLocationAndReRender = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Permission to access location was denied');
    }
    const options = {
      accuracy: Location.Accuracy.Highest,
      maximumAge: 1000
    };

    const location = await Location.getCurrentPositionAsync(options);
    const { longitude, latitude } = location.coords;
    this.setState(
      {
        region: {
          longitude,
          latitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      },
      () => {
        this.updateMyLocation();
      }
    );
  };

  updateMyLocation = () => {
    const { id, accessToken } = this.context;
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude
      })
    };

    fetch(url.updateLocation(id), options)
      .then((res) => res.json())
      .then(() => {
        this.getGroupInfo();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  fitToAllMarkers() {
    const markerLocations = [];

    for (let member of this.state.members) {
      if (member.region !== null) {
        markerLocations.push(member.region);
      }
    }

    markerLocations.push(this.state.destination);

    this.mapRef.current.fitToCoordinates(markerLocations, {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });

    this.state.markerLoaded = true;
  }

  renderNotActiveLayer() {
    return (
      <View style={styles.notActiveLayer}>
        <Text style={styles.notActiveLayerText}>
          아직{'\n'}모임시간이{'\n'}아닙니다
        </Text>
      </View>
    );
  }

  render() {
    const { members, destination, active } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={this.mapRef}
          initialRegion={{
            latitude: 37.4983638,
            longitude: 127.0281122,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          followUserLocation={true}
        >
          {members &&
            members.map((member, idx) => {
              return (
                <MemberMarker
                  key={`marker_${idx}`}
                  region={member.region}
                  name={member.name}
                  profileImageUrl={member.profileImageUrl}
                />
              );
            })}
          {destination && (
            <MemberMarker
              key={destination.id}
              region={{
                latitude: destination.latitude,
                longitude: destination.longitude
              }}
              name={destination.name}
              markerState={destination.isDestination}
            />
          )}
        </MapView>
        {active ? (
          <ActionButton
            buttonColor="#0099ED"
            renderIcon={() => <MaterialIcons name="gps-fixed" size={45} color="#fff" />}
            onPress={this.renderMarkers}
            size={70}
          />
        ) : (
          this.renderNotActiveLayer()
        )}
      </View>
    );
  }
}

Map.contextType = GlobalContext;

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
