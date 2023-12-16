// Packages
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { connectAsync } from 'expo-in-app-purchases';
import * as Notifications from 'expo-notifications';
import { PaperProvider } from 'react-native-paper';
import { withIAPContext } from 'react-native-iap';
import { ref, onValue } from 'firebase/database';
import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';
import _ from 'lodash';
// Components
import CustomSnackbar from '../shared/components/CustomSnackbar';
import RootNavigation from './navigation';
// Utilities
import { appActions, getLanguage, getThemeMode } from '../redux/slices/appSlice';
import { registerForPushNotificationsAsync } from '../shared/utils';
import { darkTheme, lightTheme } from '../shared/assets/theme';
import { createTables } from '../shared/services/localdb';
import NetworkInfo from '../shared/services/NetworkInfo';
import { FIREBASE_DB } from '../../firebaseConfig';
import { Firebase } from '../shared/constants';
import { changeLocale } from './i18n';

// Component
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

const Root = () => {
  // Redux
  const dispatch = useDispatch();
  const updateMessagesCount = useCallback((payload: Number) => dispatch(appActions.setMessagesCount(payload)), [dispatch]);
  const updateDeviceUuid = useCallback((payload: any) => dispatch(appActions.setDeviceUuid(payload)), [dispatch]);
  const updateConfiguration = useCallback((payload: any) => dispatch(appActions.setConfig(payload)), [dispatch]);

  const themeMode = useSelector(getThemeMode);
  const language = useSelector(getLanguage);

  // Statics
  const [notification, setNotification] = useState<Notifications.Notification>();
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [loadedData, setLoadedData] = useState(false);

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const isDark = _.isEqual(themeMode, 'dark');
  const theme = isDark ? darkTheme : lightTheme;

  // Callbacks
  // Function to generate and store UUID if not already stored
  const getOrGenerateUUID = useCallback(async () => {
    try {
      let id: string | null | number[] = await AsyncStorage.getItem('deviceUUID');
      console.info('[Firebase User UUID] ::', id);
      if (!id) {
        console.info('[getOrGenerateUUID] :: Generating a new UUID for this new user');
        // Generate a new UUID
        id = uuid.v4();
        // Store the generated UUID
        await AsyncStorage.setItem('deviceUUID', id.toString());
      }

      updateDeviceUuid(id);
      return id;
    } catch (error) {
      console.error('Error retrieving/generating UUID:', error);
      return null;
    }
  }, [updateDeviceUuid]);

  const getConfiguration = useCallback(async () => {
    try {
      const configRef = ref(FIREBASE_DB, Firebase.CONFIGURATION_REF);
      onValue(configRef, (snapshot) => {
        const data = snapshot.val();
        updateConfiguration(data);
        setLoadedData(true);
        console.info('[InitData] :: Loaded and stored configuration');
      });
    } catch (e) {
      console.error('[getConfiguration] - ERROR :: ', e);
    }
  }, [updateConfiguration]);

  // Function to initialize the message count from storage
  const checkDailyMessageCount = useCallback(async () => {
    const id = await getOrGenerateUUID();
    const today = new Date().toISOString().split('T')[0];
    try {
      const messagesRef = ref(FIREBASE_DB, `users/${id}`);
      onValue(messagesRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.lastMessageDate === today) {
          updateMessagesCount(userData.messagesCount || 0);
        }
      });

      updateMessagesCount(0); // Start with 0 if it's a new day
      console.info('[InitData] :: Loaded and stored daily messages');
    } catch (error) {
      console.error('Error checking daily message count:', error);
      return 0;
    }
  }, [getOrGenerateUUID, updateMessagesCount]);

  const initAppPurchases = useCallback(async () => {
    try {
      await connectAsync();
      console.info('[InitData] :: Initialized in-app purchases');
    } catch (error) {
      console.error('[initAppPurchases] - ERROR :: ', error);
    }
  }, []);

  const initData = useCallback(async () => {
    changeLocale(language);
    await getConfiguration();
    await checkDailyMessageCount();
    await createTables();
    await initAppPurchases();
  }, [checkDailyMessageCount, getConfiguration, initAppPurchases, language]);

  // Effects
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener((noti) => setNotification(noti));
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => console.log(response));

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    (async () => {
      await initData();
    })();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Renderers
  return (
    <PaperProvider theme={theme}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <StatusBar style={theme.dark ? 'light' : 'dark'} />
          <RootNavigation />
          {/* <SplashScreen loadedData={loadedData} /> */}
          <NetworkInfo />
          {/* <SubscriptionManager /> */}
          <CustomSnackbar />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </PaperProvider>
  );
};

export default withIAPContext(Root);
