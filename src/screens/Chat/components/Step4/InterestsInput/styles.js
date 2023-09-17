import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    input: {
      marginTop: 6,
      maxHeight: 120,
      borderRadius: 8,
      fontWeight: '500',
      justifyContent: 'center',
      marginHorizontal: 8,
      // backgroundColor: theme.dark ? theme.colors.backdrop : theme.colors.white,
    },
    underline: { display: 'none' },
    inputOutlineStyle: {
      borderWidth: 1.5,
      borderColor: theme.colors.lightGray,
    },
  });
