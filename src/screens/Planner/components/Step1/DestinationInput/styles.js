import { StyleSheet } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';

export default theme =>
  StyleSheet.create({
    textInput: {
      marginTop: vs(6),
      minHeight: mvs(52),
      borderRadius: ms(8),
      marginBottom: vs(8),
      fontSize: RFValue(14),
      fontWeight: '500',
      justifyContent: 'center',
      borderWidth: theme.dark ? 1 : 0,
      borderColor: theme.dark ? theme.colors.inputBg : 'transparent',
      backgroundColor: theme.dark ? 'transparent' : theme.colors.inputBg,
    },
    listView: {
      borderRadius: ms(8),
      borderWidth: 0.5,
      borderColor: theme.colors.lightGray,
    },
  });
