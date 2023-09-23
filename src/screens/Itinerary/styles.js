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
    destinationInfo: {
      marginVertical: 16,
    },
    activity: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginHorizontal: 3,
      elevation: 2,
      backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
      borderColor: theme.isDark ? theme.colors.white : 'transparent',
      marginBottom: 10,
      flexDirection: 'row',
    },
    imageContainer: {
      paddingEnd: 16,
      justifyContent: 'center',
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 8,
    },
    descriptionContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
  });
