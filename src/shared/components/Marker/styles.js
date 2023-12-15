import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    label: {
      fontWeight: 'bold',
      position: 'absolute',
      color: theme.colors.white,
    },
    markerWrap: {
      width: ms(55),
      height: mvs(55),
      alignItems: 'center',
      justifyContent: 'center',
    },
    marker: size => ({
      width: ms(size ?? 40),
      height: mvs(size ?? 40),
    }),
  });
