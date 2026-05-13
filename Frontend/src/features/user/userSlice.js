import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userInfoFromStorage,
  userToken: userInfoFromStorage?.token || null,
  loading: false,
  error: null,
};



// REGISTER
export const signupUser = createAsyncThunk(
  "user/signupUser",

  async (userData, thunkAPI) => {
    try {

      const response = await API.post(
        "/users/register",
        userData
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);



// LOGIN
export const loginUser = createAsyncThunk(
  "user/loginUser",

  async (userData, thunkAPI) => {
    try {

      const response = await API.post(
        "/users/login",
        userData
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);




const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {

    logout: (state) => {

      state.user = null;
      state.userToken = null;

      localStorage.removeItem("userInfo");
    },
  },

  extraReducers: (builder) => {

    builder

      // REGISTER
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {

        state.loading = false;

        state.user = action.payload;

        state.userToken = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;