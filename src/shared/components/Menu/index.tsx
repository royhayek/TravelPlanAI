// Packages
import { Menu as RNMenu } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import React from 'react';
import _ from 'lodash';
// Utilities
import makeStyles from './styles';
// Component
const Menu = ({ visible, onDismiss, anchor, items, onItemPress }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Renderers
  return (
    <RNMenu visible={visible} onDismiss={onDismiss} anchorPosition="bottom" contentStyle={styles.content} anchor={anchor}>
      {_.map(items, ({ item, title, leadingIcon }) => (
        <RNMenu.Item key={item} leadingIcon={leadingIcon} onPress={() => onItemPress(item)} title={title} titleStyle={styles.itemTitle} />
      ))}
    </RNMenu>
  );
};

export default Menu;
