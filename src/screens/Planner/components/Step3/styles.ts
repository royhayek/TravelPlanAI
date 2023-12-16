import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: mvs(24),
    },
    title: {
      marginTop: mvs(20),
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: mvs(10),
    },
    subtitle: {
      textAlign: 'center',
      color: theme.colors.secondary,
    },
    firstContent: {
      flex: 1,
      margin: ms(16),
    },
    secondContent: {
      flex: 1,
      margin: ms(24),
    },
    maxDays: {
      marginTop: mvs(6),
      marginHorizontal: ms(5),
      color: theme.dark ? theme.colors.white : theme.colors.black,
    },
    whatMonth: {
      marginTop: mvs(24),
      marginBottom: mvs(16),
    },
  });
