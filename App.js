import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, Ionicons, EvilIcons } from '@expo/vector-icons';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import RegisterName from './src/components/registerName';
import RegisterPhoto from './src/components/registerPhoto';
import SplashScreen from './src/components/splashScreen';
import GroupList from './src/components/groupList';
import GroupMap from './src/components/groupMap';
import EditGroup from './src/components/editGroup';
import RegisterGroup from './src/components/registerGroup';
import Settings from './src/components/settings.js';

import GroupSearch from './src/components/groupSearch';

const styles = StyleSheet.create({
  groupListBtn: {
    color: '#fff',
    paddingLeft: 15,
    paddingBottom: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  groupListBtnText: {
    flex: 1,
    paddingLeft: 4,
    color: '#fff',
    alignItems: 'center'
  }
});

const Auth = createSwitchNavigator({
  SplashScreen: { screen: SplashScreen },
  RegisterName: { screen: RegisterName },
  RegisterPhoto: { screen: RegisterPhoto }
});

const AppContent = createStackNavigator({
  GroupList: {
    screen: GroupList,
    navigationOptions: {
      headerStyle: {
        height: 0,
        backgroundColor: '#31ACF1'
      },
      headerBackTitle: '나의 리스트'
    }
  },
  GroupMap: {
    screen: GroupMap
  },
  GroupSearch: {
    screen: GroupSearch,
    navigationOptions: () => ({
      headerStyle: {
        height: 20,
        backgroundColor: '#31ACF1'
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontFamily: 'scdream',
        color: '#FFFFFF'
      },
      tabBarColor: '#FFFFFF',
      headerBackTitleStyle: {
        fontSize: 13
      }
    })
  },
  EditGroup: { screen: EditGroup }
});

const App = createSwitchNavigator({
  Auth: {
    screen: Auth
  },
  App: {
    screen: AppContent
  }
});
// const App = createSwitchNavigator(
// 	{
// 		SplashScreen: { screen: SplashScreen },
// 		RegisterName: { screen: RegisterName },
// 		RegisterPhoto: { screen: RegisterPhoto },
// 		GroupMap: { screen: GroupMap },
// 		EditGroup: { screen: EditGroup },
// 		RegisterGroup: { screen: RegisterGroup },
// 		Settings: { screen: Settings }
// 	},
// 	{ initialRouteName: 'SplashScreen' }
// )
export default createAppContainer(App);
