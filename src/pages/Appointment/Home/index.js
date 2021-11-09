import React from 'react';

import AppointmentTable from 'components/Appointment/Table';
import AppointmentForm from 'components/Appointment/TableForm';

const HomePage = () => {
  return (
    <>
      <AppointmentForm />
      <AppointmentTable />
    </>
  );
};

export default HomePage;
