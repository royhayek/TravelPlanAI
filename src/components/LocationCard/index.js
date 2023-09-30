// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { View, TouchableOpacity, Platform, Linking } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import makeStyles from './styles';
import { selectPlaces } from 'app/src/redux/selectors';
import { useSelector } from 'react-redux';
import { formatAmount } from 'app/src/helpers';
import { GOOGLE_MAPS_API_KEY } from 'app/src/redux/actions/itineraryPlacesActions';
import { DUMMY_PLACES } from 'app/src/screens/Itinerary/data';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const LocationCard = ({ location, width, onMap, orientation }) => {
  const itineraryPlacesSelect = useSelector(selectPlaces);

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const isHorizontal = _.isEqual(orientation, 'horizontal');

  const theme = useTheme();
  const styles = makeStyles(theme, isHorizontal);

  const places = itineraryPlacesSelect?.places || DUMMY_PLACES;
  const { id, place, desc, address, geometry: { location: { lat = '', long = '' } = {} } = {} } = location;
  const { rating, user_ratings_total, photos = 'https://picsum.photos/160/160' } = _.find(places, { id })?.searchResult || {};
  const image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photo_reference=${photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- CALLBACKS ------------------------ //
  const handleLocationPress = useCallback(() => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${long}`;
    const label = place;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  }, [lat, long, place]);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- RENDER VARS ---------------------- //
  return (
    <TouchableOpacity key={place} onPress={handleLocationPress} style={styles.activity(width)}>
      <View style={styles.imageContainer}>
        <FastImage source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text variant="titleMedium">{place}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text variant="bodyMedium" style={{ marginEnd: 5, color: theme.colors.secondary }}>
            {rating}
          </Text>
          <StarRating
            disabled
            rating={rating}
            maxStars={5}
            halfStarEnabled
            fullStar="star"
            emptyStar="star"
            halfStar="star-half"
            iconSet="FontAwesome"
            starSize={isHorizontal ? 14 : 16}
            fullStarColor={theme.colors.star}
            emptyStarColor={theme.colors.lightGray}
            containerStyle={styles.starRatingContainer}
          />
          <Text variant="bodySmall" style={{ marginStart: 5, color: theme.colors.secondary }}>
            ({formatAmount(user_ratings_total)})
          </Text>
        </View>
        {!onMap && (
          <Text variant="bodySmall" style={styles.description}>
            {desc}
          </Text>
        )}
        <Text variant="labelSmall" style={styles.address}>
          {address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LocationCard;
