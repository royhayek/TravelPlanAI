// Packages
import { LinearGradient } from 'expo-linear-gradient';
import PT from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';
// Utilities
import makeStyles from './styles';

// Component

const RegularButton = ({ title, onPress, style, startIcon, endIcon, backgroundColors, disabled, ...props }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Renderers
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container(disabled), style]} disabled={disabled} {...props}>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={backgroundColors ?? [theme.colors.primary, theme.colors.primary, theme.colors.darkBlue]}
        style={[styles.linearBackground, style]}>
        {startIcon}
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        {endIcon && <View style={styles.endIcon}>{endIcon}</View>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

RegularButton.propTypes = {
  title: PT.string.isRequired,
  onPress: PT.func.isRequired
};

RegularButton.defaultProps = {
  title: 'Submit',
  onPress: () => null
};

export default RegularButton;
