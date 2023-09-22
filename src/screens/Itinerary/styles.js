import { StatusBar, StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flex1: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.background,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 20,
    },
    scrollView: {
      flex: 1,
      padding: 20,
    },
    mapContainer: {
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    map: {
      width: '100%',
      height: 200,
    },
    backBtn: {
      position: 'absolute',
      left: 16,
      top: 50,
      color: theme.colors.white,
    },
    mapViewBtn: {
      position: 'absolute',
      alignSelf: 'center',
      paddingTop: 24,
      paddingHorizontal: 10,
    },
  });
