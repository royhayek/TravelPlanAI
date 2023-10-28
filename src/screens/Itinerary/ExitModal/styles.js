import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    content: {
      backgroundColor: 'white',
      width: '95%',
      paddingVertical: 20,
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      borderRadius: 10,
    },
    title: { textAlign: 'center', color: theme.colors.black, fontSize: 18, fontWeight: 'bold' },
    description: { textAlign: 'center', marginTop: 10, color: theme.colors.gray, marginBottom: 25, fontSize: 16 },
    buttonsContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between' },
    gobackButton: {
      borderRadius: 30,
      backgroundColor: theme.colors.black,
      fontWeight: 'bold',
    },
    closeButton: { alignSelf: 'flex-end', marginBottom: 10 },
  });
