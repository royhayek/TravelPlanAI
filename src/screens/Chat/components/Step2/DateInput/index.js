// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { Keyboard } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { isRTL } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const DateInput = ({ defaultValue, handleSubmit }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [value, setValue] = useState();
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleValueChange = useCallback(text => setValue(text), []);

  const handleSubmitPrompt = useCallback(() => handleSubmit(value), [handleSubmit, value]);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <TextInput
      value={value}
      editable={false}
      theme={{ roundness: 8 }}
      placeholder={'MM/DD - MM/DD'}
      style={styles.input}
      outlineStyle={styles.inputOutlineStyle}
      returnKeyType="send"
      verticalAlign="middle"
      outlineColor={theme.colors.secondary}
      onSubmitEditing={Keyboard.dismiss}
      onChangeText={handleValueChange}
      activeOutlineColor={theme.colors.primary}
      underlineStyle={styles.underline}
      placeholderTextColor={theme.colors.secondary}
      left={
        <TextInput.Icon
          centered
          icon="calendar-blank-outline"
          // disabled={_.isEmpty(value)}
          iconColor={theme.colors.secondary}
          // onPress={handleSubmitPrompt}
          style={{ transform: isRTL ? [{ scaleX: -1 }] : undefined }}
        />
      }
    />
  );
};

export default DateInput;
