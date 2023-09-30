// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme, Modal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import PopularDestinations from './PopularDestinations';
import DestinationInput from './DestinationInput';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { setPayload } from 'app/src/redux/slices/destinationsSlice';
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
import { selectDestinations } from 'app/src/redux/selectors';
import { useNavigation } from '@react-navigation/native';
import OutlinedButton from 'app/src/components/Buttons/Outlined';
import RegularButton from 'app/src/components/Buttons/Regular';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);
const _trans = (key, options) => t(`trip.${key}`, options);

const Step1 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();
  const itinerarySelect = useSelector(selectDestinations);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleSubmitPrompt = useCallback(
    value => {
      dispatch(setPayload({ destination: value }));
      setActive(1);
    },
    [dispatch, setActive],
  );

  // useEffect(() => {
  //   console.debug('initerarySelect', itinerarySelect);
  //   console.debug('itinerarySelect.itinerary[0]', JSON.parse(itinerarySelect.itinerary));
  // }, []);

  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (itinerarySelect?.itinerary) {
      console.debug('itinerarySelect?.itinerary', itinerarySelect?.itinerary);
    }
  }, [itinerarySelect?.itinerary]);

  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          {_t('where_to_go')}
        </Text>
        <Button onPress={() => setVisible(true)}>Open Modal</Button>
        <Button onPress={() => navigation.navigate('Itinerary')}>Go To Itinerary</Button>
        <DestinationInput handleSubmit={handleSubmitPrompt} />
        <PopularDestinations handleSubmit={handleSubmitPrompt} />
      </View>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent} animationType="slide">
        <Button onPress={hideModal} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="grey" />
        </Button>

        <Text style={styles.modalTitle}>{_trans('save_before_you_go')}</Text>
        <Text style={styles.modalDescription}>{_trans('you_havent_saved')}</Text>
        <View style={styles.modalButtonsContainer}>
          <OutlinedButton title={_trans('leave')} onPress={hideModal} />
          <RegularButton style={styles.gobackButton} backgroundColors={['black', 'black', 'black']} title={_trans('go_back')} onPress={hideModal} />
        </View>
      </Modal>
    </>
  );
};

export default Step1;
