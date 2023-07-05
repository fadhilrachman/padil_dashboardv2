import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ResponDashboard from "../utils/interfaces/dashboard";
import axios from "axios";

interface InitialState {
  status: string;
  result: ResponDashboard;
}

export const getDataDashboard = createAsyncThunk("/dashboard-get", async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`);

  return result;
});
const initialState: InitialState = {
  status: "",
  result: {
    expense: 0,
    income: 0,
    money: 0,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataDashboard.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataDashboard.fulfilled, (state, action) => {
      state.status = "succes";
      state.result = action.payload.data;
      console.log({ action });
    });
    builder.addCase(getDataDashboard.rejected, (state, action) => {
      state.status = "error";
    });
  },
});
export default dashboardSlice.reducer;
