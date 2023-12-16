// Packages
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { I18nManager, Platform } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode, useCallback } from 'react';

// Components
import BackButton from '@shared/components/Buttons/Back';
import SubscriptionScreen from '@screens/Subscription';
import ItineraryScreen from '@screens/Itinerary';
import SettingsScreen from '@screens/Settings';
import MyTripsScreen from '@screens/MyTrips';
import PlannerScreen from '@screens/Planner';
import InfoScreen from '@screens/Info';
import MapScreen from '@screens/Map';
import Login from '@screens/Login';

// Utilities
import { scaledFontSize } from '@shared/assets/theme';
import { t } from '@app/i18n';

interface TabBarLabelProps {
  children: ReactNode;
  focused: boolean;
  color: string;
  position: string;
}

// Component
const _t = (key: string) => t(`navigation.${key}`);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const TripsStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const RootNavigation = () => {
  // Statics
  const theme = useTheme();

  const isArabic = I18nManager.isRTL && Platform.OS === 'android';

  const isLoggedIn = false;

  // Renderers
  const renderHeaderLeft = (props: HeaderBackButtonProps) => (props.canGoBack ? <BackButton /> : null);

  const screenOptions = {
    headerShown: true,
    headerTitleStyle: { color: theme.dark ? theme.colors.white : theme.colors.black, fontSize: scaledFontSize(20) },
    headerStyle: { backgroundColor: theme.colors.background },
    headerShadowVisible: false,
    headerLeft: isArabic ? null : renderHeaderLeft,
    headerRight: isArabic ? renderHeaderLeft : null
  };

  const ChatStackScreen = () => (
    <ChatStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <ChatStack.Screen name="Chat" component={PlannerScreen} options={{ title: _t('trip_planner'), ...screenOptions }} />
      <ChatStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          title: '',
          headerTitleAlign: 'center',
          ...screenOptions
        }}
      />
    </ChatStack.Navigator>
  );

  const TripsStackScreen = () => (
    <TripsStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <TripsStack.Screen name="History" component={MyTripsScreen} options={{ title: _t('history'), ...screenOptions }} />
    </TripsStack.Navigator>
  );

  const SettingsStackScreen = () => (
    <SettingsStack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{ title: _t('settings'), ...screenOptions }} />
    </SettingsStack.Navigator>
  );

  const getTabBarIcon = useCallback(({ focused, color, size }, route) => {
    let iconName;

    if (route.name === 'ChatStack') {
      iconName = focused ? 'ios-earth' : 'ios-earth-outline';
    } else if (route.name === 'MapStack') {
      iconName = focused ? 'ios-grid' : 'ios-grid-outline';
    } else if (route.name === 'TripsStack') {
      iconName = focused ? 'ios-paper-plane' : 'ios-paper-plane-outline';
    } else if (route.name === 'SettingsStack') {
      iconName = focused ? 'ios-settings' : 'ios-settings-outline';
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={ms(size)} color={color} />;
    // return <FontAwesomeIcon icon={faHouse} size={size} style={{ color: '#000000' }} />;
  }, []);

  const getTabBarLabel = useCallback(
    ({ children, focused, color, position }: TabBarLabelProps) => (focused ? <Text variant="titleSmall">{children}</Text> : null),
    []
  );

  const Tabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          paddingHorizontal: ms(16),
          backgroundColor: theme.colors.background,
          height: Platform.OS === 'ios' ? mvs(80) : mvs(65)
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarAllowFontScaling: true,
        tabBarIconStyle: { width: ms(36) },
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: theme.dark ? theme.colors.white : theme.colors.black,
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarIcon: (props) => getTabBarIcon(props, route),
        tabBarLabel: (props) => getTabBarLabel(props),
        tabBarActiveBackgroundColor: theme.colors.primaryLight,
        tabBarItemStyle: {
          borderRadius: ms(30),
          marginVertical: Platform.OS === 'ios' ? mvs(10) : mvs(16),
          marginHorizontal: ms(6)
        }
      })}>
      <Tab.Screen name="ChatStack" component={ChatStackScreen} options={{ title: _t('trip_planner') }} />
      <Tab.Screen name="TripsStack" component={TripsStackScreen} options={{ title: _t('history'), unmountOnBlur: true }} />
      <Tab.Screen name="SettingsStack" component={SettingsStackScreen} options={{ title: _t('settings') }} />
    </Tab.Navigator>
  );

  return isLoggedIn ? (
    <Stack.Navigator screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="Chat" component={PlannerScreen} options={{ title: _t('trip_planner'), ...screenOptions }} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: '', ...screenOptions }} />
      <Stack.Screen name="Info" component={InfoScreen} options={({ route }) => ({ title: route.params?.name, ...screenOptions })} />
      <Stack.Screen name="Itinerary" component={ItineraryScreen} options={({ route }) => ({ title: route.params?.name, ...screenOptions })} />
      <Stack.Screen name="Map" component={MapScreen} options={({ route }) => ({ title: route.params?.name, ...screenOptions })} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false, headerTitleAlign: 'center' }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
