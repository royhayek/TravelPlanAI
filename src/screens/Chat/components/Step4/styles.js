import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 24,
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
    otherTitle: {
      marginTop: 24,
      marginBottom: 4,
      paddingHorizontal: 8,
    },
    interestsInfo: {
      flexDirection: 'row',
      paddingHorizontal: 4,
      justifyContent: 'space-between',
    },
  });
