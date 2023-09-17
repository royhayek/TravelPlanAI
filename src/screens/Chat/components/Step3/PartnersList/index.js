// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { PARTNERS_LIST } from '../data';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const PartnersList = ({ value, setValue }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- RENDER VARS ---------------------- //

  // --------------------- /RENDER VARS ---------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <FlatList
      numColumns={2}
      data={PARTNERS_LIST}
      style={styles.flatList}
      keyExtractor={item => item.key}
      renderItem={({ item }) => {
        const isActive = _.isEqual(value, item.title);
        return (
          <TouchableOpacity onPress={() => setValue(item.title)} style={styles.button(isActive)}>
            <View style={styles.iconContainer(isActive)}>
              <MaterialIcons
                size={26}
                name={item.icon}
                color={isActive ? theme.colors.white : theme.dark ? theme.colors.white : theme.colors.black}
              />
            </View>
            <Text variant="titleMedium" style={styles.title(isActive)}>
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default PartnersList;
