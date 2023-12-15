import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: ms(24),
    },
    title: {
      marginTop: mvs(20),
      marginBottom: mvs(10),
      paddingHorizontal: ms(24),
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      color: theme.colors.secondary,
    },
  });
