import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, useTheme } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import makeStyles, { markdownStyles } from './styles';
import Markdown from 'react-native-marked';
import _ from 'lodash';

const Accordion = ({ title, style, expanded, setExpanded, children, titleStyle, markdown }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [isExpanded, setIsExpanded] = useState(expanded);

  const accordionRef = useRef();

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(cur => !cur);
    _.isFunction(setExpanded) && setExpanded();
  };

  return (
    <View style={style}>
      <TouchableOpacity ref={accordionRef} style={[styles.row, titleStyle]} onPress={toggleExpand}>
        <Text variant="titleLarge" style={[styles.title, styles.font]}>
          {title}
        </Text>
        <Icon name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={ms(26)} />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {isExpanded && (
        <View style={styles.child}>
          {markdown ? (
            <Markdown
              value={children}
              styles={markdownStyles(theme)}
              flatListProps={{
                initialNumToRender: 8,
                style: styles.tipsText,
                showsVerticalScrollIndicator: false,
              }}
            />
          ) : _.isObject(children) ? (
            children
          ) : (
            <Text>{children}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Accordion;
