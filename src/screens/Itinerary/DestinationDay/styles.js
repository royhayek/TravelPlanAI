import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    accordionContainer: { flex: 1, marginBottom: 8 },
    titleStyle: {
      borderRadius: ms(8),
      paddingHorizontal: ms(16),
      backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
    },
    title: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    accordion: {
      borderRadius: ms(8),
      marginBottom: mvs(10),
      borderWidth: theme.dark ? 1 : 0,
      backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
      borderColor: theme.dark ? theme.colors.secondary : 'transparent',
    },
    accordionTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    placeTitle: { paddingStart: mvs(10) },
    divider: { marginVertical: mvs(8) },
  });
