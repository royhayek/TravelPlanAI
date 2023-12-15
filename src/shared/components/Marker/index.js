// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { useTheme, Text } from 'react-native-paper';
import { MapMarker } from 'react-native-maps';
import { Animated } from 'react-native';
import React from 'react';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const Marker = ({ marker, index, size, onMarkerPress, interpolations, displayDay }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const { lat, lng } = marker?.searchResult?.geometry?.location;
  const scaleStyle = interpolations && interpolations[index] && { transform: [{ scale: interpolations[index].scale }] };
  // ---------------------- /STATICS ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <MapMarker key={index} coordinate={{ longitude: lng, latitude: lat }} onPress={onMarkerPress}>
      <Animated.View style={[styles.markerWrap]}>
        <Animated.Image source={require('../../../../assets/map-pin.png')} style={[styles.marker(size), scaleStyle]} resizeMode="cover" />
        <Text variant="labelSmall" style={styles.label}>
          {index + 1}
        </Text>
      </Animated.View>
    </MapMarker>
  );
};

export default Marker;
