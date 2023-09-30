// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme, Text, List, Button, Badge, Divider, Modal } from 'react-native-paper';
import { Animated, FlatList, SafeAreaView, View } from 'react-native';
import MapView, { MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-marked';
import { useSelector } from 'react-redux';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import OutlinedButton from 'app/src/components/Buttons/Outlined';
import RegularButton from 'app/src/components/Buttons/Regular';
import LocationCard from 'app/src/components/LocationCard';
import BackButton from 'app/src/components/Buttons/Back';
import ListHeader from './ListHeader';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { DUMMY_INFO, DUMMY_DESTINATIONS, DUMMY_PLACES } from './data';
import { selectDestinations, selectPlaces } from 'app/src/redux/selectors';
import makeStyles, { markdownStyles } from './styles';
import { t } from 'app/src/config/i18n';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const HEADER_EXPANDED_HEIGHT = 200;
const HEADER_COLLAPSED_HEIGHT = 48;

const _t = (key, options) => t(`trip.${key}`, options);

const ItineraryScreen = ({ navigation }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [closeModalVisible, setCloseModalVisible] = useState(false);
  const [tipsVisible, setTipsVisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const destionationsSelect = useSelector(selectDestinations);
  const placesSelect = useSelector(selectPlaces);
  const tips = destionationsSelect?.tips || DUMMY_INFO.tips;

  const places = placesSelect?.places || DUMMY_PLACES;
  const destinations = destionationsSelect?.destinations || DUMMY_DESTINATIONS;
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleNavigateToMapView = activities => {
    const mapDestinations = _.map(activities ?? destinations.flat(), i => {
      const place = _.find(places, { id: i.id });
      return { ...i, ...place };
    });
    navigation.navigate('Map', { destinations: mapDestinations });
  };

  const handleToggleTips = useCallback(() => setTipsVisible(cur => !cur), []);

  const handleLeaveScreen = useCallback(() => navigation.goBack(), [navigation]);

  const handleToggleCloseModal = useCallback(() => setCloseModalVisible(cur => !cur), []);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [handleToggleCloseModal, navigation]);

  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerButtonsOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.flex1}>
      <Animated.View style={styles.mapContainer(headerHeight)}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: _.first(places)?.searchResult.geometry.location.lat,
            longitude: _.first(places)?.searchResult.geometry.location.lng,
            latitudeDelta: 0.025,
            longitudeDelta: 0.025,
          }}>
          {_.map(places, (place, index) => {
            const { lat, lng } = place?.searchResult.geometry.location;
            return (
              <MapMarker key={index} coordinate={{ latitude: lat, longitude: lng }}>
                <View style={styles.mapMarkerWrapper}>
                  <FastImage source={require('../../../assets/map-pin.png')} style={styles.mapMarkerImg} />
                  <Text variant="labelSmall" style={styles.mapMarkerValue}>
                    {index + 1}
                  </Text>
                </View>
              </MapMarker>
            );
          })}
        </MapView>
        <Animated.View style={styles.headerButtons(headerButtonsOpacity)}>
          <BackButton style={styles.backBtn} onPress={handleToggleCloseModal} />
          <OutlinedButton
            title="Map view"
            onPress={() => handleNavigateToMapView()}
            containerStyle={styles.mapViewBtn}
            startIcon={<Ionicons name="location-outline" size={20} color={theme.dark ? theme.colors.white : theme.colors.black} />}
          />
        </Animated.View>
      </Animated.View>
      <SafeAreaView style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={destinations}
          style={styles.flatList}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
          scrollEventThrottle={16}
          ListHeaderComponent={<ListHeader toggleTips={handleToggleTips} />}
          nestedScrollEnabled={false}
          renderItem={({ item, index }) => (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text variant="titleMedium">Day {index + 1}</Text>
                <Button onPress={() => handleNavigateToMapView(item)}>View on Map</Button>
              </View>
              {_.map(item, (a, i) => (
                <List.Accordion
                  id={a.id}
                  key={a.id}
                  style={{
                    backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
                    borderWidth: theme.dark ? 1 : 0,
                    borderColor: theme.dark ? theme.colors.secondary : 'transparent',
                    marginBottom: 10,
                    borderRadius: 8,
                  }}
                  title={
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Badge size={25} style={{ backgroundColor: theme.colors.primary }}>
                        {i + 1}
                      </Badge>
                      <Text style={{ paddingStart: 10 }} variant="titleSmall">
                        {a.place}
                      </Text>
                    </View>
                  }>
                  <LocationCard key={a.id} location={a} vertical />
                </List.Accordion>
              ))}
              {index < destinations.length - 1 && <Divider style={styles.divider} />}
            </>
          )}
        />
      </SafeAreaView>

      <Modal visible={tipsVisible} onDismiss={handleToggleTips} contentContainerStyle={styles.tipsModalContent}>
        <Text variant="titleLarge" style={styles.tipsTitle}>
          Tips
        </Text>
        <Markdown
          value={tips}
          styles={markdownStyles(theme)}
          flatListProps={{
            initialNumToRender: 8,
            style: styles.tipsText,
          }}
        />
      </Modal>

      <Modal visible={closeModalVisible} onDismiss={handleToggleCloseModal} contentContainerStyle={styles.modalContent} animationType="slide">
        <Button onPress={handleToggleCloseModal} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="grey" />
        </Button>

        <Text style={styles.modalTitle}>{_t('save_before_you_go')}</Text>
        <Text style={styles.modalDescription}>{_t('you_havent_saved')}</Text>
        <View style={styles.modalButtonsContainer}>
          <OutlinedButton title={_t('leave')} onPress={handleLeaveScreen} />
          <RegularButton
            style={styles.gobackButton}
            backgroundColors={['black', 'black', 'black']}
            title={_t('go_back')}
            onPress={handleToggleCloseModal}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ItineraryScreen;
