import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    title: {
      color: theme.colors.black,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: mvs(56),
      alignItems: 'center',
    },
    parentHr: {
      height: 1,
      color: theme.colors.black,
      width: '100%',
    },
    child: {
      backgroundColor: theme.colors.background,
      paddingVertical: mvs(8),
    },
  });

export const markdownStyles = (theme, isRTL) => ({
  text: {
    ...theme.fonts.labelLarge,
    direction: isRTL ? 'rtl' : 'ltr',
    color: theme.dark ? theme.colors.white : theme.colors.black,
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
    fontSize: RFValue(12.8),
    lineHeight: RFValue(19),
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
    padding: ms(16),
    borderRadius: ms(8),
    marginVertical: mvs(5),
    direction: isRTL ? 'rtl' : 'ltr',
    backgroundColor: theme.dark ? theme.colors.background : theme.colors.white,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderRadius: ms(2),
    borderColor: theme.colors.white,
    direction: isRTL ? 'rtl' : 'ltr',
  },
  li: {
    ...theme.fonts.labelLarge,
    flex: 1,
    color: theme.colors.primary,
    direction: isRTL ? 'rtl' : 'ltr',
    marginBottom: mvs(10),
  },
});
