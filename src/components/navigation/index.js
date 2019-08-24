import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Layout } from '../../layout';
import GroupInfo from './groupInfo';

export default function Navigation(props) {
  const [fold, toggleFold] = useState(true);

  return (
    <Layout>
      <View style={styles.naviContainer}>
        <View style={styles.navigation}>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>포도</Text>
            <TouchableOpacity onPress={() => toggleFold(!fold)} style={styles.foldButtonArea}>
              <SimpleLineIcons
                style={styles.foldButton}
                name={fold ? 'arrow-down' : 'arrow-up'}
                size={12}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleBrief}>
            <Ionicons name="ios-timer" size={23} style={styles.timerIcon} />
            <Text style={styles.scheduleBriefText}>11:00 오전</Text>
          </View>
        </View>
        {!fold && <GroupInfo navigation={props.navigation} />}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  naviContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1
  },
  navigation: {
    paddingTop: 55,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 11,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 153, 237, 0.8)'
  },
  groupInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupName: {
    fontFamily: 'scdreamBold',
    fontSize: 22,
    color: '#fff'
  },
  foldIcon: {
    color: '#fff'
  },
  scheduleBrief: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  scheduleBriefText: {
    fontFamily: 'scdream',
    fontSize: 22,
    color: '#fff'
  },

  foldButton: {
    flex: 1,
    marginLeft: 13
  },
  foldButtonArea: {
    flex: 1,
    paddingTop: 5,
    width: 10
  },
  timerIcon: {
    marginRight: 4,
    color: '#fff'
  }
});
