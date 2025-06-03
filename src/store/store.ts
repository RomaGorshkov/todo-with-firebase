import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./reducers/auth";
import { todosReducer } from "./reducers/todos";

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
