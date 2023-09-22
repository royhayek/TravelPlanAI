import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: disabled => ({
      opacity: disabled ? 0.5 : 1,
    }),
    linearBackground: {
      borderWidth: 1.2,
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.black,
      backgroundColor: theme.dark ? theme.colors.background : theme.colors.white,
    },
    title: {
      paddingHorizontal: 3,
      color: theme.dark ? theme.colors.white : theme.colors.black,
    },
    endIcon: {
      marginHorizontal: 8,
    },
  });
