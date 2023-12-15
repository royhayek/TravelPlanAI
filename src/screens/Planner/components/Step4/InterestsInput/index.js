// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { TextInput, useTheme } from 'react-native-paper';
import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
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
      style={styles.input}
      returnKeyType="send"
      verticalAlign="middle"
      onChangeText={handleValueChange}
      onSubmitEditing={Keyboard.dismiss}
      underlineStyle={styles.underline}
      placeholder={'Shopping, Nightlight'}
      outlineColor={theme.colors.secondary}
      outlineStyle={styles.inputOutlineStyle}
      activeOutlineColor={theme.colors.primary}
      placeholderTextColor={theme.colors.secondary}
    />
  );
};

export default InterestsInput;
