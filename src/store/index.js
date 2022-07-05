import { configureStore } from "@reduxjs/toolkit";
import windfarmsReducer from "./windfarms/slice";

const store = configureStore({
  reducer: {
    windfarms: windfarmsReducer,
  },
});

export default store;
