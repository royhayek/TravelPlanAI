// Packages
import { Button, Modal, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import { AntDesign } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { View } from 'react-native';
// Components
import OutlinedButton from '../../../shared/components/Buttons/Outlined';
import RegularButton from '../../../shared/components/Buttons/Regular';
// Utilities
import { t } from '../../../app/i18n';
import makeStyles from './styles';
// Component
const _t = (key, options) => t(`trip.${key}`, options);

const ExitModal = ({ visible, toggle }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  // Callbacks
  const handleLeaveScreen = useCallback(() => navigation.goBack(), [navigation]);

  // Renderers
  return (
    <Modal visible={visible} onDismiss={toggle} contentContainerStyle={styles.content} animationType="slide">
      <Button onPress={toggle} style={styles.closeButton}>
        <AntDesign name="close" size={ms(24)} color="grey" />
      </Button>

      <Text style={styles.title}>{_t('save_before_you_go')}</Text>
      <Text style={styles.description}>{_t('you_havent_saved')}</Text>
      <View style={styles.buttonsContainer}>
        <OutlinedButton title={_t('leave')} onPress={handleLeaveScreen} />
        <RegularButton style={styles.gobackButton} backgroundColors={['black', 'black', 'black']} title={_t('go_back')} onPress={toggle} />
      </View>
    </Modal>
  );
};

export default ExitModal;
