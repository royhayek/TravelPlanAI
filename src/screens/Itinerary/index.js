import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import makeStyles from './styles';
import { useTheme, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectItinerary } from 'app/src/redux/selectors';

const ItineraryScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const initerarySelect = useSelector(selectItinerary);

  console.debug('initerarySelect', initerarySelect);

  return (
    <SafeAreaView style={styles.flex1}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="bodyMedium">{initerarySelect.itinerary}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ItineraryScreen;
