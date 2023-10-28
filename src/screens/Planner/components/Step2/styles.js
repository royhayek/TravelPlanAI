import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      marginTop: mvs(20),
      marginBottom: mvs(10),
      fontWeight: 'bold',
      textAlign: 'center',
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
    footer: {
      paddingVertical: mvs(16),
      flexDirection: 'row',
      paddingHorizontal: ms(24),
      justifyContent: 'space-between',
    },
  });
