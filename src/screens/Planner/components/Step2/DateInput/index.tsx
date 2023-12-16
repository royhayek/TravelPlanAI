// Packages
import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import { Keyboard } from 'react-native';
import _ from 'lodash';
// Utilities
import { isRTL } from '../../../../../app/i18n';
import makeStyles from './styles';

// Component
const DateInput = ({ defaultValue }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [value, setValue] = useState();

  // Callbacks
  const handleValueChange = useCallback(text => setValue(text), []);

  // Effects
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Renderers
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
