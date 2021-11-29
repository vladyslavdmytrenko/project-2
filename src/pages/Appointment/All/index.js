import React from 'react';
import { Row, Col } from 'antd';

import AppointmentTable from 'components/Appointment/Table';
import AppointmentsFilter from 'components/Appointment/AppointmentsFilter';
import AddButton from 'components/Appointment/AddButton';

const HomePage = () => {
  return (
    <>
      <Row style={{ margin: '15px' }} justify="space-between" gutter={10}>
        <Col span={6}>
          <AddButton />
        </Col>
        <Col span={12}>
          <Row>
            <AppointmentsFilter />
          </Row>
        </Col>
      </Row>

      <AppointmentTable />
    </>
  );
};

export default HomePage;
