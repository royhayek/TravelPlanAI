// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useEffect, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import PartnersList from './PartnersList';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { PARTNERS_LIST } from './data';
import { t } from 'app/src/config/i18n';
import makeStyles from './styles';
import { useDispatch } from 'react-redux';
import { setPayload } from 'app/src/redux/slices/destinationsSlice';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step3 = () => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [whoIsGoing, setWhoIsGoing] = useState(PARTNERS_LIST[0].key);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- EFFECTS ------------------------- //
  useEffect(() => {
    const partner = _.find(PARTNERS_LIST, { key: whoIsGoing });
    const withWho = _.isEqual(partner.key, 'alone') ? 'alone' : `with ${partner.title}`;
    dispatch(setPayload({ whoIsGoing: withWho }));
  }, [whoIsGoing, dispatch]);
  // ---------------------- /EFFECTS ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {_t('who_is_coming')}
      </Text>
      <Text variant="titleSmall" style={styles.subtitle}>
        Choose one
      </Text>
      <PartnersList value={whoIsGoing} setValue={setWhoIsGoing} />
    </View>
  );
};

export default Step3;
