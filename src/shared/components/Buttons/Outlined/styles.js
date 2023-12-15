import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: disabled => ({
      opacity: disabled ? 0.5 : 1,
    }),
    linearBackground: {
      borderWidth: ms(1.2),
      borderRadius: ms(30),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: mvs(10),
      paddingHorizontal: ms(14),
      borderColor: theme.colors.black,
      backgroundColor: theme.dark ? theme.colors.background : theme.colors.white,
    },
    title: {
      paddingHorizontal: ms(3),
      color: theme.dark ? theme.colors.white : theme.colors.black,
    },
    endIcon: {
      marginHorizontal: ms(8),
    },
  });
