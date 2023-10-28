// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { Button, Modal, Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { View } from 'react-native';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import OutlinedButton from 'app/src/components/Buttons/Outlined';
import RegularButton from 'app/src/components/Buttons/Regular';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`trip.${key}`, options);

const ExitModal = ({ visible, toggle }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleLeaveScreen = useCallback(() => navigation.goBack(), [navigation]);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <Modal visible={visible} onDismiss={toggle} contentContainerStyle={styles.content} animationType="slide">
      <Button onPress={toggle} style={styles.closeButton}>
        <AntDesign name="close" size={24} color="grey" />
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
