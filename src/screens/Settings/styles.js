import { ms, mvs } from 'react-native-size-matters';
import { isRTL } from '../../config/i18n';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      marginHorizontal: ms(14),
    },
    contentContainer: { paddingBottom: mvs(30) },
    iconAndTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageMenuContent: {
      shadowOpacity: 0.2,
      backgroundColor: theme.colors.background,
    },
    anchor: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
      elevation: 2,
      borderRadius: ms(8),
      marginHorizontal: ms(4),
      paddingVertical: mvs(10),
      paddingHorizontal: ms(16),
      shadowRadius: 3,
      shadowColor: theme.colors.shadow,
      shadowOpacity: theme.dark ? 0.4 : 0,
      shadowOffset: { width: 0, height: 0 },
      backgroundColor: theme.dark ? theme.colors.background : theme.colors.white,
    },
    title: {
      marginVertical: ms(16),
    },
    item: {
      marginVertical: mvs(9),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    endIcon: {
      color: theme.dark ? theme.colors.white : theme.colors.black,
      marginEnd: mvs(15),
    },
    arrowIcon: {
      marginStart: 3,
      transform: isRTL ? [{ rotateY: '180deg' }] : [],
    },
    upgradeContainer: {
      padding: mvs(20),
      borderRadius: ms(12),
      marginVertical: ms(5),
      flexDirection: 'row',
      backgroundColor: theme.colors.primary,
      marginHorizontal: ms(16),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    upgradeTitle: {
      color: theme.colors.white,
      fontWeight: 'bold',
    },
    upgradeDesc: {
      marginTop: mvs(5),
      color: theme.colors.white,
    },
    modalContainer: {
      margin: ms(24),
      shadowOpacity: 0,
      borderRadius: ms(8),
      backgroundColor: theme.colors.background,
    },
    modalHeader: {
      padding: ms(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalHeaderTitle: {
      fontWeight: 'bold',
    },
    modalContent: {
      padding: ms(16),
    },
    planTitle: {
      color: theme.colors.secondary,
      marginBottom: mvs(10),
      fontWeight: 'bold',
    },
    upgradeBtn: {
      height: mvs(46),
      justifyContent: 'center',
      borderRadius: ms(8),
    },
  });
