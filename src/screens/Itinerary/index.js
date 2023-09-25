// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useEffect, useMemo, useState } from 'react';
import { Animated, FlatList, Image, SafeAreaView, ScrollView, View } from 'react-native';
import MapView, { MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme, Text, List, Button, Badge, Divider, Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import OutlinedButton from 'app/src/components/Buttons/Outlined';
import LocationCard from 'app/src/components/LocationCard';
import BackButton from 'app/src/components/Buttons/Back';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { fetchItineraryPlaces } from 'app/src/redux/actions/itineraryPlacesActions';
import { selectItinerary, selectItineraryPlaces } from 'app/src/redux/selectors';
import { DUMMY_ITINERARY } from './data';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const HEADER_EXPANDED_HEIGHT = 200;
const HEADER_COLLAPSED_HEIGHT = 48;

const ItineraryScreen = ({ navigation }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  const dispatch = useDispatch();

  const [scrollY] = useState(new Animated.Value(0));

  const itinerarySelect = useSelector(selectItinerary);
  const itineraryPlacesSelect = useSelector(selectItineraryPlaces);
  const itineraryPayload = itinerarySelect?.payload;
  const itinerary = itinerarySelect?.itinerary || DUMMY_ITINERARY;
  const itineraryDays = itinerarySelect?.itinerary?.days || DUMMY_ITINERARY.days;

  const destinations = useMemo(
    () =>
      _.reduce(
        itineraryDays,
        (r, v) => {
          return [...r, ...v.activities];
        },
        [],
      ),
    [itineraryDays],
  );

  const { destination, noOfDays, whoIsGoing } = itinerarySelect.payload || {};
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (itineraryDays && _.isEmpty(itineraryPlacesSelect.places)) {
      const addresses = _.reduce(
        itineraryDays,
        (r, v) => {
          if (v.activities) {
            _.forEach(v.activities, a => {
              r.push({ id: a.id, address: a.address });
            });
          }
          return r;
        },
        [],
      );

      console.debug('addresses', addresses);
      dispatch(fetchItineraryPlaces({ addresses }));
    }
  }, [dispatch, itineraryDays, itineraryPlacesSelect]);

  // useEffect(() => {
  //   // Replace 'YOUR_API_KEY' with your actual Google API key
  //   const apiKey = 'AIzaSyDSlQbEnjmwa44nytAE-PbbSq1cy1fe6KI';

  //   // Construct the URL for the Google Places API request
  //   const placeId = 'ChIJ3S8dXl2u5kcRB4Ri3aHpfjE';
  //   const fields = 'name,formatted_address,photos,rating,opening_hours,types';
  //   const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

  // }, []);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleNavigateToMapView = activities => {
    navigation.navigate('Map', { destinations: activities || destinations });
  };
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerButtonsOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.flex1}>
      <Animated.View style={styles.mapContainer(headerHeight)}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: destinations[0].coordinates.lat,
            longitude: destinations[1].coordinates.long,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          }}>
          {_.map(destinations, ({ coordinates: { lat, long } }, index) => (
            <MapMarker key={index} coordinate={{ latitude: lat, longitude: long }}>
              <View style={styles.mapMarkerWrapper}>
                <Image source={require('../../../assets/map-pin.png')} style={styles.mapMarkerImg} />
                <Text variant="labelSmall" style={styles.mapMarkerValue}>
                  {index + 1}
                </Text>
              </View>
            </MapMarker>
          ))}
        </MapView>
        <Animated.View style={styles.headerButtons(headerButtonsOpacity)}>
          <BackButton style={styles.backBtn} />
          <OutlinedButton
            title="Map view"
            onPress={() => handleNavigateToMapView()}
            containerStyle={styles.mapViewBtn}
            startIcon={<Ionicons name="location-outline" size={20} color={theme.dark ? theme.colors.white : theme.colors.black} />}
          />
        </Animated.View>
      </Animated.View>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
          scrollEventThrottle={16}>
          <View
            style={{
              backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
              borderWidth: theme.dark ? 1 : 0,
              borderColor: theme.dark ? theme.colors.secondary : 'transparent',
              borderRadius: 30,
              paddingHorizontal: 10,
              paddingVertical: 6,
              alignSelf: 'flex-start',
              marginBottom: 5,
            }}>
            <Text variant="bodySmall">This trip is powered by AI</Text>
          </View>
          <Text variant="headlineSmall">
            Your trip to {destination} for {noOfDays} days {whoIsGoing}
          </Text>
          <Text variant="labelLarge" style={styles.destinationInfo}>
            {itinerary?.summary}
          </Text>
          <Text variant="titleLarge" style={{ marginVertical: 8 }}>
            Interests
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 }}>
            {_.map(itineraryPayload?.interests, i => (
              <Chip
                compact
                selectedColor={theme.colors.primary}
                style={{
                  borderWidth: 1,
                  borderRadius: 30,
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.primary,
                }}>
                {i}
              </Chip>
            ))}
          </View>

          <Text variant="titleLarge" style={{ marginVertical: 8 }}>
            Itinerary
          </Text>

          {/* <List.AccordionGroup> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={itineraryDays}
            renderItem={({ item }) => (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Text variant="titleMedium">{item.name}</Text>
                  <Button onPress={() => handleNavigateToMapView(item.activities)}>View on Map</Button>
                </View>
                {_.map(item?.activities, (a, i) => (
                  <List.Accordion
                    key={i}
                    style={{
                      backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
                      borderWidth: theme.dark ? 1 : 0,
                      borderColor: theme.dark ? theme.colors.secondary : 'transparent',
                      marginBottom: 10,
                      borderRadius: 8,
                    }}
                    title={
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Badge size={25} style={{ backgroundColor: theme.colors.primary }}>
                          {i + 1}
                        </Badge>
                        <Text style={{ paddingStart: 10 }} variant="titleSmall">
                          {a.name}
                        </Text>
                      </View>
                    }
                    id={a.name}>
                    <LocationCard key={a.name} location={a} vertical />
                  </List.Accordion>
                ))}
                <Divider style={{ marginVertical: 8 }} />
              </View>
            )}
          />
          {/* </List.AccordionGroup> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ItineraryScreen;
