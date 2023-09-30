import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    lottie: {
      width: 200,
      height: 200,
    },
    information: {
      textAlign: 'center',
      marginHorizontal: 24,
    },
  });
