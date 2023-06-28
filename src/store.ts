import { configureStore } from "@reduxjs/toolkit";
import category from "./redux/category";
import income from "./redux/income";
import user from "./redux/user";
import article from "./redux/article";
import expense from "./redux/expense";
export const store = configureStore({
  reducer: {
    category,
    income,
    user,
    article,
    expense,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
