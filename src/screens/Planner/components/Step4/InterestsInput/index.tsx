// Packages
import { TextInput, useTheme } from 'react-native-paper';
import React, { useCallback } from 'react';
import { Keyboard } from 'react-native';
// Utilities
import makeStyles from './styles';

// Component
const InterestsInput = ({ value, setValue }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Callbacks
  const handleValueChange = useCallback(text => setValue(text), [setValue]);

  // Renderers
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
