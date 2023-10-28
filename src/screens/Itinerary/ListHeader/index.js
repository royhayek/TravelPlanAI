// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { selectDestinations } from 'app/src/redux/selectors';
import { DUMMY_INFO } from '../data';
import makeStyles from './styles';
import Accordion from 'app/src/components/Accordion';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const ListHeader = () => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const destinationsSelect = useSelector(selectDestinations);

  const itineraryPayload = destinationsSelect?.payload;
  const summary = destinationsSelect?.summary || DUMMY_INFO.summary;
  const tips = destinationsSelect?.tips || DUMMY_INFO.tips;

  const { destination, noOfDays, whoIsGoing } = destinationsSelect.payload || {};
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
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
