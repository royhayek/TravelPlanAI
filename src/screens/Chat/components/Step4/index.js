// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import InterestsInput from './InterestsInput';
import InterestsList from './InterestsList';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step4 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [interests, setInterests] = useState([]);
  const [value, setValue] = useState([]);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleInterestPress = useCallback(interest => setInterests(_.xor(interests, [interest])), [interests]);

  const handleInterestsChange = useCallback(interest => {
    setValue(interest);

    const interestsArray = interest.split(', ');
    _.forEach(interestsArray, i => !!String(i).match());
    setInterests();
  }, []);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  console.log('interests', interests);

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
      <ScrollView style={styles.firstContent}>
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
      </ScrollView>
    </View>
  );
};

export default Step4;
