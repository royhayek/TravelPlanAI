import { ms } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export default (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: ms(16),
      direction: 'ltr',
      backgroundColor: theme.colors.background
    }
  });
