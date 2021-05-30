import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import userSlice from "./user/userSlice";
import logger from "redux-logger";

const persistConfig = {
    key: "guitarnepal",
    version: 1,
    storage: AsyncStorage,
    timeout: null,
};

const reducer = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export default store;
