import { ms } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    content: {
      margin: ms(5),
      padding: ms(5),
      shadowOpacity: 0.2,
      backgroundColor: theme.colors.background,
    },
    itemTitle: {
      ...theme.fonts.labelMedium,
    },
  });
