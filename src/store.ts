import { configureStore } from "@reduxjs/toolkit";
import category from "./redux/category";
import income from "./redux/income";
import user from "./redux/user";
import article from "./redux/article";
export const store = configureStore({
  reducer: {
    category,
    income,
    user,
    article,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
