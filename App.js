import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import RegisterName from './src/components/registerName';
import SplashScreen from './src/components/splashScreen';

const App = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    RegisterName: { screen: RegisterName }
  },
  { initialRouteName: 'SplashScreen' }
);

export default createAppContainer(App);
