import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { QueryFilter, ResponApi } from "../utils/interfaces";
import { RequestExpense, ResponExpense } from "../utils/interfaces/expense";

interface InitialState {
  status: "loading" | "succes" | "error" | "";
  result: ResponApi<ResponExpense[]>;
  dataDetail: ResponExpense | any;
}

export const getDataExpense = createAsyncThunk(
  "/pengeluaran-get",
  async ({ search, limit = "", page = "" }: QueryFilter) => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/pengeluaran?search=${search}&limit=${limit}&page=${page}`
    );
    return result;
  }
);

export const getDataExpenseById = createAsyncThunk(
  "/pengeluaran-getById",
  async (param: string) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/pengeluaran/${param}`
    );
    return result;
  }
);
export const createDataExpense = createAsyncThunk(
  "/pengeluaran-create",
  async (param: RequestExpense) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/pengeluaran`,
      param
    );
    return result;
  }
);
export const updateDataExpense = createAsyncThunk(
  "/pengeluaran-update",
  async (param: RequestExpense) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/pengeluaran/${param.id}`,
      param
    );
    return result;
  }
);
export const deleteDataExpense = createAsyncThunk(
  "/pengeluaran-delete",
  async (param: string) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/pengeluaran/${param}`
    );
    return result;
  }
);
const initialState: InitialState = {
  status: "",
  result: {},
  dataDetail: {},
};

const ExpenseSlice = createSlice({
  name: "pengeluaran",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(getDataExpense.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataExpense.fulfilled, (state, action) => {
      state.status = "succes";
      state.result = action.payload.data;
      state.dataDetail = {};
    });
    builder.addCase(getDataExpense.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(getDataExpenseById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataExpenseById.fulfilled, (state, action) => {
      state.status = "succes";
      state.dataDetail = action.payload.data.data;
    });
    builder.addCase(getDataExpenseById.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(createDataExpense.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createDataExpense.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(createDataExpense.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(updateDataExpense.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateDataExpense.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(updateDataExpense.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(deleteDataExpense.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteDataExpense.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(deleteDataExpense.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export default ExpenseSlice.reducer;
