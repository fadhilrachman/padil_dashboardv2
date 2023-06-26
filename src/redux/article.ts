import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Category from "../utils/interfaces/category";
import { RequestArticle, ResponAricle } from "../utils/interfaces/article";
import { QueryFilter, ResponApi } from "../utils/interfaces";

interface InitialState {
  status: "loading" | "succes" | "error" | "";
  result: ResponApi<ResponAricle[]>;
  dataDetail: ResponAricle | any;
}

export const getDataArticle = createAsyncThunk(
  "/article-get",
  async ({ search, limit = "", page = "" }: QueryFilter) => {
    const result = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/article?search=${search}&limit=${limit}&page=${page}`
    );
    return result;
  }
);

export const getDataArticleById = createAsyncThunk(
  "/article-getById",
  async (param: string) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/article/${param}`
    );
    return result;
  }
);
export const createDataArticle = createAsyncThunk(
  "/article-create",
  async (param: RequestArticle) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/article`,
      param
    );
    return result;
  }
);
export const updateDataArticle = createAsyncThunk(
  "/article-update",
  async (param: RequestArticle) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/article/${param.id}`,
      param
    );
    return result;
  }
);
export const deleteDataArticle = createAsyncThunk(
  "/article-delete",
  async (param: string) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/article/${param}`
    );
    return result;
  }
);
const initialState: InitialState = {
  status: "",
  result: {},
  dataDetail: {},
};

const articleSlice = createSlice({
  name: "article",
  reducers: {},
  initialState,
  extraReducers(builder) {
    builder.addCase(getDataArticle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataArticle.fulfilled, (state, action) => {
      state.status = "succes";
      state.result = action.payload.data;
      state.dataDetail = {};
    });
    builder.addCase(getDataArticle.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(getDataArticleById.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getDataArticleById.fulfilled, (state, action) => {
      state.status = "succes";
      state.dataDetail = action.payload.data.data;
    });
    builder.addCase(getDataArticleById.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(createDataArticle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createDataArticle.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(createDataArticle.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(updateDataArticle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateDataArticle.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(updateDataArticle.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(deleteDataArticle.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteDataArticle.fulfilled, (state, action) => {
      state.status = "succes";
    });
    builder.addCase(deleteDataArticle.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export default articleSlice.reducer;
