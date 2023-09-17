import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    input: {
      marginTop: 6,
      maxHeight: 120,
      borderRadius: 30,
      marginBottom: 8,
      fontWeight: '500',
      marginHorizontal: 16,
      justifyContent: 'center',
    },
    underline: { display: 'none' },
    inputOutlineStyle: {
      borderRadius: 50,
      borderWidth: 1.5,
    },
  });
