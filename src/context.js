import { createContext } from 'react';
import { AsyncStorage } from 'react-native';

export const userInfo = {
  id: null,
  name: null,
  uuid: null,
  accessToken: null,
  registrationToken: null
};

export const GlobalContext = createContext(userInfo);
