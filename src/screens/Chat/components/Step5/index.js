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
import { selectItinerary } from 'app/src/redux/selectors';
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
import { fetchTravelItinerary } from 'app/src/redux/actions/travelItineraryActions';
import { useNavigation } from '@react-navigation/native';
import { setPayload } from 'app/src/redux/slices/travelItinerarySlice';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step5 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const itinerarySelect = useSelector(selectItinerary);

  const dispatch = useDispatch();
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const navigation = useNavigation();

  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    console.debug('itinerarySelect.payload', itinerarySelect.payload);
    // console.debug('itinerarySelect.itinerary', Array.from(itinerarySelect.itinerary));
    _.isEmpty(itinerarySelect.itinerary) && dispatch(fetchTravelItinerary(itinerarySelect.payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!itinerarySelect.isLoading && !_.isEmpty(itinerarySelect.itinerary)) {
      navigation.navigate('Itinerary');
      dispatch(setPayload({}));
      setActive(0);
    }
  }, [dispatch, itinerarySelect.isLoading, itinerarySelect.itinerary, navigation, setActive]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <LottieView autoPlay loop style={styles.lottie} source={require('../../../../../assets/planning-animation.json')} />
      <Text variant="labelLarge" style={styles.information}>
        Dubai is a great choice! We're gathering popular things to do, restaurants, adventures and more...
      </Text>
    </View>
  );
};

export default Step5;
