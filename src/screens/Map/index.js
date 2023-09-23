import { View, Image, SafeAreaView, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import { DUMMY_ITINERARY } from '../Itinerary/data';
import { useTheme, Text } from 'react-native-paper';
import makeStyles from './styles';
import _ from 'lodash';
import BackButton from 'app/src/components/Buttons/Back';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const destinations = route.params.destinations;
  console.debug('destinations', destinations);

  const initialMapState = {
    markers: destinations,
    region: {
      latitude: destinations[0].coordinates.lat,
      longitude: destinations[1].coordinates.long,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = useState(initialMapState);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinates } = state.markers[index];
          _map.current.animateToRegion(
            {
              latitude: coordinates.lat,
              longitude: coordinates.long,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return { scale };
  });

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const image =
    'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=ATJ83zgeh_b6K1MqH7zGK9mu-kmyEfAsQGZnvVP6SulVkFDQSHrela2hBNVnWDjF9V_oMbBJR4dZ_4HND25wlKNT2H5DSh2k067M2TbGpFTxP8H93lWV_spa0-2NRwxsUkJujwBMxSzOp6wcKDfihBaL5f5F99zR5zhPuIvAEGAsAVosqB8X&key=AIzaSyDSlQbEnjmwa44nytAE-PbbSq1cy1fe6KI';

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <MapView ref={_map} provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={state.region}>
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          return (
            <MapMarker
              key={index}
              coordinate={{ longitude: marker.coordinates.long, latitude: marker.coordinates.lat }}
              onPress={e => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image source={require('../../../assets/map-pin.png')} style={[styles.marker, scaleStyle]} resizeMode="cover" />
                <Text variant="labelSmall" style={{ position: 'absolute', color: theme.colors.white, fontWeight: 'bold' }}>
                  {index}
                </Text>
              </Animated.View>
            </MapMarker>
          );
        })}
      </MapView>
      <BackButton style={styles.backBtn} />

      <SafeAreaView
        style={{
          position: 'absolute',
          bottom: 70,
        }}>
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          pagingEnabled={true}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}>
          {_.map(destinations, i => (
            <TouchableOpacity key={i.name} onPress={() => null} style={styles.activity(CARD_WIDTH)}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=ATJ83zgeh_b6K1MqH7zGK9mu-kmyEfAsQGZnvVP6SulVkFDQSHrela2hBNVnWDjF9V_oMbBJR4dZ_4HND25wlKNT2H5DSh2k067M2TbGpFTxP8H93lWV_spa0-2NRwxsUkJujwBMxSzOp6wcKDfihBaL5f5F99zR5zhPuIvAEGAsAVosqB8X&key=AIzaSyDSlQbEnjmwa44nytAE-PbbSq1cy1fe6KI`,
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.descriptionContainer}>
                <Text variant="labelLarge">{i.name}</Text>
                <Text variant="bodySmall">{i.description}</Text>
                <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
                  {i.address}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MapScreen;
