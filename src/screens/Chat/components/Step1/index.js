// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import PopularDestinations from './PopularDestinations';
import DestinationInput from './DestinationInput';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { setPayload } from 'app/src/redux/slices/travelItinerarySlice';
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step1 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleSubmitPrompt = useCallback(
    value => {
      dispatch(setPayload({ destination: value }));
      setActive(1);
    },
    [dispatch, setActive],
  );
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {_t('where_to_go')}
      </Text>
      <DestinationInput handleSubmit={handleSubmitPrompt} />
      <PopularDestinations handleSubmit={handleSubmitPrompt} />
    </View>
  );
};

export default Step1;
