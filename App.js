import React from 'react';
import { StatusBar, YellowBox, Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Constants from 'expo-constants';
import RegisterName from './src/components/registerName';
import RegisterPhoto from './src/components/registerPhoto';
import RegisterPolicy from './src/components/registerPolicy';
import SplashScreen from './src/components/splashScreen';
import GroupList from './src/components/groupList';
import GroupMap from './src/components/groupMap';
import EditGroup from './src/components/editGroup';
import RegisterGroup from './src/components/registerGroup';
import Settings from './src/components/settings';
import Policy from './src/components/policy';
import EditProfile from './src/components/editProfile';
import { Layout } from './src/layout';
import { myListHeader } from './src/components/navigationHeader';
import GroupSearch from './src/components/groupSearch';
import PlaceSearch from './src/components/placeSearch';

// @TODO: module화 시키자
const headerStyle = {
  height: 59,
  backgroundColor: '#0099ED',
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
  marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight * -1
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
    RegisterPhoto: { screen: RegisterPhoto },
    RegisterPolicy: { screen: RegisterPolicy }
  },
  { initialRouteName: 'SplashScreen' }
);

const GroupStack = createStackNavigator(
  {
    GroupList: {
      screen: GroupList,
      navigationOptions: () => ({
        title: '나의 리스트',
        headerStyle,
        headerTintColor: '#FFF',
        headerTitleStyle,
        headerTitle: () => myListHeader()
      })
    },
    GroupMap: {
      screen: GroupMap,
      navigationOptions: () => ({
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
        title: '모임 찾기',
        headerStyle,
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
        headerTintColor: '#FFF',
        headerTitleStyle,
        headerBackTitleStyle
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: '프로필 수정',
        headerStyle,
        headerTintColor: '#FFF',
        headerTitleStyle,
        headerBackTitleStyle
      }
    },
    Policy: {
      screen: Policy,
      navigationOptions: ({ navigation }) => {
        const { type } = navigation.state.params;

        return {
          title: type === 'location' ? '위치 기반 서비스 이용약관' : '개인정보 처리 방침',
          headerStyle,
          headerTintColor: '#FFF',
          headerTitleStyle,
          headerBackTitleStyle
        };
      }
    },
    PlaceSearch: {
      screen: PlaceSearch,
      navigationOptions: () => ({
        headerStyle: {
          ...headerStyle,
          height: 10
        },
        headerTitle: null,
        headerLeft: null
      })
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
    <StatusBar barStyle="light-content" />
    <AppContainer />
  </Layout>
);

// @TODO: 블랙 리스트로 관리해야 할 것 같음
YellowBox.ignoreWarnings(['ReactNative.NativeModules.LottieAnimationView.getConstants']);

export default App;
