import { ms } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: ms(16),
      direction: 'ltr',
      backgroundColor: theme.colors.background,
    },
  });
