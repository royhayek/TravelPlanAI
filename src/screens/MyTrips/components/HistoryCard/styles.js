import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      padding: 15,
      marginBottom: 15,
      backgroundColor: theme.dark ? theme.colors.backdrop : theme.colors.background,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      borderRadius: 5,
      elevation: 2,
    },
    content: {
      flex: 1,
      marginTop: 9,
    },
    title: {
      fontSize: 18,
      color: theme.dark ? theme.colors.white : theme.colors.black,
    },
    assistant: {
      fontSize: 13,
      marginVertical: 1,
      color: theme.colors.primary,
    },
    date: {
      fontSize: 11,
      marginTop: 1,
      color: theme.colors.secondary,
    },
    cityImage: {
      width: '100%',
      aspectRatio: 3 / 2,
      borderRadius: 5,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
