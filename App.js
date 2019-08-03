import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import RegisterName from './src/components/registerName';
import SplashScreen from './src/components/splashScreen';
import GroupMap from './src/components/groupMap';

const App = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    RegisterName: { screen: RegisterName },
    GroupMap: { screen: GroupMap }
  },
  { initialRouteName: 'SplashScreen' }
);

export default createAppContainer(App);
