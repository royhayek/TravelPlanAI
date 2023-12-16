import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flatList: {
      gap: ms(8),
      marginTop: mvs(20),
    },
    listColumnWrapper: {
      gap: ms(10),
    },
    button: isActive => ({
      flex: 1,
      padding: ms(16),
      height: mvs(80),
      borderRadius: ms(8),
      borderWidth: ms(1.8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: isActive ? theme.colors.primary : theme.colors.lightGray,
    }),
    title: isActive => ({
      marginTop: ms(4),
      color: isActive ? theme.colors.primary : theme.dark ? theme.colors.white : theme.colors.black,
    }),
    iconContainer: isActive => ({
      padding: ms(6),
      borderRadius: ms(50),
      alignSelf: 'flex-start',
      backgroundColor: isActive ? theme.colors.primary : 'transparent',
    }),
  });
