// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { Keyboard } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { isRTL, t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const DestinationInput = ({ handleSubmit }) => {
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
  // ----------------------- RENDERERS ----------------------- //
  return (
    <TextInput
      mode="outlined"
      style={styles.input}
      returnKeyType="send"
      verticalAlign="middle"
      placeholder={_t('search_by')}
      onChangeText={handleValueChange}
      onSubmitEditing={Keyboard.dismiss}
      underlineStyle={styles.underline}
      outlineColor={theme.colors.secondary}
      outlineStyle={styles.inputOutlineStyle}
      activeOutlineColor={theme.colors.primary}
      placeholderTextColor={theme.colors.secondary}
      left={
        <TextInput.Icon
          centered
          icon="magnify"
          disabled={_.isEmpty(value)}
          onPress={handleSubmitPrompt}
          iconColor={theme.colors.secondary}
          style={{ transform: isRTL ? [{ scaleX: -1 }] : undefined }}
        />
      }
    />
  );
};

export default DestinationInput;
