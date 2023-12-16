import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export default (theme: MD3Theme) =>
  StyleSheet.create({
    backgroundImg: {
      height: '70%',
    },
    content: {
      left: 0,
      right: 0,
      bottom: 0,
      padding: 16,
      height: '35%',
      position: 'absolute',
      borderTopEndRadius: 35,
      borderTopStartRadius: 35,
      backgroundColor: 'white'
    },
    title: {
      marginBottom: 16,
      textAlign: 'center',
      color: theme.colors.black
    }
  });
