import { createContext } from 'react';
import Constants from 'expo-constants';

export const userInfo = {
  name: '',
  deviceId: Constants.installationId,
  sessionId: ''
};

export const GlobalContext = createContext(userInfo);
