// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import PT from 'prop-types';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import LeftChevron from 'app/src/lib/icons/LeftChevron';
import { isRTL } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const BackButton = ({ title, onPress, style, ...props }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <IconButton
      size={18}
      style={[styles.container, style]}
      onPress={() => navigation.goBack()}
      icon={() => (
        <LeftChevron color={theme.dark ? theme.colors.white : theme.colors.black} style={{ transform: [{ rotateY: isRTL ? '180deg' : '0deg' }] }} />
      )}
      {...props}
    />
  );
};

BackButton.propTypes = {
  title: PT.string.isRequired,
  onPress: PT.func.isRequired,
};

BackButton.defaultProps = {
  title: 'Submit',
  onPress: () => null,
};

export default BackButton;
