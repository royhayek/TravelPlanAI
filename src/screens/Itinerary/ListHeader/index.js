// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { selectDestinations } from 'app/src/redux/selectors';
import { DUMMY_INFO } from '../data';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const ListHeader = ({ toggleTips }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const itinerarySelect = useSelector(selectDestinations);

  const itineraryPayload = itinerarySelect?.payload;
  const summary = itinerarySelect?.summary || DUMMY_INFO.summary;

  const { destination, noOfDays, whoIsGoing } = itinerarySelect.payload || {};
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <>
      <View>
        <View style={styles.noteAndTips}>
          <View style={styles.aiPoweredContainer}>
            <Text variant="bodySmall">This trip is powered by AI</Text>
          </View>
          <Button onPress={toggleTips}>Tips</Button>
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

        <Text variant="titleLarge" style={styles.itineraryTitle}>
          Itinerary
        </Text>
      </View>
    </>
  );
};

export default ListHeader;
