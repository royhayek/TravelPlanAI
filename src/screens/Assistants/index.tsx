// Packages
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useTheme, Text, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';
// Utilities
import { setConversationId, setMessages } from '@redux/slices/destinationsSlice';
import { getLanguage } from '@redux/slices/appSlice';
import { ASSISTANTS } from './data';
import makeStyles from './styles';

// Component
const AssistantsScreen = ({ navigation }) => {
  // Redux
  const dispatch = useDispatch();
  const updateMessages = useCallback((payload) => dispatch(setMessages(payload)), [dispatch]);
  const updateConversationId = useCallback((payload) => dispatch(setConversationId(payload)), [dispatch]);

  const language = useSelector(getLanguage);

  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Callbacks
  const handleAssistantPress = useCallback(
    (id) => {
      updateConversationId(null);
      updateMessages([]);
      navigation.navigate('Chat', { id, fromAssistants: true });
    },
    [navigation, updateConversationId, updateMessages]
  );

  // Renderers
  const renderItem = ({ item, index }) => (
    <>
      <TouchableOpacity key={item?.id} style={styles.question} onPress={() => handleAssistantPress(item.id)}>
        <View style={styles.icon}>{item?.icon}</View>
        <View style={styles.flex1}>
          <Text style={styles.name} variant="titleMedium">
            {item.name[language]}
          </Text>
          <Text variant="labelSmall">{item.description[language]}</Text>
        </View>
      </TouchableOpacity>

      {index !== ASSISTANTS.length - 1 && <Divider style={styles.divider} />}
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList data={ASSISTANTS} style={styles.flatList} contentContainerStyle={styles.contentContainer} renderItem={renderItem} />
    </View>
  );
};

export default AssistantsScreen;
