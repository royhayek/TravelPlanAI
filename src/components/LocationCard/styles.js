import { StyleSheet } from 'react-native';

export default (theme, isHorizontal) =>
  StyleSheet.create({
    activity: width => ({
      elevation: 2,
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: isHorizontal ? 8 : 12,
      overflow: 'hidden',
      paddingHorizontal: 12,
      width: width ?? undefined,
      marginBottom: !isHorizontal ? 12 : 0,
      marginHorizontal: !isHorizontal ? 0 : 10,
      flexDirection: isHorizontal ? 'row' : 'column',
      borderColor: theme.dark ? theme.colors.secondary : 'transparent',
      backgroundColor: theme.dark ? theme.colors.background : theme.colors.card,
    }),
    descriptionContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginTop: isHorizontal ? 0 : 8,
    },
    imageContainer: {
      paddingEnd: isHorizontal ? 12 : 0,
      justifyContent: 'center',
    },
    image: {
      borderRadius: 8,
      width: isHorizontal ? 90 : '100%',
      height: isHorizontal ? 90 : 140,
      backgroundColor: theme.colors.background,
    },
    starRatingContainer: {
      marginVertical: 4,
      gap: isHorizontal ? 4 : 6,
      justifyContent: 'flex-start',
    },
    description: {
      marginVertical: isHorizontal ? 0 : 4,
    },
    address: {
      color: theme.colors.secondary,
    },
  });
