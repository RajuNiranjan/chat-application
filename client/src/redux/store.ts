import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth.reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
