import { StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: ms(16),
      direction: 'ltr',
      backgroundColor: theme.colors.background,
    },
  });
