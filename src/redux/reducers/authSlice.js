import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { FETCH_STATUS } from 'constant';
import { googleLogin, googleLogout } from 'api/googleAuth';

const initialState = {
  status: FETCH_STATUS.IDLE,
  isAuth: localStorage.getItem('userId') ? true : false,
  userId: localStorage.getItem('userId'),
  error: null,
};

export const login = createAsyncThunk('auth/login', async () => {
  const user = await googleLogin();
  return user.userId;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await googleLogout();
});

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = FETCH_STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.SUCCEEDED;
        state.isAuth = true;
        state.userId = action.payload;

        localStorage.setItem('userId', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = FETCH_STATUS.FAILED;
        state.error = action.error.message;
      })

      .addCase(logout.pending, (state) => {
        state.status = FETCH_STATUS.LOADING;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.SUCCEEDED;
        state.isAuth = false;
        state.userId = null;

        localStorage.removeItem('userId');
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = FETCH_STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const isAuthSelector = (state) => state.auth.isAuth;
export const authStatusSelector = (state) => state.auth.status;

export default auth.reducer;
