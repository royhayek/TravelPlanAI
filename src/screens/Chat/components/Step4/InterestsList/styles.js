import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    flatList: {
      marginTop: 20,
    },
    flatListContent: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    chip: selected => ({
      margin: 5,
      backgroundColor: 'transparent',
      borderColor: selected ? theme.colors.primary : theme.colors.lightGray,
    }),
  });
