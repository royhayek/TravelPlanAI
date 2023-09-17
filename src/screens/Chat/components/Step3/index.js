// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useMemo, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import moment from 'moment';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import PartnersList from './PartnersList';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
import { PARTNERS_LIST } from './data';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step3 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const currentMonth = moment().format('MMMM');

  const [dateState, setDateState] = useState({ fromDate: '', toDate: '', dateError: '' });
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [activeButton, setActiveButton] = useState('date');
  const [whoIsGoing, setWhoIsGoing] = useState(PARTNERS_LIST[0].title);
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

  const formatMonthDay = useCallback(date => moment(date, 'YYYY-MM-DD').format('MM/DD'), []);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {_t('who_is_coming')}
      </Text>
      <Text variant="titleSmall" style={styles.subtitle}>
        Choose one
      </Text>
      <ScrollView style={styles.firstContent}>
        <PartnersList value={whoIsGoing} setValue={setWhoIsGoing} />
      </ScrollView>
    </View>
  );
};

export default Step3;
