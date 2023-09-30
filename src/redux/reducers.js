import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './slices/appSlice';
import snackbarSliceReducer from './slices/snackbarSlice';
import destinationsReducer from './slices/destinationsSlice';
import placesReducer from './slices/placesSlice';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const appPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['config', 'messagesCount', 'lastSentDate', 'subProducts', 'subscriptions', 'ownedSubscriptions'],
};

export default combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  destinations: destinationsReducer,
  places: placesReducer,
  snackbar: snackbarSliceReducer,
});
