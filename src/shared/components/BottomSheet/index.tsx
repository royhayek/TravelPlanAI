// Packages
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Portal, useTheme } from 'react-native-paper';
import React from 'react';
// Utilities
import makeStyles from './styles';

// Component
const CustomBottomSheet = ({ sheetRef, snapPoints, handleSheetClose, children }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Renderers
  return (
    <Portal>
      <BottomSheet
        index={-1}
        ref={sheetRef}
        enablePanDownToClose
        snapPoints={snapPoints}
        onClose={handleSheetClose}
        backgroundStyle={styles.background}
        handleIndicatorStyle={{ display: 'none' }}
        backdropComponent={props => <BottomSheetBackdrop {...props} opacity={0.5} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />}>
        {children}
      </BottomSheet>
    </Portal>
  );
};

export default CustomBottomSheet;
