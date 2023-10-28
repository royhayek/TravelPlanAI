import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    container: {
      padding: ms(15),
      marginBottom: mvs(15),
      backgroundColor: theme.dark ? theme.colors.backdrop : theme.colors.background,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      borderRadius: ms(5),
      elevation: 3,
    },
    content: {
      flex: 1,
      marginTop: mvs(9),
    },
    title: {
      color: theme.dark ? theme.colors.white : theme.colors.black,
    },
    assistant: {
      marginVertical: 1,
      color: theme.colors.primary,
    },
    date: {
      marginTop: 1,
      color: theme.colors.secondary,
    },
    cityImage: {
      width: '100%',
      aspectRatio: 3 / 2,
      borderRadius: ms(5),
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
