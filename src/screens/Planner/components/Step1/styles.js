import { mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      marginTop: mvs(20),
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: mvs(10),
    },
  });
