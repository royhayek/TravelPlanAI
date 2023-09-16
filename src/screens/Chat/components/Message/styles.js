import { StyleSheet } from 'react-native';

export default (theme, isRTL) =>
  StyleSheet.create({
    question: {
      padding: 15,
      marginVertical: 7,
      alignSelf: 'flex-end',
      marginHorizontal: 14,
      borderTopEndRadius: 18,
      borderTopStartRadius: 18,
      borderBottomEndRadius: 2,
      borderBottomStartRadius: 18,
      backgroundColor: '#2C2C2C',
    },
    questionText: {
      ...theme.fonts.labelLarge,
      color: theme.colors.white,
      lineHeight: 23,
    },
    answer: {
      direction: isRTL ? 'rtl' : 'ltr',
      marginVertical: 7,
      marginHorizontal: 14,
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderTopStartRadius: 2,
      borderTopEndRadius: 18,
      borderBottomEndRadius: 18,
      borderBottomStartRadius: 18,
      backgroundColor: theme.dark ? theme.colors.backdrop : theme.colors.lightGray,
    },
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
    fontWeight: 'bold',
    color: theme.colors.secondary,
    direction: isRTL ? 'rtl' : 'ltr',
  },
});
