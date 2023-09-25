import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flex1: { flex: 1 },
    popularDestText: {
      marginVertical: 16,
    },
    listColumnWrapper: { gap: 10 },
    flatListContainer: { gap: 10 },
    button: {
      flex: 1,
      margin: 0,
    },
    imageStyle: { borderRadius: 8 },
    image: {
      height: 160,
      borderRadius: 8,
      justifyContent: 'flex-end',
    },
    name: {
      // fontWeight: '800',
      marginTop: 6,
      paddingHorizontal: 5,
      // color: theme.colors.white,
    },
  });
