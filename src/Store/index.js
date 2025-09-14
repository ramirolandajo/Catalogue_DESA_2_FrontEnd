import { configureStore } from "@reduxjs/toolkit";
import abmReducer from "./abm/abmSlice"

export const store = configureStore({
  reducer: {
    abm: abmReducer
  },
});

export default store;
