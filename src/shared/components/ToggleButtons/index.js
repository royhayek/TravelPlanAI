// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { TouchableWithoutFeedback, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const ToggleButtons = ({ buttons, active, setActive }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      {_.map(buttons, (button, index) => {
        const isActive = _.isEqual(button.key, active);
        return (
          <TouchableWithoutFeedback key={button.key} onPress={() => setActive(button.key)}>
            <View style={styles.buttonContainer(index)}>
              <View style={styles.button(isActive)}>
                <Text variant="bodySmall" style={styles.title(isActive)}>
                  {button.title}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

export default ToggleButtons;
