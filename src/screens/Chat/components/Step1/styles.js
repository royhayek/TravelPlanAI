import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 24,
    },
    title: {
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
