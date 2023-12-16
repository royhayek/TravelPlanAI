// Packages
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
// Utilities
import { selectDestinations, destinationsActions } from '../../../../redux/slices/destinationsSlice';
import { selectItinerary, submitForm } from '../../../../redux/slices/itinerarySlice';
import { clearPlaces, selectPlaces } from '../../../../redux/slices/placesSlice';
import { t } from '../../../../app/i18n';
import makeStyles from './styles';

// Component
const _t = (key, options) => t(`planner.${key}`, options);

const Step5 = ({ setActive }) => {
  // Redux
  const placesSelect = useSelector(selectPlaces);
  const itinerarySelect = useSelector(selectItinerary);
  const destinationsSelect = useSelector(selectDestinations);

  // Statics
  const navigation = useNavigation();

  const theme = useTheme();
  const styles = makeStyles(theme);
  const dispatch = useDispatch();

  const isEmptyPlaces = _.isEmpty(placesSelect.places);
  const isEmptyDestinations = _.isEmpty(destinationsSelect.destinations);
  const isEmptySummaryOrTips = _.isEmpty(destinationsSelect.summary) && _.isEmpty(destinationsSelect.tips);

  // Effects
  useEffect(() => {
    console.debug('[itinerarySelect] - Step 5 :: ', { destinationsSelect });
    dispatch(destinationsActions.clearDestinations());
    dispatch(clearPlaces());
    dispatch(submitForm(destinationsSelect.payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    console.debug('[itinerarySelect] - Step 5 :: ', { itinerarySelect });
    if (!itinerarySelect.isLoading && !isEmptyDestinations && !isEmptySummaryOrTips && !isEmptyPlaces) {
      navigation.navigate('Itinerary');
      dispatch(destinationsActions.setPayload({}));
      setActive(0);
    }
  }, [dispatch, isEmptyDestinations, isEmptyPlaces, isEmptySummaryOrTips, itinerarySelect, navigation, setActive]);

  // Renderers
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
