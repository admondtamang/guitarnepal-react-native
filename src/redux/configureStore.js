import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { AsyncStorage } from "react-native";
import userSlice from "./user/userSlice";
import logger from "redux-logger";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";

const persistConfig = {
    key: "guitarnepal",
    version: 1.2,
    storage: AsyncStorage,
};

const reducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
    product: productSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    // .concat(logger),
    devTools: true,
});

export default store;
