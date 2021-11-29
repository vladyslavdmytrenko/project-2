import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from 'api/appointment';
import { dateTimeToTimestamp } from 'utils';

const initialState = {
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

export const fetchAppointment = createAsyncThunk(
  'appointment/fetchAppointment',
  async (id) => {
    const appointments = await api.get(`/appointments/${id}`);
    return appointments;
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (appointments) => {
    const timestamp = dateTimeToTimestamp(
      appointments.appointmentDate,
      appointments.appointmentTime
    );
    const transformData = {
      patient_name: `${appointments.firstName} ${appointments.secondName}`,
      appointment_date: timestamp,
      department: appointments.department,
      status: 'Pending',
      phone_number: appointments.phoneNumber,
      notes: appointments.notes,
    };

    const result = api.post('/appointments', transformData);
    return result;
  }
);

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async (data) => {
    const { id, changedData } = data;
    const result = await api.patch(`/appointments/${id}`, changedData);
    return result;
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (id) => {
    const appointmentDeleted = await api.delete(`/appointments/${id}`);
    return appointmentDeleted;
  }
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
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      })

      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })

      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = ['All', ...action.payload];
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
