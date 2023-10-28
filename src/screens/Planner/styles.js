import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    flex1: { flex: 1 },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    divider: { marginTop: 10 },
    input: {
      marginTop: mvs(6),
      maxHeight: mvs(120),
      borderRadius: ms(30),
      marginBottom: mvs(8),
      marginHorizontal: ms(16),
      justifyContent: 'center',
      // backgroundColor: theme.dark ? theme.colors.backdrop : theme.colors.white,
    },
    underline: { display: 'none' },
    stopButton: {
      bottom: 0,
      left: '20%',
      right: '20%',
      position: 'absolute',
      alignItems: 'center',
    },
    inputOutlineStyle: {
      borderRadius: 50,
      borderWidth: 1.5,
    },
    popularDestText: {
      marginVertical: mvs(16),
      marginHorizontal: ms(16),
    },
    footer: {
      paddingVertical: 16,
      flexDirection: 'row',
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
