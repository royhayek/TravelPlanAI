// Packages
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ms } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
// Utilities
import { GOOGLE_MAPS_API_KEY } from '../../../../../redux/actions/itineraryPlacesActions';
import { t } from '../../../../../app/i18n';
import makeStyles from './styles';

// Component
const _t = (key, options) => t(`planner.${key}`, options);

const DestinationInput = ({ handleSubmit }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Callbacks
  const handleValueChange = useCallback(
    data => {
      console.debug('[handleValueChange] :: ', { data });
      // Split the description by commas to get parts of the address
      const parts = data.description.split(', ');

      // The city is usually the first part in the address
      const city = parts.length > 0 ? parts[0] : '';

      handleSubmit(city);
    },
    [handleSubmit],
  );

  // Renderers
  return (
    <GooglePlacesAutocomplete
      onPress={handleValueChange}
      placeholder={_t('search_by')}
      enablePoweredByContainer={false}
      textInputProps={{
        placeholderTextColor: theme.colors.secondary,
      }}
      query={{
        language: 'en',
        type: '(cities)',
        key: GOOGLE_MAPS_API_KEY,
      }}
      renderLeftButton={() => <Ionicons name="md-search" size={ms(22)} color={theme.colors.secondary} />}
      styles={{
        listView: styles.listView,
        textInput: styles.textInput,
        container: styles.container,
        textInputContainer: styles.textInputContainer,
      }}
    />
  );
};

export default DestinationInput;
