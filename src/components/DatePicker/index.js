// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { useTheme } from 'react-native-paper';
import moment from 'moment';
import XDate from 'xdate';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import makeStyles from './styles';
import { ms } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const DatePicker = ({ onSuccess }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [state, setState] = useState({
    isFromDatePicked: false,
    isToDatePicked: false,
    markedDates: {},
    holidayList: {},
    fromDate: '',
  });
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const setupMarkedDates = useCallback(
    (fromDate, toDate, markedDates) => {
      let mFromDate = new XDate(fromDate);
      let mToDate = new XDate(toDate);

      let range = mFromDate.diffDays(mToDate);

      if (range >= 0) {
        if (range === 0) {
        } else {
          for (let i = 1; i <= range; i++) {
            let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd');
            let dateList = Object.keys(state.markedDates);

            let filterList = dateList.filter(d => d === tempDate);
            if (filterList[0] === tempDate) {
              break;
            } else {
              if (i < range) {
                markedDates[tempDate] = {
                  customStyles: {
                    container: styles.dateStyle,
                    text: styles.textStyle,
                  },
                };
              } else {
                markedDates[tempDate] = {
                  endingDay: true,
                  customStyles: {
                    container: styles.endDateStyle,
                    text: styles.textStyle,
                  },
                };
              }
            }
          }
        }
      }

      return [markedDates, range];
    },
    [state.markedDates, styles.dateStyle, styles.endDateStyle, styles.textStyle],
  );

  const setupStartMarker = useCallback(
    day => {
      let markedDates = {
        [day.dateString]: {
          startingDay: true,
          customStyles: {
            container: styles.startDateStyle,
            text: styles.textStyle,
          },
        },
      };

      let dateList = Object.keys(state.markedDates);

      if (dateList.includes(day.dateString)) {
      } else {
        setState({
          ...state,
          isFromDatePicked: true,
          isToDatePicked: false,
          fromDate: day.dateString,
          markedDates: { ...markedDates, ...state.markedDates },
        });
      }
    },
    [state, styles.startDateStyle, styles.textStyle],
  );

  const handleDayPress = useCallback(
    day => {
      if (!state.isFromDatePicked) {
        setupStartMarker(day);
      } else if (state.isFromDatePicked && state.isToDatePicked) {
        setupStartMarker(day);
        setState({
          isFromDatePicked: false,
          isToDatePicked: false,
          fromDate: day.dateString,
          markedDates: [],
        });
      } else if (!state.isToDatePicked) {
        if (moment(day.toString, 'YYYY-MM-DD').isBefore(moment(state.fromDate, 'YYYY-MM-DD'))) {
          setState({
            isFromDatePicked: false,
            isToDatePicked: false,
            fromDate: '',
            markedDates: {},
          });
        }

        let markedDates = { ...state.markedDates };
        let [mMarkedDates, range] = setupMarkedDates(state.fromDate, day.dateString, markedDates);
        if (range >= 0) {
          setState({
            isFromDatePicked: true,
            isToDatePicked: true,
            markedDates: mMarkedDates,
          });

          onSuccess(state.fromDate, day.dateString);
        } else {
          setupStartMarker(day);
        }
      }
    },
    [onSuccess, setupMarkedDates, setupStartMarker, state.fromDate, state.isFromDatePicked, state.isToDatePicked, state.markedDates],
  );
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <Calendar
      current={state.fromDate}
      markedDates={state.markedDates}
      minDate={moment().format('YYYY-MM-DD')}
      style={styles.calendar}
      onDayPress={day => handleDayPress(day)}
      markingType="custom"
      maxDate={state.fromDate && moment(state.fromDate, 'YYYY-MM-DD').add(6, 'days').format('YYYY-MM-DD')}
      theme={{
        textMonthFontWeight: 'bold',
        arrowColor: theme.colors.white,
        textMonthFontSize: RFValue(14),
        todayButtonFontSize: RFValue(14),
        textDayHeaderFontSize: RFValue(11),
        textDisabledColor: theme.colors.secondary,
        calendarBackground: theme.colors.background,
        textDayStyle: { fontWeight: '500', fontSize: RFValue(14) },
        dayTextColor: theme.dark ? theme.colors.white : theme.colors.black,
        monthTextColor: theme.dark ? theme.colors.white : theme.colors.black,
        arrowStyle: { backgroundColor: theme.colors.primary, borderRadius: ms(50), width: ms(32), alignItems: 'center' },
      }}
    />
  );
};

export default DatePicker;
