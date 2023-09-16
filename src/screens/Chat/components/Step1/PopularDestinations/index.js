// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React from 'react';
import { FlatList, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { POPULAR_DESTINATIONS } from '../data';
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const PopularDestinations = ({ handleSubmit }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View>
      <Text variant="titleMedium" style={styles.popularDestText}>
        {_t('popular_destinations')}
      </Text>
      <FlatList
        numColumns={2}
        data={POPULAR_DESTINATIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSubmit(item.name)} style={styles.button}>
            <ImageBackground source={{ uri: item.image }} resizeMode='stretch' imageStyle={styles.imageStyle} style={styles.image}>
              <Text variant="titleMedium" style={styles.name}>
                {item.name}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PopularDestinations;
