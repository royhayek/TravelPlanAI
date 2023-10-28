import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    flatList: {
      marginTop: mvs(20),
      gap: ms(10),
    },
    listColumnWrapper: {
      gap: ms(10),
    },
    button: isActive => ({
      flex: 1,
      height: mvs(100),
      borderRadius: ms(8),
      padding: ms(16),
      borderWidth: ms(1.8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: isActive ? theme.colors.primary : theme.colors.lightGray,
    }),
    title: isActive => ({
      marginTop: ms(5),
      fontWeight: '600',
      color: isActive ? theme.colors.primary : theme.dark ? theme.colors.white : theme.colors.black,
    }),
    iconContainer: isActive => ({
      padding: ms(6),
      alignSelf: 'flex-start',
      borderRadius: ms(50),
      backgroundColor: isActive ? theme.colors.primary : 'transparent',
    }),
  });
