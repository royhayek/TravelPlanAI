import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    calendar: {
      marginVertical: mvs(16),
    },
    dateStyle: {
      height: mvs(28),
      backgroundColor: theme.colors.blueLight,
      width: '100%',
      borderRadius: 0,
    },
    startDateStyle: {
      height: mvs(28),
      backgroundColor: theme.colors.primary,
      width: '100%',
      borderTopLeftRadius: ms(30),
      borderBottomLeftRadius: ms(30),
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    endDateStyle: {
      height: mvs(28),
      backgroundColor: theme.colors.primary,
      width: '100%',
      borderTopRightRadius: ms(30),
      borderBottomRightRadius: ms(30),
    },
    textStyle: {
      color: theme.colors.white,
    },
  });
