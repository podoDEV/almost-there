import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';
import Navigation from './navigation';
import Map from './map';

export default function GroupMap(props) {
  const [groupInfo, setGroupInfo] = useState(null);
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    fetch(url.getGroup(1), {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resJson) => {
        setGroupInfo(resJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map />
      </View>
      <Navigation groupInfo={groupInfo} navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1
  }
});
