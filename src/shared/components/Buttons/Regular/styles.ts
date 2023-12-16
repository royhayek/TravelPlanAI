import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: disabled => ({
      opacity: disabled ? 0.5 : 1,
    }),
    linearBackground: {
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    title: {
      paddingHorizontal: 3,
      color: theme.colors.white,
    },
    endIcon: {
      marginHorizontal: 8,
    },
  });
