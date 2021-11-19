import React, { useEffect } from 'react';
import { Table, Result, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { FETCH_STATUS } from 'constant';
import {
  fetchAppointments,
  selectFilteredAppointments,
} from 'redux/reducers/appointmentsSlice';
import { timestampToDate } from 'utils';

import style from './Table.module.css';

const columns = [
  {
    title: 'Patient Name',
    dataIndex: 'patient_name',
    key: 'patient_name',
  },
  {
    title: 'Appointment date',
    dataIndex: 'appointment_date',
    key: 'appointment_date',
    render: (timestamp) => timestampToDate(timestamp),
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

const AppointmentTable = () => {
  const appointments = useSelector(selectFilteredAppointments);
  const { status, error } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  const getAppointment = () => dispatch(fetchAppointments());
  const navigate = useNavigate();

  useEffect(() => {
    if (status === FETCH_STATUS.IDLE) {
      getAppointment();
    }
  });

  const handlerRow = (record) => {
    return {
      onClick: () => {
        navigate(`appointment/${record.id}`);
      },
    };
  };

  const onReFetchAppointment = () => {
    getAppointment();
  };

  if (status === FETCH_STATUS.FAILED) {
    return (
      <Result
        status="warning"
        title={error}
        extra={
          <Button type="primary" key="console" onClick={onReFetchAppointment}>
            Try again
          </Button>
        }
      />
    );
  }

  return (
    <Table
      className={style.table}
      columns={columns}
      dataSource={appointments}
      onRow={handlerRow}
      loading={status === FETCH_STATUS.LOADING}
    />
  );
};

export default AppointmentTable;
