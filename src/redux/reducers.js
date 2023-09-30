import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import appReducer from './slices/appSlice';
import snackbarSliceReducer from './slices/snackbarSlice';
import destinationsReducer from './slices/destinationsSlice';
import itineraryReducer from './slices/itinerarySlice';
import placesReducer from './slices/placesSlice';

const appPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['config', 'messagesCount', 'lastSentDate', 'subProducts', 'subscriptions', 'ownedSubscriptions'],
};

export default combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  itinerary: itineraryReducer,
  destinations: destinationsReducer,
  places: placesReducer,
  snackbar: snackbarSliceReducer,
});
