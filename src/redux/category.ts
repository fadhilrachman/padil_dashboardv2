import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Category from "../utils/interfaces/category";
export const getDataCategory = createAsyncThunk("/category-get", async () => {
  const result = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
  return result;
});

export const createDataCategory = createAsyncThunk(
  "/category-create",
  async (param: Category) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/categories`,
      param
    );
    return result;
  }
);
export const updateDataCategory = createAsyncThunk(
  "/category-update",
  async (param: Category) => {
    const val = {
      nama: param.nama,
      type: param.type,
    };
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/categories/${param.id}`,
      val
    );
    return result;
  }
);
export const deleteDataCategory = createAsyncThunk(
  "/category-delete",
  async (param: string) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/categories/${param}`
    );
    return result;
  }
);

const categorySlice = createSlice({
  name: "category",
  reducers: {},
  initialState: {
    status: "",
    data: [],
  },
  extraReducers(builder) {
    builder.addCase(getDataCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataCategory.fulfilled, (state, action) => {
      state.status = "succes";
      state.data = action.payload.data.data;
    });
    builder.addCase(getDataCategory.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(createDataCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createDataCategory.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(createDataCategory.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(updateDataCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateDataCategory.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(updateDataCategory.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(deleteDataCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteDataCategory.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(deleteDataCategory.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export default categorySlice.reducer;
