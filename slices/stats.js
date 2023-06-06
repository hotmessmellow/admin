import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statsService from "@/api/stats.service";

const initialState = {
  stats: {
    teacherCount: 0,
    studentCount: 0,
    rewardCount: 0,
  },
  isLoadingStats: false,
  errorMessageStats: null,
};

export const getStats = createAsyncThunk("stats/getStats", async () => {
  const response = await statsService.getStats();
  return response.data;
});

const statsSlice = createSlice({
  name: "stats",
  initialState,
  extraReducers: {
    [getStats.pending]: (state) => {
      state.isLoadingStats = true;
    },
    [getStats.fulfilled]: (state, action) => {
      state.isLoadingStats = false;
      state.stats.teacherCount = action.payload.teachers;
      state.stats.studentCount = action.payload.students;
      state.stats.rewardCount = action.payload.rewards;
    },
    [getStats.rejected]: (state, action) => {
      state.isLoadingStats = false;
      state.errorMessageStats = action.error.message;
    },
  },
});

export default statsSlice.reducer;
