import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { useTheme, Text, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectItinerary } from 'app/src/redux/selectors';
import OutlinedButton from 'app/src/components/Buttons/Outlined';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import { Octicons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { DUMMY_ITINERARY } from './data';
import makeStyles from './styles';
import BackButton from 'app/src/components/Buttons/Back';
import { LinearGradient } from 'expo-linear-gradient';

const ItineraryScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const itinerarySelect = useSelector(selectItinerary);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { destination, noOfDays, whoIsGoing } = itinerarySelect.payload || {};

  return (
    <View style={styles.flex1}>
      <View style={styles.mapContainer}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={styles.map}
          // initialRegion={{
          //   latitude: 37.78825,
          //   longitude: -122.4324,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
        />
        <BackButton style={styles.backBtn} />
        <OutlinedButton
          title="Map view"
          containerStyle={styles.mapViewBtn}
          startIcon={<Ionicons name="location-outline" size={20} color={theme.dark ? theme.colors.white : theme.colors.black} />}
        />
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/* <Text variant="bodyMedium">{itinerarySelect.itinerary}</Text> */}
      {/* </ScrollView> */}
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text variant="headlineSmall">
            Your trip to {destination} for {noOfDays} days {whoIsGoing}
          </Text>
          <Text variant="bodyMedium" style={{ marginVertical: 16 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages.
          </Text>
          <Text variant="headlineSmall">Itinerary</Text>

          <List.AccordionGroup>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={itinerarySelect?.itinerary?.days || DUMMY_ITINERARY.days}
              renderItem={({ item }) => {
                return (
                  <List.Accordion title={`${item.name} (${item.date})`} id={item.name}>
                    <View key={item.date} style={{ marginVertical: 10 }}>
                      {_.map(item?.activities, a => (
                        <TouchableOpacity
                          onPress={() => null}
                          style={{
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingStart: 12,
                            paddingVertical: 12,
                            marginHorizontal: 3,
                            elevation: 2,
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.lightGray,
                            // shadowColor: theme.colors.secondary,
                            // shadowOffset: { width: 0, height: 0 },
                            // shadowOpacity: 0.5,
                            // shadowRadius: 1,
                            marginBottom: 10,
                            flexDirection: 'row',
                          }}>
                          <View style={{ flex: 1 }}>
                            <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                              {a.name}
                            </Text>
                            <Text variant="labelLarge">{a.description}</Text>
                            <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
                              {a.address}
                            </Text>
                          </View>
                          <View style={{ justifyContent: 'center', paddingHorizontal: 16 }}>
                            <Octicons name="chevron-right" size={24} color={theme.colors.secondary} />
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </List.Accordion>
                );
              }}
            />
          </List.AccordionGroup>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ItineraryScreen;
