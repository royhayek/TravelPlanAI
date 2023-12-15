import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Root from './src/app/Root';
import { persistor, store } from './src/app/store';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import 'react-native-url-polyfill/auto';
import './src/app/i18n';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const fetchFonts = () => {
  return Font.loadAsync({
    'inter-bold': require('./src/shared/assets/fonts/Inter-Bold.ttf'),
    'inter-semibold': require('./src/shared/assets/fonts/Inter-SemiBold.ttf'),
    'inter-medium': require('./src/shared/assets/fonts/Inter-Medium.ttf'),
    'inter-light': require('./src/shared/assets/fonts/Inter-Light.ttf'),
    'inter-regular': require('./src/shared/assets/fonts/Inter-Regular.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      iosClientId: '231505269694-n7o6cid3gnoo8hhjs1gqhfr32e0s4g80.apps.googleusercontent.com',
      webClientId: '231505269694-f731db0d9j55gvva3tflu7b2gduuh17d.apps.googleusercontent.com',
      offlineAccess: false,
      profileImageSize: 150,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontsLoaded(true)} onError={() => null} />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
