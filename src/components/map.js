import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import MapView from 'react-native-maps';
import MemberMarker from './memberMarker';
import * as url from '../apiUrl';

const LATITUDE_DELTA = 0.00922 * 1.5;
const LONGITUDE_DELTA = 0.00421 * 1.5;

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: null,
      destination: null,
      members: null
    };
  }

  getGroupInfo() {
    fetch(url.memberInfos(), { method: 'GET' })
      .then((res) => res.json())
      .then((resJson) => {
        var result = resJson.result[0];
        var memberInfoList = this.getMemberInfos(result.members);

        this.setState({
          destination: {
            name: result.destination.name,
            latitude: result.destination.location.latitude,
            longitude: result.destination.location.longitude
          },
          members: memberInfoList
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getMemberInfos(memberInfos) {
    var memberInfoList = [];

    console.log(memberInfos);

    for (let memberInfo of memberInfos) {
      memberInfoList.push({
        id: memberInfo.uuid,
        name: memberInfo.name,
        region: memberInfo.location
      });
    }
    console.log(memberInfoList);

    return memberInfoList;
  }

  getCurrentLocation() {
    //TODO 약속장소 위치 받아와서 10m?안에 있는지 거리 계산하기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      (error) => {
        alert(JSON.stringify(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );

    this.getGroupInfo();
    this.map.animateToRegion(this.state.region);
  }

  onRegionChange(lastRegion) {
    this.setState({
      region: lastRegion
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={(el) => (this.map = el)}
          onMapReady={this.getCurrentLocation.bind(this)}
          // showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}
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
        <Button onPress={this.getCurrentLocation.bind(this)} title="약속 장소 도착!" />
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
