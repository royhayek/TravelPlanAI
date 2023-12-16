import { ms, mvs } from 'react-native-size-matters';
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
      left: ms(16),
      top: mvs(50),
      color: theme.colors.white,
    },
    scrollView: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: mvs(70),
    },
    activity: width => ({
      width: width,
      elevation: 2,
      overflow: 'hidden',
      borderWidth: ms(1),
      borderRadius: ms(8),
      flexDirection: 'row',
      paddingVertical: mvs(8),
      marginHorizontal: ms(10),
      paddingHorizontal: ms(8),
      borderColor: theme.isDark ? theme.colors.white : 'transparent',
      backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
    }),
    imageContainer: {
      paddingEnd: ms(16),
      justifyContent: 'center',
    },
    image: {
      width: ms(90),
      height: mvs(90),
      borderRadius: ms(8),
      backgroundColor: theme.colors.background,
    },
    descriptionContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    pinNumber: {
      fontWeight: 'bold',
      position: 'absolute',
      color: theme.colors.white,
    },
  });
