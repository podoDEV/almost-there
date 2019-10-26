import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalContext } from '../context';
import { Layout } from '../layout';
import * as url from '../apiUrl';
import Navigation from './navigation';
import Map from './map';

export default function GroupMap(props) {
  const [ groupInfo, setGroupInfo ] = useState(null);
  const { accessToken } = useContext(GlobalContext);

  useEffect(() => {
    fetch(url.getMembers(), { method: 'GET' })
      .then((res) => res.json())
      .then(() => {
        const options = {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` }
        };
        fetch(url.getMembers(1), options)
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
      });
  }, []);
  
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map />
        </View>
        <Navigation groupInfo={groupInfo} navigation={props.navigation} />
      </View>
    </Layout>
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
