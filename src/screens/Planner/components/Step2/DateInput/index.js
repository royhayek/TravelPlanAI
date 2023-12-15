// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import { Keyboard } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { isRTL } from '../../../../../app/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const DateInput = ({ defaultValue }) => {
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
      style={styles.input}
      returnKeyType="send"
      verticalAlign="middle"
      theme={{ roundness: ms(8) }}
      placeholder={'MM/DD - MM/DD'}
      onChangeText={handleValueChange}
      underlineStyle={styles.underline}
      onSubmitEditing={Keyboard.dismiss}
      outlineColor={theme.colors.secondary}
      outlineStyle={styles.inputOutlineStyle}
      activeOutlineColor={theme.colors.primary}
      placeholderTextColor={theme.colors.secondary}
      left={
        <TextInput.Icon
          centered
          icon="calendar-blank-outline"
          iconColor={theme.colors.secondary}
          style={{ transform: isRTL ? [{ scaleX: -1 }] : undefined }}
        />
      }
    />
  );
};

export default DateInput;
