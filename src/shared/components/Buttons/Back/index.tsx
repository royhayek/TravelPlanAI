// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ms } from 'react-native-size-matters';
import PT from 'prop-types';
import React from 'react';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import LeftChevron from '../../../../shared/assets/icons/LeftChevron';
import { isRTL } from '../../../../app/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
interface BackButtonProps {
  title?: string;
  onPress?: () => void;
  style?: object;
  [x: string]: any;
}

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
      size={ms(18)}
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
  onPress: PT.func.isRequired
};

BackButton.defaultProps = {
  title: 'Submit',
  onPress: () => null
};

export default BackButton;
