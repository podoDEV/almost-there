import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MemberMarker from './memberMarker';
import * as url from '../apiUrl';
import { GlobalContext } from '../context';
import { MaterialIcons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
const UPDATE_INTERVAL = 5000;

export default class Map extends React.Component {
  timerId = null;
  markerLoaded = false;
  mapRef = React.createRef();
  state = {
    region: null,
    destination: null,
    members: null
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidMount() {
    this.updateMyLocationAndReRender();
    alert('ho!');

    this.timerId = setInterval(() => {
      // alert('ho!2?');
      this.updateMyLocationAndReRender();
    }, UPDATE_INTERVAL);
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
    // @TODO: groupId 받아와서 찍어줘야함.
    fetch(url.getGroup(1), options)
      .then((res) => res.json())
      .then((resJson) => {
        const {
          members,
          destination: {
            name,
            location: { latitude, longitude }
          }
        } = resJson;

        const memberInfoList = this.getMemberInfos(members);
        this.setState(
          {
            destination: { name, latitude, longitude, isDestination: true },
            members: memberInfoList
          },
          () => {
            if (!this.state.markerLoaded) {
              this.fitToAllMarkers();
            }
          }
        );
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

  updateMyLocationAndReRender = () => {
    //TODO 약속장소 위치 받아와서 10m?안에 있는지 거리 계산하기
    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    };

    // @TODO: 이부분이 초기 렌더링 때 안불러짐
    const getPositions = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    getPositions
      .then((position) => {
        const { longitude, latitude } = position.coords;
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
      })
      .catch((err) => {
        console.error(err.message);
      });
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
      markerLocations.push(member.region);
    }

    markerLocations.push(this.state.destination);

    // this.mapRef.current.fitToCoordinates(markerLocations, {
    //   edgePadding: DEFAULT_PADDING,
    //   animated: true
    // });

    this.state.markerLoaded = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={this.mapRef}
          initialRegion={{
            latitude: 37.362674,
            longitude: 126.921061,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          followUserLocation={true}
        >
          {this.state.members &&
            this.state.members.map((members, idx) => {
              return (
                <MemberMarker
                  key={`marker_${idx}`}
                  region={members.region}
                  name={members.name}
                  profileImageUrl={members.profileImageUrl}
                />
              );
            })}
          {this.state.destination && (
            <MemberMarker
              key={this.state.destination.id}
              region={{
                latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude
              }}
              name={this.state.destination.name}
              markerState={this.state.destination.isDestination}
            />
          )}
        </MapView>
        <ActionButton
          buttonColor="#0099ED"
          renderIcon={() => <MaterialIcons name="gps-fixed" size={45} color="#fff" />}
          onPress={this.renderMarkers}
          size={70}
        />
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
  }
});
