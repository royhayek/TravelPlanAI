// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { Text, useTheme } from 'react-native-paper';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
// ------------------------------------------------------------ //
// ------------------------ COMPONENTS ------------------------ //
// ------------------------------------------------------------ //
import PopularDestinations from './PopularDestinations';
import DestinationInput from './DestinationInput';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { destinationsActions } from 'redux/slices/destinationsSlice';
import makeStyles from './styles';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { t } from 'app/i18n';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const _t = (key, options) => t(`planner.${key}`, options);

const Step1 = ({ setActive }) => {
  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(theme);
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleSubmitPrompt = useCallback(
    (value) => {
      console.debug('value', value);
      dispatch(destinationsActions.setPayload({ destination: value }));
      setActive(1);
    },
    [dispatch, setActive]
  );

  const signIn = async () => {
    try {
      console.debug('pressed sign in');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.debug('userInfo', userInfo);
      const idToken = userInfo.idToken;
      const tokenBlob = new Blob([JSON.stringify({ access_token: idToken }, null, 2)], {
        type: 'application/json'
      });
      const formData = new FormData();
      formData.append('access_token', tokenBlob);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ access_token: idToken }),
        url: 'http://localhost:4000/auth/google'
      };

      axios(options)
        .then((response) => {
          console.debug('response', response);
          console.debug('response.headers', response.headers.get(''));

          // If you want to access the response data
          console.debug('response data', response.data);
        })
        .catch((error) => {
          console.error('Error making API call:', error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.status, error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
          }
        });

      // const options = {
      //   method: 'POST',
      //   body: tokenBlob,
      //   mode: 'cors',
      //   cache: 'default',
      // };
      // fetch('http://localhost:4000/api/v1/auth/google', options)
      //   .then(r => {
      //     console.debug(
      //       'r.headers',
      //       r.headers.forEach((h, k) => console.debug(k, h)),
      //     );
      //     console.debug('r', r);
      //     console.debug('r.json()', r.json());
      //     return r.json();
      //   })
      //   .then(json => {
      //     console.debug('json', json);
      // console.debug(
      //   'r.headers',
      //   r.headers.forEach((h, k) => console.debug(k, h)),
      // );
      // // const token = r.headers.get('x-auth-token');
      // // console.debug('x-auth-token', token);
      // console.debug('r.json()', r.json());
      // r.json().then(user => {
      //   console.debug('user', user);
      //   // if (token) {
      //   // console.debug('user token retrieved from backend is ', { token, user });
      //   // this.setState({ isAuthenticated: true, user, token });
      //   // }
      // });
      // });
      // setState({ userInfo });
    } catch (error) {
      console.debug('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.debug('SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.debug('IN_PROGRESS');

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.debug('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <Text variant="titleLarge" style={styles.title}>
        {_t('where_to_go')}
      </Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        // disabled={this.state.isSigninInProgress}
      />
      <DestinationInput handleSubmit={handleSubmitPrompt} />
      <PopularDestinations handleSubmit={handleSubmitPrompt} />
    </ScrollView>
  );
};

export default Step1;
