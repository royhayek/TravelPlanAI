// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { View, Image, SafeAreaView, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import MapView, { MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme, Text } from 'react-native-paper';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import BackButton from 'app/src/components/Buttons/Back';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import makeStyles from './styles';
import Marker from '../../components/Marker';
import LocationCard from 'app/src/components/LocationCard';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = ({ navigation, route }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  const destinations = route.params.destinations;

  const mapRef = useRef(null);
  const scrollViewRef = useRef(null);

  const mapIndex = useRef(0);
  let mapAnimation = new Animated.Value(0);

  const initialMapState = {
    markers: destinations,
    region: {
      latitude: destinations[0].coordinates.lat,
      longitude: destinations[1].coordinates.long,
      latitudeDelta: 0.0255,
      longitudeDelta: 0.0255,
    },
  };

  const [state] = useState(initialMapState);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    Platform.OS === 'ios' && scrollViewRef.current.scrollTo({ x: -SPACING_FOR_CARD_INSET, y: 0, animated: true });
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);

      // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex.current !== index) {
          mapIndex.current = index;

          const { coordinates } = state.markers[index];
          mapRef.current.animateToRegion(
            {
              latitude: coordinates.lat,
              longitude: coordinates.long,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 100);
    });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    // if (Platform.OS === 'ios') {
    x = x - SPACING_FOR_CARD_INSET;
    // }

    scrollViewRef.current.scrollTo({ x: x, y: 0, animated: true });
  };
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- RENDER VARS ---------------------- //
  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.4, 1],
      extrapolate: 'clamp',
    });

    return { scale };
  });
  // --------------------- /RENDER VARS ---------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <MapView ref={mapRef} provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={state.region} showsUserLocation>
        {state.markers.map((marker, index) => (
          <Marker key={index} marker={marker} index={index} interpolations={interpolations} onMarkerPress={onMarkerPress} />
        ))}
      </MapView>
      <BackButton style={styles.backBtn} />

      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="center"
        scrollEventThrottle={100}
        style={styles.scrollView}
        snapToInterval={CARD_WIDTH + 20}
        showsHorizontalScrollIndicator={false}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        // contentContainerStyle={{
        //   paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        // }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: mapAnimation } } }], { useNativeDriver: true })}>
        {_.map(destinations, (destination, index) => (
          <LocationCard key={index} location={destination} width={CARD_WIDTH} orientation="horizontal" onMap />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default MapScreen;
