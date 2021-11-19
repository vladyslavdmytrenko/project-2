import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { FETCH_STATUS } from 'constant';
import api from 'api/appointment';

const initialState = {
  status: FETCH_STATUS.IDLE,
  error: null,
  appointments: [],
  filteredAppointments: null,
  filterCriteria: {
    appointmentStatus: 'All',
    department: 'All',
  },
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
  async () => {
    const departments = api.get('/departments');
    return departments;
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    filterAppointment: (state, action) => {
      let filteredAppointments = JSON.parse(JSON.stringify(state.appointments));
      state.filterCriteria = action.payload;

      if (action.payload.appointmentStatus !== 'All') {
        filteredAppointments = filteredAppointments.filter(
          (item) => item.status === action.payload.appointmentStatus
        );
      }

      if (action.payload.department !== 'All') {
        filteredAppointments = filteredAppointments.filter(
          (item) => item.department === action.payload.department
        );
      }

      state.filteredAppointments = filteredAppointments;
    },

    updateDepartment: (state, action) => {
      state.departments = action.payload;
    },
  },
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
      })

      .addCase(fetchDepartments.fulfilled, (state, action) => {
        const existDepartments = JSON.parse(JSON.stringify(state.departments));
        state.departments = [...existDepartments, ...action.payload];
      });
  },
});

export const { filterAppointment, updateDepartment } =
  appointmentsSlice.actions;

export default appointmentsSlice.reducer;

export const selectFilteredAppointments = (state) => {
  if (state.appointments.filteredAppointments) {
    return state.appointments.filteredAppointments;
  }

  return state.appointments.appointments;
};
