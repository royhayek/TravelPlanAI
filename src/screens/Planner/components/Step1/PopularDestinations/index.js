// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ /
import makeStyles from './styles';
import { t } from '../../../../../app/i18n';
import { fetchDestinations } from '../../../../../redux/actions/destinationActions';
import { selectPopularDestinations } from '../../../../../redux/slices/destinationsSlice';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const PopularDestinations = ({ handleSubmit }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();

  const popularDestinations = useSelector(selectPopularDestinations);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- EFFECTS ------------------------- //
  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.flex1}>
      <Text variant="titleMedium" style={styles.popularDestText}>
        {_t('popular_destinations')}
      </Text>
      <FlatList
        numColumns={2}
        data={popularDestinations}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={styles.listColumnWrapper}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity key={item._id} onPress={() => handleSubmit(item.name)} style={styles.button}>
            <FastImage
              source={`http://localhost:4000/uploads/destination/${item.image}`}
              resizeMode="cover"
              imageStyle={styles.imageStyle}
              style={styles.image}
            />
            <Text variant="titleSmall" style={styles.name}>
              {item.name}
            </Text>
            <Text variant="labelMedium" style={styles.country}>
              {item.country}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PopularDestinations;
