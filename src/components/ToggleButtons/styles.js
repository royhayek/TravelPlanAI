import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      height: 48,
      marginTop: 24,
      flexDirection: 'row',
      marginHorizontal: 16,
    },
    buttonContainer: index => ({
      flex: 1,
      justifyContent: 'center',
      paddingStart: index === 0 ? 6 : 0,
      paddingEnd: index === 0 ? 0 : 6,
      backgroundColor: theme.colors.primaryLight,
      borderTopLeftRadius: index === 0 ? 30 : 0,
      borderBottomLeftRadius: index === 0 ? 30 : 0,
      borderTopRightRadius: index === 0 ? 0 : 30,
      borderBottomRightRadius: index === 0 ? 0 : 30,
    }),
    button: active => ({
      borderRadius: 30,
      paddingVertical: 10.5,
      backgroundColor: active ? theme.colors.primary : 'transparent',
      elevation: 1,
      ...(active
        ? {
            shadowColor: theme.colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1,
          }
        : {}),
    }),
    title: active => ({
      textAlign: 'center',
      fontWeight: 'bold',
      color: active || theme.dark ? theme.colors.white : theme.colors.black,
    }),
  });
