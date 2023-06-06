import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import alchemyService from "@/api/alchemy.service";
const initialState = {
  alchemy: {
    nfts: [],
    nftsForContract: [],
  },
  isLoading: false,
  error: null,
};

export const getNftsForStudent = createAsyncThunk(
  "alchemy/getNftsForStudent",
  async (address) => {
    const response = await alchemyService.getNftsForStudent(address);
    return response;
  }
);

export const getNftsForContract = createAsyncThunk(
  "alchemy/getNftsForContract",
  async (address) => {
    const response = await alchemyService.getNftsForContract(address);
    return response;
  }
);
    

const alchemySlice = createSlice({
  name: "alchemy",
  initialState,
  extraReducers: {
    [getNftsForStudent.pending]: (state) => {
      state.isLoading = true;
    },
    [getNftsForStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alchemy.nfts = action.payload;
    },
    [getNftsForStudent.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getNftsForContract.pending]: (state) => {
      state.isLoading = true;
    },
    [getNftsForContract.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.alchemy.nftsForContract = action.payload;
    },
    [getNftsForContract.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }

  },
});

export default alchemySlice.reducer;
