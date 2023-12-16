// Packages
import NetInfo from '@react-native-community/netinfo';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Modal, Text, useTheme } from 'react-native-paper';
// Components
import RegularButton from '../../shared/components/Buttons/Regular';
// Utilities
import { t } from '../../app/i18n';

// Component
const _t = (key: string, options?: object) => t(`network.${key}`, options);

const NetworkInfo = () => {
  // Statics
  const [showModal, setShowModal] = useState(false);

  const theme = useTheme();
  const styles = makeStyles(theme);

  // Callbacks
  const handleRetryPress = useCallback(() => {
    NetInfo.fetch().then((state) => state.isConnected && setShowModal(true));
  }, []);

  // Effects
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Renderers
  if (showModal) {
    return (
      <Modal visible dismissable={false}>
        <View style={styles.container}>
          <FastImage source={require('../../../assets/no-internet.png')} style={styles.icon} />
          <Text variant="titleSmall" style={styles.text}>
            {_t('no_internet_connection')}
          </Text>
          <RegularButton title={_t('retry_connecting')} onPress={handleRetryPress} />
        </View>
      </Modal>
    );
  }

  return null;
};

export default NetworkInfo;

const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: '80%',
      padding: 24,
      borderRadius: 18,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background
    },
    icon: {
      width: 85,
      height: 85,
      marginBottom: 5
    },
    text: {
      marginBottom: 5,
      fontWeight: 'bold',
      color: theme.dark ? theme.colors.white : theme.colors.black
    }
  });
