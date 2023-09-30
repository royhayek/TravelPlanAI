// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useEffect } from 'react';
import { Text, useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //

// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { selectDestinations, selectItinerary, selectPlaces } from 'app/src/redux/selectors';
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
import { useNavigation } from '@react-navigation/native';
import { clearDestinations, setPayload } from 'app/src/redux/slices/destinationsSlice';
import { submitForm } from 'app/src/redux/slices/itinerarySlice';
import { clearPlaces } from 'app/src/redux/slices/placesSlice';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step5 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const itinerarySelect = useSelector(selectItinerary);
  const destinationsSelect = useSelector(selectDestinations);
  const placesSelect = useSelector(selectPlaces);

  const dispatch = useDispatch();
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const navigation = useNavigation();

  const theme = useTheme();
  const styles = makeStyles(theme);

  const isEmptyDestinations = _.isEmpty(destinationsSelect.destinations);
  const isEmptySummaryOrTips = _.isEmpty(destinationsSelect.summary) && _.isEmpty(destinationsSelect.tips);
  const isEmptyPlaces = _.isEmpty(placesSelect.places);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    console.debug('[itinerarySelect] - Step 5 :: ', { destinationsSelect });
    dispatch(clearDestinations());
    dispatch(clearPlaces());
    dispatch(submitForm(destinationsSelect.payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    console.debug('[itinerarySelect] - Step 5 :: ', { itinerarySelect });
    if (!itinerarySelect.isLoading && !isEmptyDestinations && !isEmptySummaryOrTips && !isEmptyPlaces) {
      navigation.navigate('Itinerary');
      dispatch(setPayload({}));
      setActive(0);
    }
  }, [dispatch, isEmptyDestinations, isEmptyPlaces, isEmptySummaryOrTips, itinerarySelect, navigation, setActive]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <LottieView autoPlay loop style={styles.lottie} source={require('../../../../../assets/planning-animation.json')} />
      <Text variant="labelLarge" style={styles.information}>
        {isEmptyDestinations
          ? "We're curating your adventure! 🌍 Please wait while we gather exciting destinations for your trip"
          : isEmptySummaryOrTips
          ? 'Trip planning in progress! 🗺️ Sit tight while we prepare a summary of your adventure and suggest exciting trips'
          : "Exploring the details! 🏞️ We're fetching places, opening hours, and more details. Just a moment, please!"}
      </Text>
    </View>
  );
};

export default Step5;
