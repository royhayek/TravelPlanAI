import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './slices/appSlice';
import itineraryReducer from './slices/travelItinerarySlice';
import itineraryPlacesReducer from './slices/itineraryPlacesSlice';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const appPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['config', 'messagesCount', 'lastSentDate', 'subProducts', 'subscriptions', 'ownedSubscriptions'],
};

export default combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  travelItinerary: itineraryReducer,
  itineraryPlaces: itineraryPlacesReducer,
});
