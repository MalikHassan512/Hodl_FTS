
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authSlice from "./authSlice";
import chatUsersOnlineSlice from "./chatUsersOnlineSlice";



const rootReducer = combineReducers({ auth: authSlice,chatUser:chatUsersOnlineSlice });

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
 middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({
	serializableCheck: {
		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
	},
}),
});



export const persistor = persistStore(store);
// const initializeApiClient = () => {
// 	const authToken = store.getState().auth.token;
// 	authToken&&setAuthToken(authToken)
//   };
  
//   persistor.subscribe(() => {
// 	initializeApiClient();
//   });