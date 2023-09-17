import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flatList: {
      marginTop: 20,
    },
    button: isActive => ({
      flex: 1,
      height: 110,
      borderRadius: 8,
      margin: 6,
      padding: 16,
      borderWidth: 1.8,
      justifyContent: 'flex-end',
      borderColor: isActive ? theme.colors.primary : theme.colors.lightGray,
    }),
    title: isActive => ({
      marginTop: 6,
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
