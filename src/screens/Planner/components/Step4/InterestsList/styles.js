import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flatList: {
      marginTop: mvs(20),
    },
    listColumnWrapper: {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    chip: selected => ({
      margin: ms(5),
      backgroundColor: 'transparent',
      borderColor: selected ? theme.colors.primary : theme.colors.lightGray,
    }),
  });
