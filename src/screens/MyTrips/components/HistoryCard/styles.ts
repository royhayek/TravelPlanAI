import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      height: mvs(300),
      borderRadius: ms(16),
      marginBottom: mvs(24),
    },
    horizontalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: mvs(16),
    },
    content: {
      left: 0,
      right: 0,
      bottom: 0,
      margin: ms(16),
      padding: ms(16),
      marginTop: mvs(9),
      borderRadius: ms(16),
      position: 'absolute',
      backgroundColor: theme.colors.background,
    },
    deleteBtn: {
      top: 0,
      right: 0,
      margin: ms(16),
      position: 'absolute',
      borderRadius: ms(8),
    },
    title: {
      color: theme.dark ? theme.colors.white : theme.colors.black,
      marginBottom: mvs(6),
    },
    assistant: {
      marginVertical: mvs(1),
    },
    date: {
      marginTop: mvs(1),
    },
    cityImage: {
      flex: 1,
      borderRadius: ms(24),
    },
    rowContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    infoItemContainer: {
      gap: ms(6),
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
