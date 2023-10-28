import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    input: {
      height: mvs(50),
      marginTop: mvs(8),
      maxHeight: mvs(120),
      borderRadius: ms(8),
      marginBottom: mvs(8),
      fontSize: RFValue(14),
      fontWeight: 'bold',
      marginHorizontal: ms(4),
      justifyContent: 'center',
      borderWidth: theme.dark ? 1 : 0,
      backgroundColor: theme.dark ? 'transparent' : theme.colors.inputBg,
      borderColor: theme.dark ? theme.colors.inputBg : 'transparent',
    },
    underline: { display: 'none' },
    inputOutlineStyle: {
      borderRadius: ms(50),
      borderWidth: ms(1.5),
    },
  });
