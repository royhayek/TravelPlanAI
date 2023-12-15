// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Switch, Text, useTheme } from 'react-native-paper';
import { getAvailablePurchases } from 'react-native-iap';
import Rate, { AndroidMarket } from 'react-native-rate';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import Menu from '../../shared/components/Menu';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { appActions, getConfiguration, getLanguage, getOwnedSubscription, getThemeMode } from '../../redux/slices/appSlice';
import { changeLanguage, isRTL, t } from '../../app/i18n';
import { Languages } from '../../shared/constants';
import { appName } from '../../shared/utils';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`settings.${key}`, options);

const SettingsScreen = ({ navigation }) => {
  // --------------------------------------------------------- //
  // ----------------------- REDUX --------------------------- //
  const dispatch = useDispatch();
  const updateOwnedSubscription = useCallback(payload => dispatch(appActions.setOwnedSubscription(payload)), [dispatch]);

  const ownedSubscription = useSelector(getOwnedSubscription);
  const config = useSelector(getConfiguration);
  const themeMode = useSelector(getThemeMode);
  const language = useSelector(getLanguage);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [openLangMenu, setOpenLangMenu] = useState(false);

  const isDark = _.isEqual(themeMode, 'dark');
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const toggleLangMenu = useCallback(() => setOpenLangMenu(cur => !cur), []);

  const navigateToInfo = useCallback(
    (type, options) => {
      navigation.push('Info', { type, name: _t(type, options) });
    },
    [navigation],
  );

  const navigateToSubscription = useCallback(() => {
    navigation.navigate('Subscription');
  }, [navigation]);

  const updateLanguage = useCallback(
    lng => {
      dispatch(appActions.setLanguage(lng));
      changeLanguage(lng);
      toggleLangMenu();
    },
    [dispatch, toggleLangMenu],
  );

  const handleUpgradePress = useCallback(() => navigation.navigate('Subscription'), [navigation]);

  const handleRestorePurchase = useCallback(async () => {
    try {
      const purchases = await getAvailablePurchases();
      if (!_.isEmpty(purchases)) {
        console.debug('[handleRestorePurchase] :: ', { purchases });
        const lastPurchase = _.last(purchases);
        updateOwnedSubscription(lastPurchase?.productId);
        Alert.alert(_t('purchase_restored'));
      } else {
        Alert.alert(_t('could_not_restore'));
      }
    } catch (error) {
      console.error('[handleRestorePurchase] - ERROR :: ', error);
    }
  }, [updateOwnedSubscription]);

  const handleRateApp = useCallback(() => {
    const options = {
      AppleAppID: config?.other?.appleAppId,
      GooglePackageName: config?.other?.googlePackageName,
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
    };
    Rate.rate(options, (success, errorMessage) => {
      if (success) {
        // This technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        console.debug('User successfully rated the app');
      }
      if (errorMessage) {
        // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
        console.error(`Example page Rate.rate() error: ${errorMessage}`);
      }
    });
  }, [config?.other?.appleAppId, config?.other?.googlePackageName]);

  const toggleThemeMode = useCallback(() => dispatch(appActions.setThemeMode(isDark ? 'light' : 'dark')), [dispatch, isDark]);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- RENDER VARS ---------------------- //
  const sections = useMemo(
    () => [
      {
        section: _t('general'),
        items: [
          {
            key: 'language',
            name: _t('language'),
            icon: 'ios-language-outline',
            value: _.find(Languages, { item: language })?.title,
            onPress: () => toggleLangMenu(),
            isMenu: true,
          },
          {
            key: 'theme',
            name: _t('theme'),
            icon: 'ios-sunny-outline',
            value: isDark,
            onPress: toggleThemeMode,
            isSwitch: true,
          },
        ],
      },
      {
        section: _t('subscription'),
        items: [
          {
            key: 'restore_purchase',
            name: _t('restore_purchase'),
            icon: 'ios-cart-outline',
            onPress: handleRestorePurchase,
          },
          {
            key: 'manage_subscription',
            name: _t('manage_subscription'),
            icon: 'ios-today-outline',
            onPress: navigateToSubscription,
          },
        ],
      },
      {
        section: _t('other'),
        items: [
          // {
          //   key: 'faq',
          //   name: _t('faq'),
          //   icon: 'ios-help-circle-outline',
          //   onPress: () => navigateToInfo('faq'),
          // },
          {
            key: 'privacy_policy',
            name: _t('privacy_policy'),
            icon: 'ios-document-text-outline',
            onPress: () => navigateToInfo('privacy_policy'),
          },
          {
            key: 'terms',
            name: _t('terms'),
            icon: 'ios-information-circle-outline',
            onPress: () => navigateToInfo('terms', { name: appName }),
          },
          {
            key: 'rate',
            name: _t('rate_app'),
            icon: 'ios-star-outline',
            onPress: () => handleRateApp(),
          },
        ],
      },
    ],
    [handleRateApp, handleRestorePurchase, isDark, language, navigateToInfo, navigateToSubscription, toggleLangMenu, toggleThemeMode],
  );
  // --------------------- /RENDER VARS ---------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  const renderUpgradeButton = useMemo(
    () => (
      <TouchableOpacity onPress={handleUpgradePress} style={styles.upgradeContainer}>
        <View>
          <Text variant="titleLarge" style={styles.upgradeTitle}>
            {_t('upgrade_to_plus')}
          </Text>
          <Text variant="labelSmall" style={styles.upgradeDesc}>
            {_t('expanded_access', { name: appName })}
          </Text>
        </View>
        <Ionicons name="ios-chevron-forward-sharp" size={ms(28)} color="white" style={{ transform: isRTL ? [{ scaleX: -1 }] : undefined }} />
      </TouchableOpacity>
    ),
    [handleUpgradePress, styles.upgradeContainer, styles.upgradeDesc, styles.upgradeTitle],
  );

  const renderContent = useMemo(
    () => (
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} overScrollMode="never" showsVerticalScrollIndicator={false}>
        {_.map(sections, ({ section, items }) => (
          <View key={section}>
            <Text variant="labelMedium" style={styles.title}>
              {section}
            </Text>
            {_.map(items, ({ key, icon, name, value, onPress, isSwitch, isMenu }) => (
              <TouchableOpacity key={key} style={styles.item} onPress={onPress}>
                <View style={styles.iconAndTitle}>
                  <View style={styles.iconContainer}>
                    <Ionicons name={icon} size={ms(24)} style={styles.endIcon} />
                  </View>
                  <Text variant="labelLarge">{name}</Text>
                </View>
                {isSwitch ? (
                  <Switch value={value} onValueChange={onPress} style={{ transform: [{ scaleX: ms(0.8) }, { scaleY: ms(0.8) }] }} />
                ) : isMenu ? (
                  <Menu
                    items={Languages}
                    visible={openLangMenu}
                    onDismiss={toggleLangMenu}
                    onItemPress={updateLanguage}
                    anchor={
                      <View style={styles.anchor}>
                        <Text variant="bodySmall">{value}</Text>
                        <Ionicons
                          size={ms(18)}
                          name="chevron-forward"
                          style={styles.arrowIcon}
                          color={theme.dark ? theme.colors.secondary : theme.colors.black}
                        />
                      </View>
                    }
                  />
                ) : (
                  <Ionicons
                    size={ms(18)}
                    name="chevron-forward"
                    style={styles.arrowIcon}
                    color={theme.dark ? theme.colors.secondary : theme.colors.black}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    ),
    [styles, sections, theme, openLangMenu, updateLanguage, toggleLangMenu],
  );

  return (
    <View style={styles.container}>
      {!ownedSubscription && renderUpgradeButton}
      {renderContent}
    </View>
  );
};

export default SettingsScreen;
