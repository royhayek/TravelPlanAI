// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useMemo } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { INTEREST_LIST, PARTNERS_LIST } from '../data';
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
  // ---------------------- RENDER VARS ---------------------- //

  // --------------------- /RENDER VARS ---------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <FlatList
      data={INTEREST_LIST}
      style={styles.flatList}
      contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
      keyExtractor={item => item.key}
      renderItem={({ item }) => {
        const selected = _.includes(value, item);
        return (
          <Chip
            mode="outlined"
            selected={selected}
            onPress={() => setValue(item)}
            selectedColor={selected ? theme.colors.primary : theme.colors.black}
            style={{ margin: 5, backgroundColor: 'transparent', borderColor: selected ? theme.colors.primary : theme.colors.lightGray }}>
            {item.title}
          </Chip>
        );
      }}
    />
  );
};

export default InterestsList;
