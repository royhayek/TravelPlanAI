// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
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
import { selectItinerary } from 'app/src/redux/selectors';
import { useNavigation } from '@react-navigation/native';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step1 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();
  const itinerarySelect = useSelector(selectItinerary);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();
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

  // useEffect(() => {
  //   console.debug('initerarySelect', itinerarySelect);
  //   console.debug('itinerarySelect.itinerary[0]', JSON.parse(itinerarySelect.itinerary));
  // }, []);

  useEffect(() => {
    if (itinerarySelect?.itinerary) {
      console.debug('itinerarySelect?.itinerary', itinerarySelect?.itinerary);
    }
  }, [itinerarySelect?.itinerary]);

  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {_t('where_to_go')}
      </Text>
      <Button onPress={() => navigation.navigate('Itinerary')}>Go To Itinerary</Button>
      <DestinationInput handleSubmit={handleSubmitPrompt} />
      <PopularDestinations handleSubmit={handleSubmitPrompt} />
    </View>
  );
};

export default Step1;
