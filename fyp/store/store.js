import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userSlice from "./userSlice";

const Reducers = combineReducers({
  userSlice,
});

export const makeStore = () => {
  configureStore({
    reducer: Reducers,
  });
};

export const wrapper = createWrapper(makeStore);
