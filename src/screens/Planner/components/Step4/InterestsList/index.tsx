// Packages
import { Chip, useTheme } from 'react-native-paper';
import { FlatList } from 'react-native';
import React from 'react';
import _ from 'lodash';
// Utilities
import { INTEREST_LIST } from '../data';
import makeStyles from './styles';

// Component
const InterestsList = ({ value, setValue }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Renderers
  return (
    <FlatList
      numColumns={5}
      data={INTEREST_LIST}
      style={styles.flatList}
      keyExtractor={item => item.key}
      columnWrapperStyle={styles.listColumnWrapper}
      renderItem={({ item }) => {
        const selected = _.includes(value, item.title);
        return (
          <Chip
            mode="outlined"
            selected={selected}
            style={styles.chip(selected)}
            onPress={() => setValue(item.title)}
            selectedColor={selected ? theme.colors.primary : theme.dark ? theme.colors.white : theme.colors.black}>
            {item.title}
          </Chip>
        );
      }}
    />
  );
};

export default InterestsList;
