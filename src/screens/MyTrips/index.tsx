// Packages
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, IconButton, Text, useTheme } from 'react-native-paper';
import { FlatList, RefreshControl, View } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { ms, mvs } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
// Components
import CustomBottomSheet from '../../shared/components/BottomSheet';
import RegularButton from '../../shared/components/Buttons/Regular';
import HistoryCard from './components/HistoryCard';
// Utilities
import { deleteAllConversations, getConversations } from '../../shared/services/localdb';
import { savedTrips as savedTripsData } from './data';
import { t } from '../../app/i18n';
import makeStyles from './styles.ts';
// Component
const _t = (key, options) => t(`history.${key}`, options);

const HistoryScreen = ({ navigation }) => {
  // Statics
  const theme = useTheme();
  const styles = makeStyles(theme);

  const bottomSheetRef = useRef();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [savedTrips, setSavedTrips] = useState(savedTripsData);

  const snapPoints = useMemo(() => ['25%'], []);

  // Callbacks
  const refreshSavedTrips = useCallback(isRefreshing => {
    !isRefreshing && setLoading(true);
    getConversations().then(convos => {
      setSavedTrips(savedTripsData);
      setRefreshing(false);
      !isRefreshing && setLoading(false);
    });
  }, []);

  const handleSheetClose = useCallback(() => bottomSheetRef.current.close(), []);

  const handleDeletePress = useCallback(() => bottomSheetRef.current.expand(), []);

  const handleDeleteAllHistory = useCallback(async () => {
    await deleteAllConversations().then(() => console.debug('History Deleted Successfully'));
    refreshSavedTrips(false);
    handleSheetClose();
  }, [handleSheetClose, refreshSavedTrips]);

  const renderDeleteIcon = useCallback(
    () => savedTrips?.length > 0 && <Octicons name="trash" size={22} color={theme.dark ? theme.colors.white : theme.colors.black} />,
    [savedTrips?.length, theme.colors.black, theme.colors.white, theme.dark],
  );

  const renderHeaderRight = useCallback(
    () => <IconButton size={22} onPress={handleDeletePress} icon={renderDeleteIcon} />,
    [handleDeletePress, renderDeleteIcon],
  );

  // Effects
  useEffect(() => {
    navigation.setOptions({ headerRight: renderHeaderRight });
  }, [navigation, renderHeaderRight]);

  useEffect(() => {
    refreshSavedTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renderers
  const renderRefreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={refreshing}
        tintColor={theme.dark ? theme.colors.white : theme.colors.black}
        onRefresh={() => refreshSavedTrips(true)}
      />
    ),
    [refreshSavedTrips, refreshing, theme.colors.black, theme.colors.white, theme.dark],
  );

  const renderActiveTrip = useMemo(
    () => (
      <>
        <Text variant="headlineSmall" style={{ marginBottom: mvs(16) }}>
          Active Trip
        </Text>
        <HistoryCard item={savedTrips[0]} index={0} refresh={refreshSavedTrips} />
        <Text variant="titleMedium" style={{ marginBottom: mvs(16) }}>
          Upcoming Trips
        </Text>
      </>
    ),
    [refreshSavedTrips, savedTrips],
  );

  const renderList = useMemo(
    () => (
      <FlatList
        data={savedTrips}
        key={item => item.id}
        refreshing={refreshing}
        ListHeaderComponent={renderActiveTrip}
        refreshControl={renderRefreshControl}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => <HistoryCard small item={item} index={index} refresh={refreshSavedTrips} />}
      />
    ),
    [savedTrips, refreshing, renderActiveTrip, renderRefreshControl, styles.listContent, refreshSavedTrips],
  );

  const renderLoadingOrEmpty = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <FastImage source={require('../../../assets/empty-history.png')} style={styles.emptyImage} />
            <Text variant="bodyMedium" style={styles.emptyText}>
              {_t('no_history_found')}
            </Text>
          </>
        )}
      </View>
    ),
    [loading, styles.emptyContainer, styles.emptyImage, styles.emptyText],
  );

  const renderConfBottomSheet = useMemo(
    () => (
      <CustomBottomSheet sheetRef={bottomSheetRef} snapPoints={snapPoints} onClose={handleSheetClose}>
        <Text variant="bodyLarge" style={styles.modalTitle}>
          {_t('delete_your_history')}
        </Text>
        <View style={styles.modalButtons}>
          <RegularButton
            title={_t('delete')}
            onPress={handleDeleteAllHistory}
            startIcon={<Octicons name="trash" size={ms(18)} color={theme.colors.white} />}
          />
          <RegularButton
            title={_t('cancel')}
            startIcon={<Ionicons name="close" size={ms(18)} color={theme.colors.white} />}
            onPress={handleSheetClose}
          />
        </View>
      </CustomBottomSheet>
    ),
    [handleDeleteAllHistory, handleSheetClose, snapPoints, styles.modalButtons, styles.modalTitle, theme.colors.white],
  );

  return (
    <View style={styles.container}>
      {savedTrips?.length > 0 ? renderList : renderLoadingOrEmpty}
      {renderConfBottomSheet}
    </View>
  );
};

export default HistoryScreen;
