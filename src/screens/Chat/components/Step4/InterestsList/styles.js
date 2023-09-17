import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flatList: {
      marginTop: 20,
    },
    button: isActive => ({
      borderRadius: 8,
      margin: 4,
      padding: 8,
      borderWidth: 1.8,
      justifyContent: 'center',
      borderColor: isActive ? theme.colors.primary : theme.colors.lightGray,
    }),
    title: isActive => ({
      fontWeight: '600',
      color: isActive ? theme.colors.primary : theme.dark ? theme.colors.white : theme.colors.black,
    }),
    iconContainer: isActive => ({
      padding: 8,
      alignSelf: 'flex-start',
      borderRadius: 50,
      backgroundColor: isActive ? theme.colors.primary : 'transparent',
    }),
  });
