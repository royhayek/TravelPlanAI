import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    label: {
      fontWeight: 'bold',
      position: 'absolute',
      color: theme.colors.white,
    },
    markerWrap: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 55,
      height: 55,
    },
    marker: {
      width: 40,
      height: 40,
    },
  });
