import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flex1: { flex: 1 },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    divider: { marginTop: 10 },
    input: {
      marginTop: 6,
      maxHeight: 120,
      borderRadius: 30,
      marginBottom: 8,
      marginHorizontal: 16,
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
      marginVertical: 16,
      marginHorizontal: 16,
    },
    footer: {
      paddingVertical: 16,
      flexDirection: 'row',
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
