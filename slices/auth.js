import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/api/auth.service";

const initialState = {
  auth: {
    user: {
      id: "",
      username: "",
      email: "",
      walletAddress: "",
      phoneNumber: "",
      password: "",
      avatar: "",
      banner: "",
      school: "",
      major: "",
      class: "",
      role: "",
    },
  },
  students: [],
  teachers: [],
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await authService.login(data);
  localStorage.setItem("user", JSON.stringify(response.data));
  localStorage.setItem("token", response.data.accessToken);
  return response;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const response = await authService.register(data);
  return response;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const response = await authService.getCurrentUser();
    return response;
  }
);

export const getStudents = createAsyncThunk("auth/getStudents", async () => {
  const response = await authService.getUsers();
  return response.data.filter((user) => user.role === "Student");
});

export const getTeachers = createAsyncThunk("auth/getTeachers", async () => {
  const response = await authService.getUsers();
  return response.data.filter((user) => user.role === "Teacher");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.auth.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.auth.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state) => {
      state.isLoading = false;
      state.auth.user = {};
    },
    [logout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getCurrentUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.auth.user = action.payload;
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getStudents.pending]: (state) => {
      state.isLoading = true;
    },
    [getStudents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.students = action.payload;
    },
    [getStudents.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getTeachers.pending]: (state) => {
      state.isLoading = true;
    },
    [getTeachers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.teachers = action.payload;
    },
    [getTeachers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
