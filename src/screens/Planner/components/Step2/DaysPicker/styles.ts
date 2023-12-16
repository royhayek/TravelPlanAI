import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      padding: ms(8),
      height: mvs(50),
      marginTop: mvs(16),
      borderWidth: ms(1),
      borderRadius: ms(3),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: theme.colors.lightGray,
    },
    stepperRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    button: isDisabled => ({
      width: ms(33),
      height: mvs(33),
      borderRadius: ms(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDisabled ? theme.colors.lightGray : theme.colors.primary,
    }),
    value: {
      width: ms(30),
      paddingHorizontal: ms(10),
    },
  });
