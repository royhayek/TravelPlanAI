// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
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
      data={PARTNERS_LIST}
      contentContainerStyle={styles.flatList}
      // columnWrapperStyle={styles.listColumnWrapper}
      keyExtractor={item => item.key}
      renderItem={({ item }) => {
        const isActive = _.isEqual(value, item.key);
        return (
          <TouchableOpacity onPress={() => setValue(item.key)} style={styles.button(isActive)}>
            <View>
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
            </View>
            {isActive && <Ionicons name="ios-checkmark-sharp" size={25} color={theme.colors.primary} />}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default PartnersList;
