// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useMemo, useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import RegularButton from 'app/src/components/Buttons/Regular';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const ChatScreen = () => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [active, setActive] = useState(0);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleBackPress = useCallback(() => setActive(a => a - 1), [setActive]);

  const handleNextPress = useCallback(() => {
    // const { fromDate, toDate } = dateState;
    // console.info('[handleNextPress] :: ', { payload: { fromDate, toDate, selectedMonth, noOfDays } });

    setActive(a => a + 1);
  }, []);

  const handleSubmitPress = useCallback(() => {
    setActive(a => a + 1);
  }, []);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //

  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ---------------------- RENDER VARS ---------------------- //
  const steps = [<Step1 setActive={setActive} />, <Step2 />, <Step3 />, <Step4 />, <Step5 setActive={setActive} />];

  const isBeforeLastStep = _.isEqual(active, steps.length - 2);
  const isLastStep = _.isEqual(active, steps.length - 1);
  // --------------------- /RENDER VARS ---------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  const renderFooter = useMemo(
    () => (
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Text variant="titleMedium" style={styles.backButtonTitle}>
            {t('common.back')}
          </Text>
        </TouchableOpacity>
        <RegularButton
          title={!isBeforeLastStep ? t('common.next') : t('common.submit')}
          onPress={!isBeforeLastStep ? handleNextPress : handleSubmitPress}
        />
      </View>
    ),
    [styles.footer, styles.backButtonTitle, handleBackPress, isBeforeLastStep, handleNextPress, handleSubmitPress],
  );

  return (
    <View style={styles.container} onPress={() => Keyboard.dismiss()}>
      {steps[active]}
      {active !== 0 && !isLastStep && renderFooter}
    </View>
  );
};

export default ChatScreen;
