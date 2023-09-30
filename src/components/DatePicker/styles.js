import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    calendar: {
      marginVertical: 16,
    },
    dateStyle: {
      backgroundColor: theme.colors.blueLight,
      width: '100%',
      borderRadius: 0,
    },
    startDateStyle: {
      backgroundColor: theme.colors.primary,
      width: '100%',
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    endDateStyle: {
      backgroundColor: theme.colors.primary,
      width: '100%',
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
    },
    textStyle: {
      color: theme.colors.white,
    },
  });
