// Packages
import CircularProgress from 'react-native-circular-progress-indicator';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import PT from 'prop-types';
// Utilities
import { getConfiguration, getMessagesCount } from '@redux/selectors';
import { isRTL } from '@app/i18n';
import useStyles from './styles';

// Component
const Pie = ({ radius, hasSuffix, activeStrokeWidth, inActiveStrokeWidth }) => {
  // Redux
  const messagesCount = useSelector(getMessagesCount);
  const config = useSelector(getConfiguration);

  // Statics
  const theme = useTheme();
  const styles = useStyles(theme);

  const dailyMessagesLimit = config?.other?.dailyMessagesLimit;
  const suffix = ` / ${dailyMessagesLimit}`;
  const availableMsgsCount = useMemo(() => dailyMessagesLimit - messagesCount, [dailyMessagesLimit, messagesCount]);

  // Renderers
  return (
    <CircularProgress
      radius={radius}
      value={availableMsgsCount}
      maxValue={dailyMessagesLimit}
      inActiveStrokeOpacity={0.5}
      valueSuffixStyle={styles.valueText}
      valuePrefixStyle={styles.valueText}
      activeStrokeWidth={activeStrokeWidth}
      activeStrokeColor={theme.colors.primary}
      inActiveStrokeWidth={inActiveStrokeWidth}
      valuePrefix={hasSuffix && isRTL ? suffix : ''}
      valueSuffix={hasSuffix && !isRTL ? suffix : ''}
      progressValueColor={theme.dark ? theme.colors.white : theme.colors.black}
      inActiveStrokeColor={theme.dark ? theme.colors.pieBlue : theme.colors.secondary}
    />
  );
};

Pie.propTypes = {
  radius: PT.number.isRequired,
  hasSuffix: PT.bool
};

Pie.defaultProps = {
  radius: 30,
  hasSuffix: false
};

export default Pie;
