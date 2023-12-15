// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from '../../../../../app/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.step2.${key}`, options);

const DaysPicker = ({ value, setValue }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const isMinusDisabled = value === 1;
  const isPlusDisabled = value === 7;
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={{ color: theme.colors.secondary }}>
        {_t('noOfDays')}
      </Text>
      <View style={styles.stepperRow}>
        <TouchableOpacity disabled={isMinusDisabled} onPress={() => setValue(d => d - 1)} style={styles.button(isMinusDisabled)}>
          <Text variant="headlineSmall" style={{ color: theme.colors.white }}>
            -
          </Text>
        </TouchableOpacity>
        <Text variant="titleMedium" style={styles.value}>
          {value}
        </Text>
        <TouchableOpacity disabled={isPlusDisabled} onPress={() => setValue(d => d + 1)} style={styles.button(isPlusDisabled)}>
          <Text variant="headlineSmall" style={{ color: theme.colors.white }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DaysPicker;
