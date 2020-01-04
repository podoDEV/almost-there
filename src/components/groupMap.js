import React, { useEffect, useState, useContext } from 'react';
import { useNavigationParam } from 'react-navigation-hooks';
import { StyleSheet, View } from 'react-native';
import { GlobalContext } from '../context';
import * as url from '../apiUrl';
import Navigation from './navigation';
import Map from './map';
import { isOwner } from '../common.js';

export default function GroupMap(props) {
  const [groupInfo, setGroupInfo] = useState(null);
  const groupId = useNavigationParam('groupId');
  const { accessToken, id } = useContext(GlobalContext);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (!groupInfo) {
      fetch(url.getGroup(groupId), {
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
          setOwner(isOwner(resJson.members, id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map groupId={groupId} />
      </View>
      <Navigation groupInfo={groupInfo} navigation={props.navigation} owner={owner} />
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
