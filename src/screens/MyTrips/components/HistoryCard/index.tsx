// Packages
import { Ionicons, Feather, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { IconButton, useTheme, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ms, mvs } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
// Components
import Menu from '../../../../shared/components/Menu';
// Utilities
import { PARTNERS_LIST } from '../../../Planner/components/Step3/data';
import { setConversationId } from '../../../../redux/slices/destinationsSlice';
import { deleteConversation } from '../../../../shared/services/localdb';
import makeStyles from './styles';
// Component
const HistoryCard = ({ small, item, index, refresh }) => {
  // Redux
  const dispatch = useDispatch();
  const updateConversationId = useCallback((payload) => dispatch(setConversationId(payload)), [dispatch]);

  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();

  const [openOptionsMenu, setOpenOptionsMenu] = useState(false);

  const { cityImage, city, country, plannedDate, guest, duration } = item;

  const partner = _.find(PARTNERS_LIST, { key: guest.type });

  // Callbacks
  const handleTextPress = useCallback(
    (conversation) => {
      navigation.navigate('Itinerary');
    },
    [navigation]
  );

  const handleDeleteHistory = useCallback(
    async (id) => {
      await deleteConversation(id).then(() => console.debug('History Deleted Successfully'));
      refresh(false);
    },
    [refresh]
  );

  const toggleOptionsMenu = useCallback(() => setOpenOptionsMenu((cur) => !cur), []);

  // Renderers
  const renderDeleteIcon = useCallback(
    () => <Ionicons name="md-trash" size={ms(16)} color={theme.dark ? theme.colors.white : theme.colors.black} />,
    [theme.colors.black, theme.colors.white, theme.dark]
  );

  const renderMenuIcon = useCallback(
    () => <MaterialCommunityIcons name="dots-vertical" size={ms(18)} color={theme.dark ? theme.colors.white : theme.colors.black} />,
    [theme.colors.black, theme.colors.white, theme.dark]
  );

  return small ? (
    <TouchableOpacity key={index} onPress={() => handleTextPress(item)} style={styles.horizontalContainer}>
      <FastImage source={require('../../../../../assets/paris.jpeg')} style={{ width: ms(70), height: ms(70), borderRadius: ms(16) }} />
      <View style={{ marginHorizontal: ms(10), flex: 1 }}>
        <Text variant="labelLarge" style={styles.title}>
          {country}, {city}
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.infoItemContainer}>
            <MaterialIcons size={ms(15)} name={partner?.icon} color={theme.dark ? theme.colors.white : theme.colors.black} />
            <Text variant="labelSmall" style={styles.assistant}>
              {partner?.title}
            </Text>
          </View>
          {/* <View style={{ width: 1, height: 17, backgroundColor: theme.colors.gray }} />
          <Text variant="bodySmall" style={styles.date}>
            {moment(plannedDate).format('ddd M')} - {duration}
          </Text> */}
          <Entypo name="dot-single" size={ms(20)} style={{ marginHorizontal: ms(2) }} />
          <View style={styles.infoItemContainer}>
            <MaterialIcons size={ms(15)} name="date-range" color={theme.dark ? theme.colors.white : theme.colors.black} />
            <Text variant="labelSmall" style={styles.date}>
              March 6th, 2023
            </Text>
          </View>
        </View>
      </View>
      <Menu
        visible={openOptionsMenu}
        onDismiss={toggleOptionsMenu}
        items={[
          {
            item: '1',
            title: 'Regenerate',
            leadingIcon: () => <Ionicons name="refresh" size={ms(22)} color={theme.dark ? theme.colors.white : theme.colors.black} />
          },
          {
            item: '2',
            title: 'Share',
            leadingIcon: () => <Ionicons name="share-outline" size={ms(22)} color={theme.dark ? theme.colors.white : theme.colors.black} />
          },
          {
            item: '3',
            title: 'Delete',
            leadingIcon: () => <Ionicons name="trash-outline" size={ms(22)} color={theme.dark ? theme.colors.white : theme.colors.black} />
          }
        ]}
        onItemPress={() => null}
        anchor={<IconButton size={ms(20)} icon={renderMenuIcon} onPress={toggleOptionsMenu} style={{ borderRadius: ms(8) }} />}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity key={index} onPress={() => handleTextPress(item)} style={styles.container}>
      <ImageBackground
        source={require('../../../../../assets/paris.jpeg')}
        style={styles.cityImage}
        resizeMode="stretch"
        imageStyle={{ borderRadius: ms(16) }}>
        <IconButton
          size={ms(20)}
          mode="contained"
          icon={renderDeleteIcon}
          style={styles.deleteBtn}
          containerColor={theme.colors.background}
          onPress={() => handleDeleteHistory(item?.id)}
        />

        <View style={styles.content}>
          <Text variant="labelLarge" style={styles.title}>
            {country}, {city}
          </Text>
          <View style={styles.rowContainer}>
            <View style={styles.infoItemContainer}>
              <MaterialIcons size={ms(20)} name={partner?.icon} color={theme.dark ? theme.colors.white : theme.colors.black} />
              <Text variant="labelMedium" style={styles.assistant}>
                {partner?.title}
              </Text>
            </View>
            {/* <View style={{ width: 1, height: 18, backgroundColor: theme.colors.gray }} />
            <Text variant="bodySmall" style={styles.date}>
              {moment(plannedDate).format('ddd M')} - {duration}
            </Text> */}
            <Entypo name="dot-single" size={ms(20)} style={{ marginHorizontal: ms(2) }} />
            <View style={styles.infoItemContainer}>
              <Feather size={ms(20)} name="calendar" color={theme.dark ? theme.colors.white : theme.colors.black} />
              <Text variant="bodySmall" style={styles.date}>
                March 6th, 2023
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default HistoryCard;
