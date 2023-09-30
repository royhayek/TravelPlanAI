// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { IconButton, useTheme, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { setConversationId } from 'app/src/redux/slices/destinationsSlice';
import { deleteConversation } from 'app/src/data/localdb';
import makeStyles from './styles';
import moment from 'moment';

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
      updateConversationId(conversation.id);
      navigation.navigate('ChatStack', { screen: 'Chat' });
    },
    [navigation, updateConversationId],
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
    () => <Ionicons name="md-trash" size={15} color={theme.dark ? theme.colors.white : theme.colors.black} />,
    [theme.colors.black, theme.colors.white, theme.dark],
  );

  return (
    <>
      <TouchableOpacity key={index} onPress={() => handleTextPress(item)} style={styles.container}>
        <Image source={{ uri: cityImage }} style={styles.cityImage} />
        <View style={styles.content}>
          <View style={styles.rowContainer}>
            <Text variant="labelLarge" style={styles.title}>
              {country}, {city}
            </Text>
            <IconButton
              size={5}
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
