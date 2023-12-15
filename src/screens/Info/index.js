// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { ScrollView, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import React from 'react';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { getConfiguration } from '../../redux/slices/appSlice';
import { scaledFontSize } from '../../shared/assets/theme';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------ COMPONENT ------------------------- //
// ------------------------------------------------------------ //
const InfoScreen = ({ route }) => {
  // --------------------------------------------------------- //
  // ----------------------- REDUX --------------------------- //
  const config = useSelector(getConfiguration);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const { width } = useWindowDimensions();

  const type = route.params.type;
  const uri = _.isEqual(type, 'privacy_policy') ? config?.links?.privacyPolicy : config?.links?.termsAndConditions;
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <ScrollView style={styles.container}>
      <RenderHtml
        source={{ uri }}
        contentWidth={width}
        tagsStyles={{
          body: {
            fontSize: scaledFontSize(14),
            lineHeight: scaledFontSize(19),
            color: theme.dark ? theme.colors.white : theme.colors.black,
          },
        }}
      />
    </ScrollView>
  );
};

export default InfoScreen;
