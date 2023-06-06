import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rewardService from "@/api/reward.service";

const initialState = {
  reward: {
    teachers: [],
    students: [],
    reward: null,
    teacher: null,
    student: null,
  },
  rewards: [],
  isLoadingReward: false,
  errorMessageReward: null,
};

export const giveReward = createAsyncThunk(
  "reward/giveReward",
  async (data) => {
    const response = await rewardService.giveReward(data);
    return response;
  }
);

export const getRewards = createAsyncThunk("reward/getRewards", async () => {
  const response = await rewardService.getRewards();
  return response.data;
});

const rewardSlice = createSlice({
  name: "reward",
  initialState,
  extraReducers: {
    [giveReward.pending]: (state) => {
      state.isLoadingReward = true;
    },
    [giveReward.fulfilled]: (state, action) => {
      state.isLoadingReward = false;
      state.reward.rewards = action.payload;
    },
    [giveReward.rejected]: (state, action) => {
      state.isLoadingReward = false;
      state.errorMessageReward = action.error.message;
    },

    [getRewards.pending]: (state) => {
      state.isLoadingReward = true;
    },
    [getRewards.fulfilled]: (state, action) => {
      state.isLoadingReward = false;
      state.rewards = action.payload;
    },
    [getRewards.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessageReward = action.error.message;
    },
  },
});

export default rewardSlice.reducer;
