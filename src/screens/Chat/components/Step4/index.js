// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import moment from 'moment';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import InterestsList from './InterestsList';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
import InterestsInput from './InterestsInput';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step4 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const currentMonth = moment().format('MMMM');

  const [dateState, setDateState] = useState({ fromDate: '', toDate: '', dateError: '' });
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [activeButton, setActiveButton] = useState('date');
  const [interests, setInterests] = useState([]);
  const [noOfDays, setNoOfDays] = useState(4);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleDatePickerSuccess = useCallback(
    (start, end) => {
      setDateState({
        ...dateState,
        fromDate: start,
        toDate: end,
        dateError: '',
      });
    },
    [dateState],
  );

  const handleInterestPress = useCallback(interest => setInterests(_.xor(interests, [interest])), [interests]);
  // ---------------------- /CALLBACKS ----------------------- //
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
      <ScrollView style={styles.firstContent}>
        <InterestsList value={interests} setValue={handleInterestPress} />
        <Text variant="titleMedium" style={styles.otherTitle}>
          Other
          <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
            (optional)
          </Text>
        </Text>
        <InterestsInput />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
          <Text variant="bodySmall" style={styles.maxDays}>
            Separted with a comma
          </Text>
          <Text variant="bodySmall" style={styles.maxDays}>
            0/50
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Step4;
