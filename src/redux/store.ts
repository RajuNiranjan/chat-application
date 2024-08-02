import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from "@reduxjs/toolkit";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./Actions/user.action";

export interface RootState {
  user: ReturnType<typeof userReducer>;
}

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: EnhancedStore<RootState> = configureStore({
  reducer: persistedReducer,
});

export const persistor: Persistor = persistStore(store);
