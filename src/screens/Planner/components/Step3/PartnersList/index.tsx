// Packages
import { FlatList, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import React from 'react';
import _ from 'lodash';
// Utilities
import { PARTNERS_LIST } from '../data';
import makeStyles from './styles';

// Component
const PartnersList = ({ value, setValue }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Renderers
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
                  size={ms(24)}
                  name={item.icon}
                  color={isActive ? theme.colors.white : theme.dark ? theme.colors.white : theme.colors.black}
                />
              </View>
              <Text variant="titleMedium" style={styles.title(isActive)}>
                {item.title}
              </Text>
            </View>
            {isActive && <Ionicons name="ios-checkmark-sharp" size={ms(25)} color={theme.colors.primary} />}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default PartnersList;
