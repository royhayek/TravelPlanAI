// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import ToggleButtons from 'app/src/components/ToggleButtons';
import DatePicker from 'app/src/components/DatePicker';
import MonthPicker from './MonthPicker';
import DaysPicker from './DaysPicker';
import DateInput from './DateInput';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { setPayload } from 'app/src/redux/slices/destinationsSlice';
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step2 = () => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const currentMonth = moment().format('MMMM');

  const [dateState, setDateState] = useState({ fromDate: '', toDate: '', dateError: '' });
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [activeButton, setActiveButton] = useState('date');
  const [noOfDays, setNoOfDays] = useState(4);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const formatMonthDay = useCallback(date => moment(date, 'YYYY-MM-DD').format('MM/DD'), []);

  const handleDatePickerSuccess = useCallback(
    (start, end) => {
      const diffDays = moment(end).diff(moment(start), 'days') + 1;
      setNoOfDays(diffDays);
      setDateState({
        ...dateState,
        fromDate: start,
        toDate: end,
        dateError: '',
      });
    },
    [dateState],
  );
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    const { fromDate, toDate } = dateState;
    dispatch(setPayload({ periodType: activeButton, fromDate, toDate, noOfDays, selectedMonth }));
  }, [noOfDays, dateState, selectedMonth, activeButton, dispatch]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- RENDER VARS ---------------------- //
  const toggleButtons = [
    { key: 'date', title: 'Dates (MM/DD)' },
    { key: 'days', title: 'Number of days' },
  ];
  // --------------------- /RENDER VARS ---------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  const renderContent = useMemo(() => {
    switch (activeButton) {
      case 'days':
        return (
          <ScrollView style={styles.secondContent}>
            <Text variant="titleMedium">How many days?</Text>
            <DaysPicker value={noOfDays} setValue={setNoOfDays} />
            <Text variant="bodySmall" style={styles.maxDays}>
              7 days maximum
            </Text>
            <Text variant="titleMedium" style={styles.whatMonth}>
              During what month?{' '}
              <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
                (optional)
              </Text>
            </Text>
            <MonthPicker value={selectedMonth} setValue={setSelectedMonth} />
          </ScrollView>
        );

      default:
        return (
          <ScrollView style={styles.firstContent}>
            <DateInput
              defaultValue={dateState.fromDate && dateState.toDate && `${formatMonthDay(dateState.fromDate)} - ${formatMonthDay(dateState.toDate)}`}
            />
            <DatePicker onSuccess={handleDatePickerSuccess} errorMessage={dateState?.errorMessage} />
          </ScrollView>
        );
    }
  }, [
    handleDatePickerSuccess,
    dateState?.errorMessage,
    theme.colors.secondary,
    styles.secondContent,
    styles.firstContent,
    dateState.fromDate,
    styles.whatMonth,
    dateState.toDate,
    styles.maxDays,
    formatMonthDay,
    selectedMonth,
    activeButton,
    noOfDays,
  ]);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {_t('when_to_go')}
      </Text>
      <Text variant="titleSmall" style={styles.subtitle}>
        Choose a day/date range, up to 7 days.
      </Text>
      <ToggleButtons buttons={toggleButtons} active={activeButton} setActive={setActiveButton} />
      {renderContent}
    </View>
  );
};

export default Step2;
