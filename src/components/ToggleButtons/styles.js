import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    container: {
      height: mvs(48),
      marginTop: mvs(24),
      flexDirection: 'row',
      marginHorizontal: ms(16),
    },
    buttonContainer: index => ({
      flex: 1,
      justifyContent: 'center',
      paddingEnd: index === 0 ? 0 : mvs(6),
      paddingStart: index === 0 ? mvs(6) : 0,
      backgroundColor: theme.colors.primaryLight,
      borderTopLeftRadius: index === 0 ? ms(30) : 0,
      borderBottomLeftRadius: index === 0 ? ms(30) : 0,
      borderTopRightRadius: index === 0 ? 0 : ms(30),
      borderBottomRightRadius: index === 0 ? 0 : ms(30),
    }),
    button: active => ({
      borderRadius: ms(30),
      paddingVertical: mvs(10.5),
      backgroundColor: active ? theme.colors.primary : 'transparent',
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
