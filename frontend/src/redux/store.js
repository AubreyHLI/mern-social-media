import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import postsReducer from "./features/postsSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from  'redux-persist/lib/storage';


const rootReducer = combineReducers({ 
    auth: authReducer,
    posts: postsReducer
});
const persistConfig = {
    key: 'root',
    storage: storage,
    version: 1,
    blacklist: ['posts']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
});

export const persistor = persistStore(store)

export default store;