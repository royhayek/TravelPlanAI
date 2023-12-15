import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: isActive => ({
      width: ms(90),
      height: mvs(90),
      borderRadius: ms(8),
      marginRight: ms(10),
      borderWidth: ms(1.8),
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: isActive ? theme.colors.primary : theme.colors.lightGray,
    }),
    title: isActive => ({
      marginTop: mvs(10),
      fontWeight: '600',
      color: isActive ? theme.colors.primary : theme.dark ? theme.colors.white : theme.colors.black,
    }),
  });
