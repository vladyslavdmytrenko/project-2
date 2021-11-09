import React from 'react';
import { Table } from 'antd';

// import style from '';

const columns = [
  {
    title: 'Patient Name',
    dataIndex: 'patientName',
    key: 'patientName',
  },
  {
    title: 'Appointment date',
    dataIndex: 'appointmentDate',
    key: 'appointmentDate',
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const dataSource = [
  {
    key: 1,
    patientName: 'Keisha Avalos',
    appointmentDate: '12/21/2021 03:00 PM',
    department: 'Cardiology',
    status: 'Active',
  },
  {
    key: 2,
    patientName: 'Keisha Avalos',
    appointmentDate: '12/21/2021 03:00 PM',
    department: 'Cardiology',
    status: 'Active',
  },
  {
    key: 3,
    patientName: 'Keisha Avalos',
    appointmentDate: '12/21/2021 03:00 PM',
    department: 'Cardiology',
    status: 'Active',
  },
  {
    key: 4,
    patientName: 'Keisha Avalos',
    appointmentDate: '12/21/2021 03:00 PM',
    department: 'Cardiology',
    status: 'Active',
  },
  {
    key: 5,
    patientName: 'Keisha Avalos',
    appointmentDate: '12/21/2021 03:00 PM',
    department: 'Cardiology',
    status: 'Active',
  },
];

const AppointmentTable = () => {
  const handlerRow = (record, index) => {
    return {
      onClick: (e) => {
        console.log(record, index);
      },
    };
  };

  return (
    <Table
      style={{ padding: '15px' }}
      columns={columns}
      dataSource={dataSource}
      onRow={handlerRow}
    />
  );
};

export default AppointmentTable;
