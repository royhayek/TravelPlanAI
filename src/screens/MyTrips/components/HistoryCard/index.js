// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { IconButton, useTheme, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ms } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import moment from 'moment';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { setConversationId } from 'app/src/redux/slices/destinationsSlice';
import { deleteConversation } from 'app/src/data/localdb';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const HistoryCard = ({ item, index, refresh }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();
  const updateConversationId = useCallback(payload => dispatch(setConversationId(payload)), [dispatch]);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();
  const { cityImage, city, country, plannedDate, guest, duration } = item;
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- CALLBACKS ------------------------ //
  const handleTextPress = useCallback(
    conversation => {
      navigation.navigate('Itinerary');
    },
    [navigation],
  );

  const handleDeleteHistory = useCallback(
    async id => {
      await deleteConversation(id).then(() => console.debug('History Deleted Successfully'));
      refresh(false);
    },
    [refresh],
  );
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  const renderDeleteIcon = useCallback(
    () => <Ionicons name="md-trash" size={RFValue(15)} color={theme.dark ? theme.colors.white : theme.colors.black} />,
    [theme.colors.black, theme.colors.white, theme.dark],
  );

  return (
    <>
      <TouchableOpacity key={index} onPress={() => handleTextPress(item)} style={styles.container}>
        <FastImage source={{ uri: cityImage }} style={styles.cityImage} />
        <View style={styles.content}>
          <View style={styles.rowContainer}>
            <Text variant="labelLarge" style={styles.title}>
              {country}, {city}
            </Text>
            <IconButton
              size={ms(5)}
              mode="contained"
              icon={renderDeleteIcon}
              containerColor={theme.colors.background}
              onPress={() => handleDeleteHistory(item?.id)}
            />
          </View>
          <Text variant="labelMedium" style={styles.assistant}>
            For: {guest?.type} - {guest?.number} {guest?.number > 1 ? 'guests' : 'guest'}
          </Text>
          <Text variant="bodySmall" style={styles.date}>
            {moment(plannedDate).format('ddd M')} - {duration} days long
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default HistoryCard;
