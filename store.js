import { configureStore } from "@reduxjs/toolkit";
import alchemyReducer from "./slices/alchemy";
import authReducer from "./slices/auth";
import cloudinaryReducer from "./slices/cloudinary";
import rewardReducer from "./slices/reward";
import storageReducer from "./slices/storage";
import statsReducer from "./slices/stats";

const reducer = {
  alchemy: alchemyReducer,
  auth: authReducer,
  cloudinary: cloudinaryReducer,
  reward: rewardReducer,
  storage: storageReducer,
  stats: statsReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
