import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: isActive => ({
      width: 90,
      height: 90,
      borderRadius: 8,
      marginRight: 10,
      borderWidth: 1.8,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: isActive ? theme.colors.primary : theme.colors.lightGray,
    }),
    title: isActive => ({
      marginTop: 10,
      fontWeight: '600',
      color: isActive ? theme.colors.primary : theme.dark ? theme.colors.white : theme.colors.black,
    }),
  });
