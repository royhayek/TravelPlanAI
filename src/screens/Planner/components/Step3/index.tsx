// Packages
import { Text, useTheme } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
// Components
import PartnersList from './PartnersList';
// Utilities
import { destinationsActions } from '../../../../redux/slices/destinationsSlice';
import { t } from '../../../../app/i18n';
import { PARTNERS_LIST } from './data';
import makeStyles from './styles';

// Component
const _t = (key, options) => t(`planner.${key}`, options);

const Step3 = () => {
  // Redux
  const dispatch = useDispatch();

  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  const [whoIsGoing, setWhoIsGoing] = useState(PARTNERS_LIST[0].key);

  // Effects
  useEffect(() => {
    const partner = _.find(PARTNERS_LIST, { key: whoIsGoing });
    const withWho = _.isEqual(partner.key, 'alone') ? 'alone' : `with ${partner.title}`;
    dispatch(destinationsActions.setPayload({ whoIsGoing: withWho }));
  }, [whoIsGoing, dispatch]);

  // Renderers
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
