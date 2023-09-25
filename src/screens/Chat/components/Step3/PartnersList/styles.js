import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flatList: {
      marginTop: 20,
      gap: 10,
    },
    listColumnWrapper: {
      gap: 10,
    },
    button: isActive => ({
      flex: 1,
      height: 100,
      borderRadius: 8,
      padding: 16,
      borderWidth: 1.8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: isActive ? theme.colors.primary : theme.colors.lightGray,
    }),
    title: isActive => ({
      marginTop: 5,
      fontWeight: '600',
      color: isActive ? theme.colors.primary : theme.dark ? theme.colors.white : theme.colors.black,
    }),
    iconContainer: isActive => ({
      padding: 6,
      alignSelf: 'flex-start',
      borderRadius: 50,
      backgroundColor: isActive ? theme.colors.primary : 'transparent',
    }),
  });
