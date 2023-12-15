// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { View, TouchableOpacity, Platform, Linking } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image';
import { ms } from 'react-native-size-matters';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { GOOGLE_MAPS_API_KEY } from '../../../redux/actions/itineraryPlacesActions';
import { selectPlaces } from '../../../redux/slices/placesSlice';
import { DUMMY_PLACES } from '../../../screens/Itinerary/data';
import { formatAmount } from '../../../shared/utils';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const LocationCard = ({ location, width, onMap, orientation }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const itineraryPlacesSelect = useSelector(selectPlaces);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const isHorizontal = _.isEqual(orientation, 'horizontal');

  const theme = useTheme();
  const styles = makeStyles(theme, isHorizontal);

  const places = itineraryPlacesSelect?.places || DUMMY_PLACES;
  const { id, place, desc, address, geometry: { location: { lat = '', long = '' } = {} } = {} } = location;
  const { rating, user_ratings_total, photos = 'https://picsum.photos/160/160' } = _.find(places, { id })?.searchResult || {};
  const image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photo_reference=${photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;
  // ---------------------- /STATICS ------------------------- //
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
  // ----------------------- RENDERERS ----------------------- //
  return (
    <TouchableOpacity key={place} onPress={handleLocationPress} style={styles.activity(width)}>
      <View style={styles.imageContainer}>
        <FastImage source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text variant="titleMedium">{place}</Text>
        <View style={styles.ratingInfoContainer}>
          <Text variant="bodyMedium" style={styles.rating}>
            {rating}
          </Text>
          <StarRating
            disabled
            maxStars={5}
            rating={rating}
            halfStarEnabled
            fullStar="star"
            emptyStar="star"
            halfStar="star-half"
            iconSet="FontAwesome"
            fullStarColor={theme.colors.star}
            emptyStarColor={theme.colors.lightGray}
            starSize={isHorizontal ? ms(14) : ms(16)}
            containerStyle={styles.starRatingContainer}
          />
          <Text variant="bodySmall" style={styles.userRatingTotal}>
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
