import { StyleSheet } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';

export default theme =>
  StyleSheet.create({
    noteAndTips: {
      marginBottom: mvs(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    aiPoweredContainer: {
      borderRadius: ms(30),
      marginBottom: mvs(6),
      paddingVertical: mvs(6),
      paddingHorizontal: ms(10),
      alignSelf: 'flex-start',
      borderWidth: theme.dark ? 1 : 0,
      backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
      borderColor: theme.dark ? theme.colors.secondary : 'transparent',
    },
    interestsWrapper: {
      gap: ms(8),
      marginTop: ms(8),
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    interests: {
      borderRadius: ms(30),
      borderWidth: ms(0.5),
      paddingVertical: mvs(3),
      paddingHorizontal: ms(5),
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
    },
    destinationInfo: { marginVertical: mvs(16) },
    itineraryTitle: {
      marginTop: mvs(8),
      marginBottom: mvs(16),
    },
  });
