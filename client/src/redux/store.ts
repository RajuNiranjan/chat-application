import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth.reducer";
import allUsersReducer from "./reducers/allUsers.reducer";
import messageReducer from "./reducers/message.reducer";
import conversationReducer from "./reducers/conversations.reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  users: allUsersReducer,
  message: messageReducer,
  conversation: conversationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
