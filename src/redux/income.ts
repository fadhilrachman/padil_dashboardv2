import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Category from "../utils/interfaces/category";
import { RequestIncome, ResponIncome } from "../utils/interfaces/income";

interface InitialState {
  status: "loading" | "succes" | "error" | "";
  data: ResponIncome[];
  dataDetail: ResponIncome | {};
}
export const getDataIncome = createAsyncThunk("/income-get", async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/income`);
  return result;
});

export const getDataIncomeById = createAsyncThunk(
  "/income-getById",
  async (param: string) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/income/${param}`
    );
    return result;
  }
);
export const createDataIncome = createAsyncThunk(
  "/income-create",
  async (param: RequestIncome) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/income`,
      param
    );
    return result;
  }
);
export const updateDataIncome = createAsyncThunk(
  "/income-update",
  async (param: Category) => {
    const val = {
      nama: param.nama,
      type: param.type,
    };
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/income/${param.id}`,
      val
    );
    return result;
  }
);
export const deleteDataIncome = createAsyncThunk(
  "/income-delete",
  async (param: string) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/income/${param}`
    );
    return result;
  }
);
const initialState: InitialState = {
  status: "",
  data: [],
  dataDetail: {},
};

const incomeSlice = createSlice({
  name: "income",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(getDataIncome.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataIncome.fulfilled, (state, action) => {
      state.status = "succes";
      state.data = action.payload.data.data;
      state.dataDetail = {};
    });
    builder.addCase(getDataIncome.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(getDataIncomeById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataIncomeById.fulfilled, (state, action) => {
      state.status = "succes";
      state.dataDetail = action.payload.data.data;
    });
    builder.addCase(getDataIncomeById.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(createDataIncome.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createDataIncome.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(createDataIncome.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(updateDataIncome.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateDataIncome.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(updateDataIncome.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(deleteDataIncome.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteDataIncome.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(deleteDataIncome.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export default incomeSlice.reducer;
