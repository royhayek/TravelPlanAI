import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    input: {
      marginTop: 8,
      maxHeight: 120,
      borderRadius: 8,
      marginBottom: 8,
      fontWeight: 'bold',
      marginHorizontal: 4,
      justifyContent: 'center',
      borderWidth: theme.dark ? 1 : 0,
      backgroundColor: theme.dark ? 'transparent' : theme.colors.inputBg,
      borderColor: theme.dark ? theme.colors.inputBg : 'transparent',
    },
    underline: { display: 'none' },
    inputOutlineStyle: {
      borderRadius: 50,
      borderWidth: 1.5,
    },
  });
