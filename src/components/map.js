import React from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MemberMarker from './memberMarker';
import * as url from '../apiUrl';

const { height, width } = Dimensions.get('window');
const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const DEFAULT_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timerId: 0,
      memberId: 2,
      region: null,
      destination: null,
      members: null,
      markerLoaded: false
    };
  }

  componentDidMount() {
    this.updateMyLocationAndReRender();
    this.state.timerId = setInterval(() => this.updateMyLocationAndReRender(), 10000);
  }

  renderMarkers() {
    clearInterval(this.state.timerId);
    this.state.timerId = setInterval(() => this.updateMyLocationAndReRender(), 10000);
  }
  //
  getGroupInfo() {
    fetch(url.getGroup(1), { method: 'GET' })
      .then((res) => res.json())
      .then((resJson) => {
        var memberInfoList = this.getMemberInfos(resJson.members);
        this.setState({
          destination: {
            name: resJson.destination.name,
            latitude: resJson.destination.location.latitude,
            longitude: resJson.destination.location.longitude
          },
          members: memberInfoList
        });

        if (!this.state.markerLoaded) {
          this.fitToAllMarkers();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getMemberInfos(memberInfos) {
    var memberInfoList = [];
    for (let memberInfo of memberInfos) {
      memberInfoList.push({
        id: memberInfo.uuid,
        name: memberInfo.name,
        region: memberInfo.location
      });
    }
    return memberInfoList;
  }

  updateMyLocationAndReRender = () => {
    //TODO 약속장소 위치 받아와서 10m?안에 있는지 거리 계산하기
    var options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    };

    var getPositions = new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    getPositions
      .then((position) => {
        this.setState({
          region: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
        this.updateMyLocation();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  updateMyLocation() {
    fetch(url.updateLocation(this.state.memberId), {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude
      })
    })
      .then(this.getGroupInfo())
      .catch((error) => {
        console.error(error);
      });
  }

  fitToAllMarkers() {
    var markerLocations = [];

    for (let member of this.state.members) {
      markerLocations.push(member.region);
    }

    markerLocations.push(this.state.destination);

    console.log(markerLocations);

    this.map.fitToCoordinates(markerLocations, {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });

    this.state.markerLoaded = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={(el) => (this.map = el)}
          initialRegion={{
            latitude: 37.362674,
            longitude: 126.921061,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          followUserLocation={true}
        >
          {this.state.members &&
            this.state.members.map((members) => {
              return <MemberMarker key={members.id} region={members.region} name={members.name} />;
            })}
          {this.state.destination && (
            <MemberMarker
              key={this.state.destination.id}
              region={{
                latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude
              }}
              name={this.state.destination.name}
            />
          )}
        </MapView>
        <Button onPress={this.renderMarkers.bind(this)} title="약속 장소 도착!" />
      </View>
    );
  }
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
  }
});
