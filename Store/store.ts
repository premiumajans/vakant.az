
import { auth } from "./Query/Auth";
import UserReducer from "./Slices/User";
import GeneralReducer from "./Slices/General";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};



const reducers = combineReducers({
  User: UserReducer,
  [auth.reducerPath]: auth.reducer,
  General: GeneralReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false,
    }).concat(auth.middleware),
});

export const persistor = persistStore(store);
