// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useMemo, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import Step1 from './components/Step1';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import Step2 from './components/Step2';
import makeStyles from './styles';
import Step3 from './components/Step3';
import RegularButton from 'app/src/components/Buttons/Regular';
import Step4 from './components/Step4';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const ChatScreen = ({ route, navigation }) => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //

  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

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
  }, [setActive]);

  const handleSubmitPress = useCallback(() => {}, []);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ EFFECTS ------------------------ //

  // ----------------------- /EFFECTS ------------------------ //
  // --------------------------------------------------------- //

  const steps = [
    <Step1 title="Step 1" setActive={setActive} />,
    <Step2 title="Step 2" setActive={setActive} />,
    <Step3 title="Step 3" setActive={setActive} />,
    <Step4 title="Step 3" setActive={setActive} />,
  ];

  const isLastStep = _.isEqual(active, steps.length - 1);
  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  const renderFooter = useMemo(
    () => (
      <View style={styles.footer}>
        <RegularButton title="Back" onPress={handleBackPress} backgroundColors={[theme.colors.black]} />
        <RegularButton title={!isLastStep ? 'Next' : 'Submit'} onPress={!isLastStep ? handleNextPress : handleSubmitPress} />
      </View>
    ),
    [styles.footer, theme.colors.black, isLastStep, handleBackPress, handleNextPress, handleSubmitPress],
  );

  return (
    <View style={styles.container} onPress={() => Keyboard.dismiss()}>
      {steps[active]}
      {active !== 0 && renderFooter}
    </View>
  );
};

export default ChatScreen;
