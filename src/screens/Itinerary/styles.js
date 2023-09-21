import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flex1: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
  });
