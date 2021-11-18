import React from 'react';

import AppointmentTable from 'components/Appointment/Table';
import AppointmentsFilter from 'components/Appointment/AppointmentsFilter';

const HomePage = () => {
  return (
    <>
      <AppointmentsFilter />
      <AppointmentTable />
    </>
  );
};

export default HomePage;
