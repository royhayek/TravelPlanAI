// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useTheme } from 'react-native-paper';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
import { GOOGLE_MAPS_API_KEY } from 'app/src/redux/actions/itineraryPlacesActions';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const DestinationInput = ({ handleSubmit }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleValueChange = useCallback(
    data => {
      // Split the description by commas to get parts of the address
      const parts = data.description.split(', ');

      // The city is usually the first part in the address
      const city = parts.length > 0 ? parts[0] : '';

      handleSubmit(city);
    },
    [handleSubmit],
  );
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <GooglePlacesAutocomplete
      onPress={handleValueChange}
      placeholder={_t('search_by')}
      enablePoweredByContainer={false}
      query={{
        language: 'en',
        type: '(cities)',
        key: GOOGLE_MAPS_API_KEY,
      }}
      styles={{
        listView: styles.listView,
        textInput: styles.textInput,
      }}
    />
    // <TextInput
    //   theme={{ roundness: 8 }}
    //   style={styles.input}
    //   returnKeyType="send"
    //   verticalAlign="middle"
    //   placeholder={_t('search_by')}
    //   onChangeText={handleValueChange}
    //   onSubmitEditing={Keyboard.dismiss}
    //   underlineStyle={styles.underline}
    //   // outlineColor={theme.colors.secondary}
    //   // outlineStyle={styles.inputOutlineStyle}
    //   activeOutlineColor={theme.colors.primary}
    //   placeholderTextColor={theme.colors.secondary}
    //   left={
    //     <TextInput.Icon
    //       centered
    //       icon="magnify"
    //       color={theme.colors.secondary}
    //       // disabled={_.isEmpty(value)}
    //       // onPress={handleSubmitPrompt}
    //       iconColor={theme.colors.secondary}
    //       style={{ transform: isRTL ? [{ scaleX: -1 }] : undefined }}
    //     />
    //   }
    // />
  );
};

export default DestinationInput;
