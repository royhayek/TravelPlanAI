// Packages
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';
import _ from 'lodash';
// Components
import Accordion from '../../../shared/components/Accordion';
// Utilities
import { selectDestinations } from '../../../redux/slices/destinationsSlice';
import { DUMMY_INFO } from '../data';
import makeStyles from './styles';
// Component
const ListHeader = () => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  const destinationsSelect = useSelector(selectDestinations);

  const itineraryPayload = destinationsSelect?.payload;
  const summary = destinationsSelect?.summary || DUMMY_INFO.summary;
  const tips = destinationsSelect?.tips || DUMMY_INFO.tips;

  const { destination, noOfDays, whoIsGoing } = destinationsSelect.payload || {};

  // Renderers
  return (
    <>
      <View>
        <View style={styles.aiPoweredContainer}>
          <Text variant="bodySmall">This trip is powered by AI</Text>
        </View>

        <Text variant="headlineSmall">
          Your trip to {destination} for {noOfDays} days {whoIsGoing}
        </Text>
        <View style={styles.interestsWrapper}>
          {_.map(itineraryPayload?.interests, i => (
            <View key={i} style={styles.interests}>
              <Text variant="labelSmall" style={{ color: theme.colors.primary }}>
                {i}
              </Text>
            </View>
          ))}
        </View>
        <Text variant="labelLarge" style={styles.destinationInfo}>
          {summary}
        </Text>

        <Accordion title="Tips" markdown>
          {tips}
        </Accordion>

        <Text variant="titleLarge" style={styles.itineraryTitle}>
          Itinerary
        </Text>
      </View>
    </>
  );
};

export default ListHeader;
