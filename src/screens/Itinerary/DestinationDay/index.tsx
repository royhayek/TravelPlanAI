// Packages
import { useTheme, Text, List, Button, Badge, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
// Components
import LocationCard from '../../../shared/components/LocationCard';
import Accordion from '../../../shared/components/Accordion';
// Utilities
import { selectDestinations } from '../../../redux/slices/destinationsSlice';
import { selectPlaces } from '../../../redux/slices/placesSlice';
import { DUMMY_DESTINATIONS, DUMMY_PLACES } from '../data';
import makeStyles from './styles';
// Component
const DestinationDay = ({ day, index, expanded, setExpanded }) => {
  // Redux
  const destionationsSelect = useSelector(selectDestinations);
  const placesSelect = useSelector(selectPlaces);

  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const [expandedDays, setExpandedDays] = useState([day.length]);

  const places = placesSelect?.places || DUMMY_PLACES;
  const destinations = destionationsSelect?.destinations || DUMMY_DESTINATIONS;

  // Callbacks
  const handleNavigateToMapView = activities => {
    const mapDestinations = _.map(activities ?? destinations.flat(), i => {
      const place = _.find(places, { id: i.id });
      return { ...i, ...place };
    });
    navigation.navigate('Map', { destinations: mapDestinations });
  };

  const handleOnDayPress = id => setExpandedDays(_.xor(expandedDays, [id]));

  // Effects
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Renderers
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
              <Badge size={ms(25)} style={{ backgroundColor: theme.colors.primary }}>
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
