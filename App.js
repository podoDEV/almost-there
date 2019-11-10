import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import RegisterName from './src/components/registerName';
import RegisterPhoto from './src/components/registerPhoto';
import SplashScreen from './src/components/splashScreen';
import GroupList from './src/components/groupList';
import GroupMap from './src/components/groupMap';
import EditGroup from './src/components/editGroup';
import RegisterGroup from './src/components/registerGroup';
import Settings from './src/components/settings.js';
import { Layout } from './src/layout';
import { myListHeader, groupMapHeader } from './src/components/navigationHeader';

import GroupSearch from './src/components/groupSearch';

// @TODO: module화 시키자
const headerStyle = {
  height: 59,
  backgroundColor: '#0099ED',
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0
};

const headerTitleStyle = {
  fontFamily: 'scdreamBold',
  color: '#FFF',
  fontSize: 17
};

const headerBackTitleStyle = {
  fontSize: 14,
  fontFamily: 'scdream'
};

const AuthStack = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    RegisterName: { screen: RegisterName },
    RegisterPhoto: { screen: RegisterPhoto }
  },
  { initialRouteName: 'SplashScreen' }
);

const GroupStack = createStackNavigator(
  {
    GroupList: {
      screen: GroupList,
      navigationOptions: ({ navigation }) => ({
        title: '나의 리스트',
        headerStyle,
        headerTintColor: '#FFF',
        headerTitleStyle,
        headerTitle: () => myListHeader(navigation)
      })
    },
    GroupMap: {
      screen: GroupMap,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          ...headerStyle,
          height: 10
        },
        headerTintColor: '#FFFF',
        headerTitleStyle,
        headerBackTitleStyle,
        headerTitle: null,
        headerLeft: null,
        headerBackTitle: '지도'
      })
    },
    GroupSearch: {
      screen: GroupSearch,
      navigationOptions: {
        headerStyle: {
          height: 20
        },
        headerTintColor: '#FFF',
        headerTitleStyle,
        headerBackTitleStyle
      }
    },
    EditGroup: {
      screen: EditGroup,
      navigationOptions: {
        title: '그룹 정보 수정',
        headerStyle,
        headerTintColor: '#FFF',
        headerTitleStyle,
        headerBackTitleStyle
      }
    },
    RegisterGroup: {
      screen: RegisterGroup,
      navigationOptions: {
        title: '모임 만들기',
        headerStyle,
        headerTintColor: '#FFF',
        headerTitleStyle,
        headerBackTitleStyle
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: '설정',
        headerStyle,
        headerTintColor: '#FFFF',
        headerTitleStyle,
        headerBackTitleStyle
      }
    }
  },
  { initialRouteName: 'GroupList' }
);

const AppContent = createSwitchNavigator(
  {
    AuthStack: {
      screen: AuthStack
    },
    GroupStack: {
      screen: GroupStack
    }
  },
  { initialRouteName: 'AuthStack' }
);

const AppContainer = createAppContainer(AppContent);

const App = () => (
  <Layout>
    <AppContainer />
  </Layout>
);

export default App;
