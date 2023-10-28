import { StyleSheet } from 'react-native';
import { ms, mvs, vs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    flex1: { flex: 1 },
    popularDestText: {
      marginTop: mvs(12),
      marginBottom: mvs(22),
    },
    listColumnWrapper: { gap: ms(10) },
    flatListContainer: { gap: ms(10) },
    button: {
      flex: 1,
      margin: 0,
    },
    imageStyle: { borderRadius: ms(8) },
    image: {
      height: mvs(160),
      borderRadius: ms(8),
      justifyContent: 'flex-end',
    },
    name: {
      marginTop: mvs(6),
      paddingHorizontal: ms(5),
    },
  });
