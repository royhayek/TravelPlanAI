// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import PopularDestinations from './PopularDestinations';
import DestinationInput from './DestinationInput';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step1 = () => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleSubmitPrompt = useCallback(value => {
    console.debug('[handleSubmitPrompt] :: ', value);
  }, []);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View>
      <Text variant="titleLarge" style={styles.title}>
        {_t('where_to_go')}
      </Text>
      <DestinationInput handleSubmit={handleSubmitPrompt} />
      <PopularDestinations handleSubmit={handleSubmitPrompt} />
    </View>
  );
};

export default Step1;
