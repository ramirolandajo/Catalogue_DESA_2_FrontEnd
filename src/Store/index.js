import { configureStore } from "@reduxjs/toolkit";
import abmReducer from "./abm/abmSlice";
import toastReducer from "./toast/toastSlice"; 

export const store = configureStore({
  reducer: {
    abm: abmReducer,
    toast: toastReducer
  },
});

export default store;

