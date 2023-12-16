import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    input: {
      fontWeight: 500,
      marginTop: mvs(6),
      maxHeight: mvs(120),
      borderRadius: ms(8),
      marginHorizontal: ms(8),
      justifyContent: 'center',
      // backgroundColor: theme.dark ? theme.colors.backdrop : theme.colors.white,
    },
    underline: { display: 'none' },
    inputOutlineStyle: {
      borderWidth: ms(1.5),
      borderColor: theme.colors.lightGray,
    },
  });
