import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    input: {
      marginTop: 6,
      maxHeight: 120,
      borderRadius: 8,
      marginBottom: 8,
      fontWeight: '500',
      justifyContent: 'center',
      borderWidth: theme.dark ? 1 : 0,
      borderColor: theme.dark ? theme.colors.inputBg : 'transparent',
      backgroundColor: theme.dark ? 'transparent' : theme.colors.inputBg,
    },
    underline: { display: 'none' },
    inputOutlineStyle: {
      borderRadius: 50,
      borderWidth: 1.5,
    },
  });
