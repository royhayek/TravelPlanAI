import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: ms(16),
      justifyContent: 'center',
    },
    lottie: {
      width: ms(200),
      height: mvs(200),
    },
    information: {
      textAlign: 'center',
      marginHorizontal: ms(24),
    },
  });
