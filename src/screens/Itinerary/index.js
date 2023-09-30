// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, FlatList, Image, SafeAreaView, ScrollView, View } from 'react-native';
import MapView, { MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme, Text, List, Button, Badge, Divider, Chip, Modal, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'react-native-marked';
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
import { selectDestinations, selectItineraryPlaces } from 'app/src/redux/selectors';
import { DUMMY_INFO, DUMMY_ITINERARY, DUMMY_PLACES } from './data';
import makeStyles, { markdownStyles } from './styles';
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

  const [tipsVisible, setTipsVisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const itinerarySelect = useSelector(selectDestinations);
  const itineraryPlacesSelect = useSelector(selectItineraryPlaces);

  const places = itineraryPlacesSelect?.places || DUMMY_PLACES;
  const itineraryPayload = itinerarySelect?.payload;
  const itinerary = itinerarySelect?.itinerary || DUMMY_ITINERARY;
  const summary = itinerarySelect?.summary || DUMMY_INFO.summary;
  const tips = itinerarySelect?.tips || DUMMY_INFO.tips;

  console.debug('places', places);
  const { destination, noOfDays, whoIsGoing } = itinerarySelect.payload || {};

  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleNavigateToMapView = activities => {
    const destinations = _.map(activities ?? itinerary.flat(), i => {
      const place = _.find(places, { id: i.id });
      return { ...i, ...place };
    });
    navigation.navigate('Map', { destinations: destinations });
  };

  const handleToggleTips = useCallback(() => setTipsVisible(cur => !cur), []);
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
          region={{
            latitude: _.first(places)?.searchResult.geometry.location.lat,
            longitude: _.first(places)?.searchResult.geometry.location.lng,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          }}>
          {_.map(places, (place, index) => {
            const { lat, lng } = place?.searchResult.geometry.location;
            return (
              <MapMarker key={index} coordinate={{ latitude: lat, longitude: lng }}>
                <View style={styles.mapMarkerWrapper}>
                  <Image source={require('../../../assets/map-pin.png')} style={styles.mapMarkerImg} />
                  <Text variant="labelSmall" style={styles.mapMarkerValue}>
                    {index + 1}
                  </Text>
                </View>
              </MapMarker>
            );
          })}
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <View style={styles.aiPoweredContainer}>
              <Text variant="bodySmall">This trip is powered by AI</Text>
            </View>
            <Button onPress={() => setTipsVisible(true)}>Tips</Button>
          </View>
          <Text variant="headlineSmall">
            Your trip to {destination} for {noOfDays} days {whoIsGoing}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {_.map(itineraryPayload?.interests, i => (
              <View
                key={i}
                style={{
                  borderWidth: 0.5,
                  borderRadius: 30,
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                  backgroundColor: 'transparent',
                  borderColor: theme.colors.primary,
                }}>
                <Text variant="labelSmall" style={{ color: theme.colors.primary }}>
                  {i}
                </Text>
              </View>
            ))}
          </View>
          <Text variant="labelLarge" style={styles.destinationInfo}>
            {summary}
          </Text>

          <Text variant="titleLarge" style={{ marginVertical: 8 }}>
            Itinerary
          </Text>

          {/* <List.AccordionGroup> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={itinerary}
            renderItem={({ item, index }) => (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <Text variant="titleMedium">Day {index + 1}</Text>
                  <Button onPress={() => handleNavigateToMapView(item)}>View on Map</Button>
                </View>
                {_.map(item, (a, i) => (
                  <List.Accordion
                    id={a.id}
                    key={a.id}
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
                          {a.place}
                        </Text>
                      </View>
                    }>
                    <LocationCard key={a.id} location={a} vertical />
                  </List.Accordion>
                ))}
                <Divider style={{ marginVertical: 8 }} />
              </View>
            )}
          />
          {/* </List.AccordionGroup> */}
        </ScrollView>
      </SafeAreaView>
      <Modal
        visible={tipsVisible}
        onDismiss={handleToggleTips}
        contentContainerStyle={{ backgroundColor: theme.colors.background, marginHorizontal: 24, marginVertical: '30%', borderRadius: 10 }}>
        <Text variant="titleLarge" style={{ textAlign: 'center', marginTop: 16 }}>
          Tips
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
          <Markdown
            value={tips}
            styles={markdownStyles(theme)}
            flatListProps={{
              initialNumToRender: 8,
              style: styles.answer,
            }}
          />
        </ScrollView>
      </Modal>
    </View>
  );
};

export default ItineraryScreen;
