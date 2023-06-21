import { configureStore } from "@reduxjs/toolkit";
import category from "./redux/category";
import income from "./redux/income";
export const store = configureStore({
  reducer: {
    category,
    income,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
