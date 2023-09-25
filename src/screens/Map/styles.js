import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
    backBtn: {
      position: 'absolute',
      left: 16,
      top: 50,
      color: theme.colors.white,
    },
    scrollView: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 70,
    },
    activity: width => ({
      width: width,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginHorizontal: 10,
      elevation: 2,
      backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
      borderColor: theme.isDark ? theme.colors.white : 'transparent',
      flexDirection: 'row',
      overflow: 'hidden',
    }),
    imageContainer: {
      paddingEnd: 16,
      justifyContent: 'center',
    },
    image: {
      width: 90,
      height: 90,
      borderRadius: 8,
      backgroundColor: theme.colors.background,
    },
    descriptionContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    pinNumber: {
      position: 'absolute',
      color: theme.colors.white,
      fontWeight: 'bold',
    },
  });
