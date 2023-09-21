// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React from 'react';
import { Chip, useTheme } from 'react-native-paper';
import { FlatList } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { INTEREST_LIST } from '../data';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const InterestsList = ({ value, setValue }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <FlatList
      data={INTEREST_LIST}
      style={styles.flatList}
      keyExtractor={item => item.key}
      contentContainerStyle={styles.flatListContent}
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
