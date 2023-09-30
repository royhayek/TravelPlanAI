import React from 'react';
import { Animated } from 'react-native';
import { MapMarker } from 'react-native-maps';
import { useTheme, Text } from 'react-native-paper';
import makeStyles from './styles';

const Marker = ({ marker, index, onMarkerPress, interpolations }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const scaleStyle = { transform: [{ scale: interpolations[index].scale }] };

  const {
    searchResult: {
      geometry: {
        location: { lat, lng },
      },
    },
  } = marker;

  return (
    <MapMarker key={index} coordinate={{ longitude: lng, latitude: lat }} onPress={onMarkerPress}>
      <Animated.View style={[styles.markerWrap]}>
        <Animated.Image source={require('../../../assets/map-pin.png')} style={[styles.marker, scaleStyle]} resizeMode="cover" />
        <Text variant="labelSmall" style={styles.label}>
          {index + 1}
        </Text>
      </Animated.View>
    </MapMarker>
  );
};

export default Marker;
