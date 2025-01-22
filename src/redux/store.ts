import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence
import cartReducer from "../redux/cartSlice"; // Import cartReducer
import { PersistConfig } from "redux-persist/es/types";

const persistConfig: PersistConfig<any> = {
  key: "root", // Key for storage
  storage, // Use localStorage as the storage engine
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer, // Use the persisted reducer
  },
});

const persistor = persistStore(store); // Create persistor for storing Redux state

// Export the store and persistor for use in your app
export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
