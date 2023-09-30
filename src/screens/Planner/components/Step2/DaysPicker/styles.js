import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      padding: 8,
      height: 50,
      marginTop: 16,
      borderWidth: 1,
      borderRadius: 3,
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
      width: 33,
      height: 33,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDisabled ? theme.colors.lightGray : theme.colors.primary,
    }),
    value: {
      width: 30,
      paddingHorizontal: 10,
    },
  });
