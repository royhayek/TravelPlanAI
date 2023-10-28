// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useEffect, useState } from 'react';
import { useTheme, Text, List, Button, Badge, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import LocationCard from 'app/src/components/LocationCard';
import Accordion from 'app/src/components/Accordion';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { selectDestinations, selectPlaces } from 'app/src/redux/selectors';
import { DUMMY_DESTINATIONS, DUMMY_PLACES } from '../data';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const DestinationDay = ({ day, index, expanded, setExpanded }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const [expandedDays, setExpandedDays] = useState([day.length]);

  const destionationsSelect = useSelector(selectDestinations);
  const placesSelect = useSelector(selectPlaces);

  const places = placesSelect?.places || DUMMY_PLACES;
  const destinations = destionationsSelect?.destinations || DUMMY_DESTINATIONS;
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleNavigateToMapView = activities => {
    const mapDestinations = _.map(activities ?? destinations.flat(), i => {
      const place = _.find(places, { id: i.id });
      return { ...i, ...place };
    });
    navigation.navigate('Map', { destinations: mapDestinations });
  };

  const handleOnDayPress = id => setExpandedDays(_.xor(expandedDays, [id]));
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <Accordion
      expanded={_.includes(expanded, index)}
      setExpanded={setExpanded}
      style={styles.accordionContainer}
      titleStyle={styles.titleStyle}
      title={
        <View style={styles.title}>
          <Text variant="titleMedium">Day {index + 1}</Text>
          <Button onPress={() => handleNavigateToMapView(day)}>View on Map</Button>
        </View>
      }>
      {_.map(day, (a, i) => (
        <List.Accordion
          id={a.id}
          key={a.id}
          onPress={() => handleOnDayPress(a.id)}
          expanded={_.includes(expandedDays, a.id)}
          style={styles.accordion}
          title={
            <View style={styles.accordionTitle}>
              <Badge size={25} style={{ backgroundColor: theme.colors.primary }}>
                {i + 1}
              </Badge>
              <Text style={styles.placeTitle} variant="titleSmall">
                {a.place}
              </Text>
            </View>
          }>
          <LocationCard key={a.id} location={a} vertical />
        </List.Accordion>
      ))}
      {index < destinations.length - 1 && <Divider style={styles.divider} />}
    </Accordion>
  );
};

export default DestinationDay;
