import React from 'react';
import { Animated } from 'react-native';
import { MapMarker } from 'react-native-maps';
import { useTheme, Text } from 'react-native-paper';
import makeStyles from './styles';

const Marker = ({ marker, index, size, onMarkerPress, interpolations, displayDay }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const scaleStyle = interpolations && interpolations[index] && { transform: [{ scale: interpolations[index].scale }] };

  const { lat, lng } = marker?.searchResult?.geometry?.location;

  return (
    <MapMarker key={index} coordinate={{ longitude: lng, latitude: lat }} onPress={onMarkerPress}>
      <Animated.View style={[styles.markerWrap]}>
        <Animated.Image source={require('../../../assets/map-pin.png')} style={[styles.marker(size), scaleStyle]} resizeMode="cover" />
        <Text variant="labelSmall" style={styles.label}>
          {index + 1}
        </Text>
      </Animated.View>
    </MapMarker>
  );
};

export default Marker;
