import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export const Layout = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        scdream: require('../assets/fonts/SCDream.otf'),
        scdreamBold: require('../assets/fonts/SCDreamBold.otf')
      });

      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return children;
};
