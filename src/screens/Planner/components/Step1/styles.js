import { StyleSheet } from 'react-native';

export default theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 24,
    },
    title: {
      marginTop: 20,
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      width: '95%',
      paddingVertical: 20,
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      borderRadius: 10,
    },
    modalContentContainer: {
      backgroundColor: 'white',
      padding: 16,
      width: '80%',
    },
    modalTitle: { textAlign: 'center', color: theme.colors.black, fontSize: 18, fontWeight: 'bold' },
    modalDescription: { textAlign: 'center', marginTop: 10, color: theme.colors.gray, marginBottom: 25, fontSize: 16 },
    modalButtonsContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between' },
    gobackButton: {
      borderRadius: 30,
      backgroundColor: theme.colors.black,
      fontWeight: 'bold',
    },
    closeButton: { alignSelf: 'flex-end', marginBottom: 10 },
  });
