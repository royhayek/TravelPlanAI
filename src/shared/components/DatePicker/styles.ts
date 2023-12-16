import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    calendar: {
      marginVertical: mvs(16),
    },
    dateStyle: {
      width: '100%',
      height: mvs(28),
      borderRadius: 0,
      backgroundColor: theme.colors.blueLight,
    },
    startDateStyle: {
      width: '100%',
      height: mvs(28),
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: ms(30),
      borderBottomLeftRadius: ms(30),
      backgroundColor: theme.colors.primary,
    },
    endDateStyle: {
      width: '100%',
      height: mvs(28),
      borderTopRightRadius: ms(30),
      borderBottomRightRadius: ms(30),
      backgroundColor: theme.colors.primary,
    },
    textStyle: {
      color: theme.colors.white,
    },
  });
