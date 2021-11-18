import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { FETCH_STATUS } from 'constant';
import api from 'api/appointment';

const initialState = {
  status: FETCH_STATUS.IDLE,
  error: null,
  appointments: [],
  appointmentStatus: [
    'All',
    'Pending',
    'Date confirmed',
    'Active',
    'Accepted',
    'Rejected',
  ],
  departments: ['All'],
};

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointment',
  async () => {
    const appointments = await api.get('/appointments');
    return appointments;
  }
);

export const createAppointments = createAsyncThunk(
  'appointments/createAppointment',
  async (appointments) => {}
);

export const updateAppointments = createAsyncThunk(
  'appointments/updateAppointment',
  async (appointmentId) => {}
);

export const deleteAppointments = createAsyncThunk(
  'appointments/deleteAppointment',
  async (appointmentId) => {}
);

export const fetchDepartments = createAsyncThunk(
  'appointments/fetchDepartments',
  async () => {}
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = FETCH_STATUS.LOADING;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = FETCH_STATUS.SUCCEEDED;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = FETCH_STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export default appointmentsSlice.reducer;
