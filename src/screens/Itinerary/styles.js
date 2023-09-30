import { StyleSheet } from 'react-native';

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
    flatList: {
      flex: 1,
      padding: 20,
    },
    mapContainer: height => ({
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    }),
    map: {
      width: '100%',
      height: 200,
    },
    mapMarkerWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapMarkerImg: {
      width: 25,
      height: 25,
      backgroundColor: 'transparent',
    },
    mapMarkerValue: {
      position: 'absolute',
      color: theme.colors.white,
      fontWeight: 'bold',
    },
    backBtn: {
      position: 'absolute',
      left: 16,
      top: 50,
      color: theme.colors.white,
    },
    headerButtons: opacity => ({
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      opacity: opacity,
    }),
    mapViewBtn: {
      position: 'absolute',
      alignSelf: 'center',
      paddingTop: 24,
      paddingHorizontal: 10,
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
      backgroundColor: theme.colors.background,
    },
    descriptionContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    divider: { marginVertical: 8 },
    tipsModalContent: {
      borderRadius: 10,
      marginHorizontal: 24,
      marginVertical: '30%',
      backgroundColor: theme.colors.background,
    },
    tipsTitle: {
      marginTop: 16,
      textAlign: 'center',
    },
    tipsText: { padding: 16 },
    modalContent: {
      backgroundColor: 'white',
      width: '95%',
      paddingVertical: 20,
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      borderRadius: 10,
    },
    modalContentContainer: {
      backgroundColor: 'white',
      padding: 16,
      width: '80%',
    },
    modalTitle: { textAlign: 'center', color: theme.colors.black, fontSize: 18, fontWeight: 'bold' },
    modalDescription: { textAlign: 'center', marginTop: 10, color: theme.colors.gray, marginBottom: 25, fontSize: 16 },
    modalButtonsContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between' },
    gobackButton: {
      borderRadius: 30,
      backgroundColor: theme.colors.black,
      fontWeight: 'bold',
    },
    closeButton: { alignSelf: 'flex-end', marginBottom: 10 },
  });

export const markdownStyles = (theme, isRTL) => ({
  text: {
    ...theme.fonts.labelLarge,
    direction: isRTL ? 'rtl' : 'ltr',
    color: theme.dark ? theme.colors.white : theme.colors.black,
    lineHeight: 23,
  },
  blockquote: {
    ...theme.fonts.labelLarge,
    direction: isRTL ? 'rtl' : 'ltr',
    color: theme.dark ? theme.colors.white : theme.colors.black,
  },
  em: {
    ...theme.fonts.bodySmall,
    color: theme.dark ? theme.colors.white : theme.colors.black,
    direction: isRTL ? 'rtl' : 'ltr',
    fontWeight: '500',
    fontSize: 12.8,
    lineHeight: 19,
  },
  codespan: {
    ...theme.fonts.labelLarge,
    fontWeight: 'bold',
    direction: isRTL ? 'rtl' : 'ltr',
    color: theme.dark ? theme.colors.white : theme.colors.black,
    backgroundColor: theme.dark ? theme.colors.secondaryContainer : 'transparent',
  },
  link: {
    ...theme.fonts.labelLarge,
    direction: isRTL ? 'rtl' : 'ltr',
  },
  code: {
    ...theme.fonts.labelLarge,
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginVertical: 5,
    direction: isRTL ? 'rtl' : 'ltr',
    backgroundColor: theme.dark ? theme.colors.background : theme.colors.white,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: theme.colors.white,
    direction: isRTL ? 'rtl' : 'ltr',
  },
  li: {
    ...theme.fonts.labelLarge,
    flex: 1,
    color: theme.colors.primary,
    direction: isRTL ? 'rtl' : 'ltr',
    marginBottom: 10,
  },
});
