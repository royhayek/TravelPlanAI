// ------------------------------------------------------------ //
// ------------------------- PACKAGES ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback } from 'react';
import { useTheme, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
// ------------------------------------------------------------ //
// ------------------------- UTILITIES ------------------------ //
// ------------------------------------------------------------ //
import { hideSnackbar } from 'app/src/redux/slices/snackbarSlice';
import { selectSnackBar } from 'app/src/redux/selectors';
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
  const handleDismiss = useCallback(() => dispatch(hideSnackbar()), [dispatch]);
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
