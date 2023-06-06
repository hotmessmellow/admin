import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cloudinaryService from "@/api/cloudinary.service";

const initialState = {
  url: "",

  isLoading: false,
  error: null,
};

export const upload = createAsyncThunk("cloudinary/upload", async (file) => {
  const response = await cloudinaryService.upload(file);
  return response.secure_url;
});

const cloudinarySlice = createSlice({
  name: "cloudinary",
  initialState,
  extraReducers: {
    [upload.pending]: (state) => {
      state.isLoading = true;
    },
    [upload.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.url = action.payload;
    },
    [upload.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default cloudinarySlice.reducer;
