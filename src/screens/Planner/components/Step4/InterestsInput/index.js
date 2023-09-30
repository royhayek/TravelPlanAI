// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { Keyboard } from 'react-native';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const InterestsInput = ({ value, setValue }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleValueChange = useCallback(text => setValue(text), [setValue]);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <TextInput
      mode="outlined"
      value={value}
      placeholder={'Shopping, Nightlight'}
      style={styles.input}
      returnKeyType="send"
      verticalAlign="middle"
      onChangeText={handleValueChange}
      onSubmitEditing={Keyboard.dismiss}
      underlineStyle={styles.underline}
      outlineColor={theme.colors.secondary}
      outlineStyle={styles.inputOutlineStyle}
      activeOutlineColor={theme.colors.primary}
      placeholderTextColor={theme.colors.secondary}
    />
  );
};

export default InterestsInput;
