import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storageService from "@/api/storage.service";

const initialState = {
  storage: {
    hash: null,
    file: null,
  },
  isLoadingStorage: false,
  error: null,
};

export const uploadMetadata = createAsyncThunk(
  "storage/upload",
  async (data) => {
    const response = await storageService.upload(data);
    return response.data.metadataHash;
  }
);

export const resolve = createAsyncThunk("storage/resolve", async (hash) => {
  const response = await storageService.resolve(hash);
  return response;
});

const storageSlice = createSlice({
  name: "storage",
  initialState,
  extraReducers: {
    [uploadMetadata.pending]: (state) => {
      state.isLoadingStorage = true;
    },
    [uploadMetadata.fulfilled]: (state, action) => {
      state.isLoadingStorage = false;
      state.storage.hash = action.payload;
    },
    [uploadMetadata.rejected]: (state, action) => {
      state.isLoadingStorage = false;
      state.error = action.error.message;
    },
    [resolve.pending]: (state) => {
      state.isLoadingStorage = true;
    },
    [resolve.fulfilled]: (state, action) => {
      state.isLoadingStorage = false;
      state.storage.file = action.payload;
    },
    [resolve.rejected]: (state, action) => {
      state.isLoadingStorage = false;
      state.error = action.error.message;
    },
  },
});

export default storageSlice.reducer;
