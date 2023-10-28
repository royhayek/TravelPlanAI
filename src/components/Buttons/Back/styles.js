import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    container: {
      borderRadius: ms(8),
      borderWidth: ms(1.2),
      marginHorizontal: ms(8),
      borderColor: theme.dark ? theme.colors.white : theme.colors.black,
      backgroundColor: theme.dark ? theme.colors.background : theme.colors.white,
    },
    title: {
      color: theme.colors.white,
      fontWeight: 'bold',
    },
  });
