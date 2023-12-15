// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import { useTheme, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { snackbarActions, selectSnackBar } from '../../../redux/slices/snackbarSlice';
import makeStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- COMPONENT ------------------------ //
// ------------------------------------------------------------ //
const CustomSnackbar = () => {
  // --------------------------------------------------------- //
  // ------------------------ REDUX -------------------------- //
  const dispatch = useDispatch();

  const snackbarSelect = useSelector(selectSnackBar);
  // ----------------------- /REDUX -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- STATICS ------------------------- //
  const theme = useTheme();
  const styles = makeStyles(theme);

  const { show, message, delay } = snackbarSelect;
  // ----------------------- /STATICS ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- CALLBACKS ----------------------- //
  const handleDismiss = useCallback(() => dispatch(snackbarActions.hideSnackbar()), [dispatch]);
  // ---------------------- /CALLBACKS ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- RENDERERS ----------------------- //
  return (
    <Snackbar wrapperStyle={styles.wrapperStyle} visible={show} onDismiss={handleDismiss} duration={delay}>
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;
