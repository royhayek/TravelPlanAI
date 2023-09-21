/* eslint-disable react/no-unstable-nested-components */
// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { I18nManager, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import SubscriptionScreen from '../screens/Subscription';
import BackButton from '../components/Buttons/Back';
import ItineraryScreen from '../screens/Itinerary';
import SettingsScreen from '../screens/Settings';
import HistoryScreen from '../screens/History';
import ChatScreen from '../screens/Chat';
import InfoScreen from '../screens/Info';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from '../config/i18n';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = key => t(`navigation.${key}`);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const RootNavigation = () => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();

  const isArabic = I18nManager.isRTL && Platform.OS === 'android';
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  const renderHeaderLeft = props => (props.canGoBack ? <BackButton /> : null);

  const screenOptions = {
    headerShown: true,
    headerTitleStyle: { color: theme.dark ? theme.colors.white : theme.colors.black },
    headerStyle: { backgroundColor: theme.colors.background },
    headerShadowVisible: false,
    headerLeft: isArabic ? null : renderHeaderLeft,
    headerRight: isArabic ? renderHeaderLeft : null,
  };

  const ChatStackScreen = () => (
    <ChatStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} options={{ title: _t('trip_planner'), ...screenOptions }} />
      <ChatStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          ...screenOptions,
        }}
      />
    </ChatStack.Navigator>
  );

  const HistoryStackScreen = () => (
    <HistoryStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <HistoryStack.Screen name="History" component={HistoryScreen} options={{ title: _t('history'), ...screenOptions }} />
    </HistoryStack.Navigator>
  );

  const SettingsStackScreen = () => (
    <SettingsStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{ title: _t('settings'), ...screenOptions }} />
    </SettingsStack.Navigator>
  );

  const getTabBarIcon = useCallback(({ focused, color, size }, route) => {
    let iconName;

    if (route.name === 'ChatStack') {
      iconName = focused ? 'md-chatbubble-ellipses' : 'md-chatbubble-ellipses-outline';
    } else if (route.name === 'MapStack') {
      iconName = focused ? 'ios-grid' : 'ios-grid-outline';
    } else if (route.name === 'HistoryStack') {
      iconName = focused ? 'ios-time' : 'ios-time-outline';
    } else if (route.name === 'SettingsStack') {
      iconName = focused ? 'ios-settings' : 'ios-settings-outline';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  }, []);

  const Tabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: theme.colors.background,
        },
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
        headerShown: false,
        tabBarIcon: props => getTabBarIcon(props, route),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
      })}>
      <Tab.Screen name="ChatStack" component={ChatStackScreen} options={{ title: _t('trip_planner') }} />
      <Tab.Screen name="HistoryStack" component={HistoryStackScreen} options={{ title: _t('history'), unmountOnBlur: true }} />
      <Tab.Screen name="SettingsStack" component={SettingsStackScreen} options={{ title: _t('settings') }} />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: _t('trip_planner'), ...screenOptions }} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: '', ...screenOptions }} />
      <Stack.Screen name="Info" component={InfoScreen} options={({ route }) => ({ title: route.params?.name, ...screenOptions })} />
      <Stack.Screen name="Itinerary" component={ItineraryScreen} options={({ route }) => ({ title: route.params?.name, ...screenOptions })} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
