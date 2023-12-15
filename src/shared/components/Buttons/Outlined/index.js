// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { View, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import PT from 'prop-types';
import React from 'react';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const OutlinedButton = ({ title, onPress, containerStyle, style, startIcon, endIcon, backgroundColors, disabled, ...props }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container(disabled), containerStyle]} disabled={disabled} {...props}>
      <View style={styles.linearBackground}>
        {startIcon}
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        {endIcon && <View style={styles.endIcon}>{endIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

OutlinedButton.propTypes = {
  title: PT.string.isRequired,
  onPress: PT.func.isRequired,
};

OutlinedButton.defaultProps = {
  title: 'Submit',
  onPress: () => null,
};

export default OutlinedButton;
