// Packages
import React, { useCallback, useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Animated, FlatList, View } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import _ from 'lodash';
// Components
import OutlinedButton from '../../shared/components/Buttons/Outlined';
import BackButton from '../../shared/components/Buttons/Back';
import Marker from '../../shared/components/Marker';
import DestinationDay from './DestinationDay';
import ListHeader from './ListHeader';
import ExitModal from './ExitModal';
// Utilities
import { selectDestinations } from '../../redux/slices/destinationsSlice';
import { selectPlaces } from '../../redux/slices/placesSlice';
import { DUMMY_DESTINATIONS, DUMMY_PLACES } from './data';
import makeStyles from './styles';
// Component
const HEADER_EXPANDED_HEIGHT = 200;
const HEADER_COLLAPSED_HEIGHT = 48;

const ItineraryScreen = ({ navigation }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [closeModalVisible, setCloseModalVisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState([0]);

  const destionationsSelect = useSelector(selectDestinations);
  const placesSelect = useSelector(selectPlaces);

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

  const handleToggleCloseModal = useCallback(() => setCloseModalVisible(cur => !cur), []);

  const handleSetExpanded = useCallback(index => setExpanded(_.xor(expanded, [index])), [expanded]);

  // Effects
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Renderer Vars
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

  // Renderers
  return (
    <View style={styles.container}>
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
          {_.map(places, (place, index) => place && <Marker index={index} marker={place} interpolations={[]} size={ms(28)} />)}
        </MapView>
        <Animated.View style={styles.headerButtons(headerButtonsOpacity)}>
          <BackButton style={styles.backBtn} onPress={handleToggleCloseModal} />
          <OutlinedButton
            title="Map view"
            onPress={() => handleNavigateToMapView()}
            containerStyle={styles.mapViewBtn}
            startIcon={<Ionicons name="location-outline" size={ms(20)} color={theme.dark ? theme.colors.white : theme.colors.black} />}
          />
        </Animated.View>
      </Animated.View>

      <View style={styles.body}>
        <FlatList
          data={destinations}
          style={styles.flatList}
          scrollEventThrottle={16}
          nestedScrollEnabled={false}
          ListHeaderComponent={<ListHeader />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          renderItem={({ item, index }) => (
            <DestinationDay day={item} index={index} expanded={expanded} setExpanded={() => handleSetExpanded(index)} />
          )}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        />
      </View>

      <ExitModal visible={closeModalVisible} toggle={handleToggleCloseModal} />
    </View>
  );
};

export default ItineraryScreen;
