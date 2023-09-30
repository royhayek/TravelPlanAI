import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    noteAndTips: {
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    aiPoweredContainer: {
      borderRadius: 30,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderWidth: theme.dark ? 1 : 0,
      backgroundColor: theme.dark ? 'transparent' : theme.colors.card,
      borderColor: theme.dark ? theme.colors.secondary : 'transparent',
    },
    interestsWrapper: {
      gap: 8,
      marginTop: 8,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    interests: {
      borderRadius: 30,
      borderWidth: 0.5,
      paddingVertical: 3,
      paddingHorizontal: 5,
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
    },
    destinationInfo: { marginVertical: 16 },
    itineraryTitle: { marginVertical: 8 },
  });
