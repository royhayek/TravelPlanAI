// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { I18nManager, Keyboard, Platform, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Stepper from 'react-native-stepper-ui';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import { Octicons } from '@expo/vector-icons';
import BackButton from 'app/src/components/Buttons/Back';
import Usage from 'app/src/components/Usage';
import Step1 from './components/Step1';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { getConversationId, getLanguage, getOwnedSubscription } from 'app/src/redux/selectors';
import { setConversationId, setMessages } from 'app/src/redux/slices/chatSlice';
import { ASSISTANTS } from '../Assistants/data';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const ChatScreen = ({ route, navigation }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();
  const updateConversationId = useCallback(payload => dispatch(setConversationId(payload)), [dispatch]);
  const updateMessages = useCallback(payload => dispatch(setMessages(payload)), [dispatch]);

  const ownedSubscription = useSelector(getOwnedSubscription);
  const conversationId = useSelector(getConversationId);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [openUsageModal, setOpenUsageModal] = useState(false);
  const [active, setActive] = useState(0);

  const routeParams = route.params;
  const isAssistantChat = _.has(routeParams, 'id') && route.params.fromAssistants;
  const assistant = _.find(ASSISTANTS, { id: routeParams?.id });
  const isArabic = I18nManager.isRTL && Platform.OS === 'android';
  const language = useSelector(getLanguage);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleNewConversation = useCallback(() => {
    updateConversationId(null);
    updateMessages([]);
  }, [updateConversationId, updateMessages]);

  const renderUsagePie = useMemo(
    () => !ownedSubscription && <Usage open={openUsageModal} onClose={setOpenUsageModal} radius={14} />,
    [openUsageModal, ownedSubscription],
  );

  const renderNewIcon = useCallback(
    props => <Octicons name="plus" size={22} color={theme.dark ? theme.colors.white : theme.colors.black} />,
    [theme.colors.black, theme.colors.white, theme.dark],
  );

  const renderNewConvoButton = useMemo(
    () => conversationId && <IconButton size={22} onPress={handleNewConversation} icon={renderNewIcon} />,
    [conversationId, handleNewConversation, renderNewIcon],
  );

  const renderHeaderLeft = useCallback(() => (isAssistantChat ? <BackButton /> : renderUsagePie), [isAssistantChat, renderUsagePie]);

  const renderHeaderRight = useCallback(
    () =>
      isAssistantChat ? (
        <>
          {renderUsagePie}
          {renderNewConvoButton}
        </>
      ) : (
        renderNewConvoButton
      ),
    [isAssistantChat, renderNewConvoButton, renderUsagePie],
  );
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //
  useEffect(() => {
    navigation.setOptions({
      headerLeft: isArabic ? renderHeaderRight : renderHeaderLeft,
      headerRight: isArabic ? renderHeaderLeft : renderHeaderRight,
      headerTitle: isAssistantChat && assistant?.name[language],
    });
  }, [assistant?.name, isArabic, isAssistantChat, language, navigation, renderHeaderLeft, renderHeaderRight]);
  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  const steps = [<Step1 title="Step 1" />, <Step1 title="Step 2" />, <Step1 title="Step 3" />];

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View>
        <Stepper
          active={active}
          content={steps}
          onBack={() => setActive(p => p - 1)}
          onFinish={() => console.info('Finish')}
          onNext={() => setActive(p => p + 1)}
        />
        <Step1 />
      </View>
    </View>
  );
};

export default ChatScreen;
