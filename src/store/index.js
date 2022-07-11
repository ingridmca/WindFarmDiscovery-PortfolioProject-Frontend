import { configureStore } from "@reduxjs/toolkit";
import windfarmsReducer from "./windfarms/slice";
import userReducer from "./user/slice";
import appStateReducer from "./appState/slice";

const store = configureStore({
  reducer: {
    windfarms: windfarmsReducer,
    user: userReducer,
    appState: appStateReducer,
  },
});

export default store;
