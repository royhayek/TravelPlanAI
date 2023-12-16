// Packages
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import { Fontisto } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import moment from 'moment';
import _ from 'lodash';
// Utilities
import makeStyles from './styles';

// Component
const MonthPicker = ({ value, setValue }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Renderer Vars
  const upcomingMonths = useMemo(() => {
    const months = [];
    const currentMonth = moment();
    const endMonth = moment().add(11, 'month');

    while (endMonth.diff(currentMonth, 'months') >= 0) {
      months.push(currentMonth.format('MMMM'));
      currentMonth.add(1, 'month');
    }

    return months;
  }, []);

  // Renderers
  return (
    <FlatList
      horizontal
      data={upcomingMonths}
      keyExtractor={item => item}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isActive = _.isEqual(value, item);
        return (
          <TouchableOpacity onPress={() => setValue(item)}>
            <View style={styles.container(isActive)}>
              <Fontisto name="date" size={ms(14)} color={isActive ? theme.colors.primary : theme.dark ? theme.colors.white : theme.colors.black} />
              <Text variant="labelMedium" style={styles.title(isActive)}>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default MonthPicker;
