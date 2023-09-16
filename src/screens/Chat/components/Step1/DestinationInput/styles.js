import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
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
    inputOutlineStyle: {
      borderRadius: 50,
      borderWidth: 1.5,
    },
  });
