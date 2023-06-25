import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Category from "../utils/interfaces/category";
import { RequestIncome, ResponIncome } from "../utils/interfaces/income";
import { RequestLogin, RequestRegister } from "../utils/interfaces/user";
import { QueryFilter, ResponApi } from "../utils/interfaces";
import Cookies from "js-cookie";

interface InitialState {
  status: "loading" | "succes" | "error" | "";
  result: ResponApi<ResponIncome[]>;
  dataDetail: ResponIncome | {};
  message: string | unknown;
}

export const getDataIncome = createAsyncThunk(
  "/user-get",
  async ({ search, limit = "", page = "" }: QueryFilter) => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/income?search=${search}&limit=${limit}&page=${page}`
    );
    return result;
  }
);

export const getDataIncomeById = createAsyncThunk(
  "/user-getById",
  async (param: string) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/income/${param}`
    );
    return result;
  }
);
export const regiter = createAsyncThunk(
  "/user-register",
  async (param: RequestRegister, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        param
      );
      return result;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const login = createAsyncThunk(
  "/user-login",
  async (param: RequestLogin, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        param
      );
      console.log(result);
      Cookies.set("token", result.data.token);

      return result;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// export const updateDataIncome = createAsyncThunk(
//   "/income-update",
//   async (param: Category) => {
//     const val = {
//       nama: param.nama,
//       type: param.type,
//     };
//     const result = await axios.put(
//       `${import.meta.env.VITE_API_URL}/income/${param.id}`,
//       val
//     );
//     return result;
//   }
// );
// export const deleteDataIncome = createAsyncThunk(
//   "/income-delete",
//   async (param: string) => {
//     const result = await axios.delete(
//       `${import.meta.env.VITE_API_URL}/income/${param}`
//     );
//     return result;
//   }
// );
const initialState: InitialState = {
  status: "",
  result: {},
  dataDetail: {},
  message: "",
};

const userSlice = createSlice({
  name: "income",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(getDataIncome.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataIncome.fulfilled, (state, action) => {
      state.status = "succes";
      state.result = action.payload.data;
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
    builder.addCase(regiter.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(regiter.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(regiter.rejected, (state, action) => {
      state.status = "error";
      state.message = action.payload;
    });
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "error";
      state.message = action.payload;
    });
  },
});

export default userSlice.reducer;
