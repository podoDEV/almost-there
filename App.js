import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import RegisterName from './src/components/registerName';
import RegisterPhoto from './src/components/registerPhoto';
import SplashScreen from './src/components/splashScreen';
import GroupMap from './src/components/groupMap';
import EditGroup from './src/components/editGroup';
import RegisterGroup from './src/components/registerGroup';

const App = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    RegisterName: { screen: RegisterName },
    RegisterPhoto: { screen: RegisterPhoto },
    GroupMap: { screen: GroupMap },
    EditGroup: { screen: EditGroup },
    RegisterGroup: { screen: RegisterGroup }
  },
  { initialRouteName: 'RegisterGroup' }
);

export default createAppContainer(App);
