import { scaledFontSize } from 'shared/assets/theme/theme';
import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    valueText: {
      fontSize: scaledFontSize(16),
    },
  });
