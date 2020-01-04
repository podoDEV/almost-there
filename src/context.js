import { createContext } from 'react';
import Constants from 'expo-constants';

export const userInfo = {
  id: null,
  name: null,
  uuid: Constants.installationId,
  accessToken: null,
  registrationToken: null
};

export const GlobalContext = createContext(userInfo);
