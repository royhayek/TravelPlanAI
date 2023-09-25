// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import InterestsList from './InterestsList';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { setPayload } from 'app/src/redux/slices/travelItinerarySlice';
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step4 = () => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [interests, setInterests] = useState([]);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleInterestPress = useCallback(interest => setInterests(_.xor(interests, [interest])), [interests]);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    dispatch(setPayload({ interests: interests }));
  }, [dispatch, interests]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {_t('how_to_spend')}
      </Text>
      <Text variant="titleSmall" style={styles.subtitle}>
        Choose as many as you'd like
      </Text>
      <InterestsList value={interests} setValue={handleInterestPress} />
      {/* Phase two */}
      {/* <Text variant="titleMedium" style={styles.otherTitle}>
          Other
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            (optional)
          </Text>
        </Text>
        <InterestsInput value={value} setValue={handleInterestsChange} />
        <View style={styles.interestsInfo}>
          <Text variant="bodySmall" style={styles.maxDays}>
            Separted with a comma
          </Text>
          <Text variant="bodySmall" style={styles.maxDays}>
            0/50
          </Text>
        </View> */}
    </View>
  );
};

export default Step4;
