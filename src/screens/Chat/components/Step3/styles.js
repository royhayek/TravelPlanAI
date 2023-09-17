import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      color: theme.colors.secondary,
    },
    firstContent: {
      flex: 1,
      margin: 16,
    },
    secondContent: {
      flex: 1,
      margin: 24,
    },
    maxDays: {
      marginTop: 6,
      marginHorizontal: 5,
      color: theme.dark ? theme.colors.white : theme.colors.black,
    },
    whatMonth: {
      marginTop: 24,
      marginBottom: 16,
    },
  });
