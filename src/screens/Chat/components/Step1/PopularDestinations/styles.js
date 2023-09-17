import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flex1: { flex: 1 },
    popularDestText: {
      marginVertical: 16,
      marginHorizontal: 16,
    },
    flatListContainer: { paddingHorizontal: 8 },
    button: {
      flex: 1,
      margin: 8,
    },
    imageStyle: { borderRadius: 8 },
    image: {
      height: 160,
      borderRadius: 8,
      justifyContent: 'flex-end',
    },
    name: {
      fontWeight: '800',
      paddingVertical: 10,
      paddingHorizontal: 5,
      color: theme.colors.white,
    },
  });
