import { createContext } from 'react';
import Constants from 'expo-constants';

export const userInfo = {
  id: null,
  name: null,
  uuid: '2EAC4269-DD80-476E-97BD-36F16A6BA4D9',
  accessToken: null
};

export const GlobalContext = createContext(userInfo);
