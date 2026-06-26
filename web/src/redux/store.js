import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/es/storage/index.js';
import userReducer from './slices/userSlice.js';
import accountsReducer from './slices/accountsSlice.js';
import fieldsReducer from './slices/fieldsSlice.js';
import slidesReducer from './slices/slidesSlice.js';
import specsReducer from './slices/specsSlice.js';
import tableReducer from './slices/tableSlice.js';

const persistConfig = { key: 'root', storage };
const reducers = combineReducers({
  user: userReducer,
  accounts: accountsReducer,
  fields: fieldsReducer,
  slides: slidesReducer,
  specs: specsReducer,
  table: tableReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});
