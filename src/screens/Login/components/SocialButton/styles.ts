import { ms, mvs } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export default (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: ms(1.5),
      minHeight: mvs(42),
      borderRadius: ms(50),
      marginBottom: mvs(10),
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.lightGray
    },
    content: {
      padding: 5,
      width: '100%',
      minHeight: 45,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    iconContent: {
      top: 0,
      left: 16,
      bottom: 0,
      position: 'absolute',
      justifyContent: 'center'
    },
    icon: {
      width: 26,
      height: 26
    },
    title: {
      fontWeight: 'bold',
      color: theme.colors.black
    }
  });
