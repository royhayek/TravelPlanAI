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
      placeholder={_t('search_by')}
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
          icon="magnify"
          disabled={_.isEmpty(value)}
          iconColor={theme.colors.secondary}
          onPress={handleSubmitPrompt}
          style={{ transform: isRTL ? [{ scaleX: -1 }] : undefined }}
        />
      }
    />
  );
};

export default DestinationInput;
