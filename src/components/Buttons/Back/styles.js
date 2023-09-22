import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      borderWidth: 1.2,
      marginHorizontal: 8,
      borderColor: theme.dark ? theme.colors.white : theme.colors.black,
      backgroundColor: theme.dark ? theme.colors.background : theme.colors.white,
    },
    title: {
      color: theme.colors.white,
      fontWeight: 'bold',
    },
  });
