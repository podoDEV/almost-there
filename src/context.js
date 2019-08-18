import { createContext } from 'react';
import Constants from 'expo-constants';

export const userInfo = {
  id: null,
  name: null,
  uuid: Constants.installationId,
  sessionId: null
};

export const GlobalContext = createContext(userInfo);
