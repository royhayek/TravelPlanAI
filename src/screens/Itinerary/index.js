import React, { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { useTheme, Text, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectItinerary } from 'app/src/redux/selectors';
import OutlinedButton from 'app/src/components/Buttons/Outlined';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { DUMMY_ITINERARY } from './data';
import makeStyles from './styles';
import BackButton from 'app/src/components/Buttons/Back';

const ItineraryScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const itinerarySelect = useSelector(selectItinerary);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual Google API key
    const apiKey = 'AIzaSyDSlQbEnjmwa44nytAE-PbbSq1cy1fe6KI';

    // Construct the URL for the Google Places API request
    const placeId = 'ChIJ3S8dXl2u5kcRB4Ri3aHpfjE';
    const fields = 'name,formatted_address,photos,rating,opening_hours,types';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Ayasofya, Sultanahmet, Istanbul 34122, Turkey&key=${apiKey}`)
      .then(response => response.json())
      .then(json => {
        console.debug('refreshed place id', json);

        // fetch(apiUrl)
        //   .then(response => response.json())
        //   .then(json => {
        //     console.debug('json', json);
        //   });
      });
  }, []);

  const { destination, noOfDays, whoIsGoing } = itinerarySelect.payload || {};

  return (
    <View style={styles.flex1}>
      <View style={styles.mapContainer}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
        />
        <BackButton style={styles.backBtn} />
        <OutlinedButton
          title="Map view"
          containerStyle={styles.mapViewBtn}
          startIcon={<Ionicons name="location-outline" size={20} color={theme.dark ? theme.colors.white : theme.colors.black} />}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text variant="headlineSmall">
            Your trip to {destination} for {noOfDays} days {whoIsGoing}
          </Text>
          <Text variant="bodyMedium" style={styles.destinationInfo}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages.
          </Text>
          <Text variant="headlineSmall">Itinerary</Text>

          <List.AccordionGroup>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={itinerarySelect?.itinerary?.days || DUMMY_ITINERARY.days}
              renderItem={({ item }) => {
                return (
                  <List.Accordion title={`${item.name} (${item.date})`} id={item.name}>
                    <View key={item.date}>
                      {_.map(item?.activities, a => (
                        <TouchableOpacity onPress={() => null} style={styles.activity}>
                          <View style={styles.imageContainer}>
                            <Image source={{ uri: 'https://picsum.photos/160/160' }} style={styles.image} />
                          </View>
                          <View style={styles.descriptionContainer}>
                            <Text variant="labelLarge">{a.name}</Text>
                            <Text variant="bodySmall">{a.description}</Text>
                            <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
                              {a.address}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </List.Accordion>
                );
              }}
            />
          </List.AccordionGroup>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ItineraryScreen;
