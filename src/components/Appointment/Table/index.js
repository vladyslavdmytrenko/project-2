import React, { useEffect, useState } from 'react';
import { Table, Result, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { FETCH_STATUS } from 'constant';
import {
  fetchAppointments,
  selectFilteredAppointments,
} from 'redux/reducers/appointmentsSlice';
import { timestampToDateTime } from 'utils';

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
    render: (timestamp) => timestampToDateTime(timestamp),
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.appointment_date - b.appointment_date,
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
  const [status, setStatus] = useState(FETCH_STATUS.IDLE);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === FETCH_STATUS.IDLE) {
      getAppointments();
    }
  });

  const getAppointments = async () => {
    setStatus(FETCH_STATUS.LOADING);
    try {
      await dispatch(fetchAppointments()).unwrap();
      setStatus(FETCH_STATUS.SUCCEEDED);
    } catch (e) {
      setError(e.message);
      setStatus(FETCH_STATUS.FAILED);
    }
  };

  const handlerRow = (record) => {
    return {
      onClick: () => {
        navigate(`appointment/${record.id}`);
      },
    };
  };

  const onReFetchAppointment = () => {
    getAppointments();
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
      rowKey={(record) => record.id}
      loading={status === !FETCH_STATUS.SUCCEEDED}
      pagination={{ showSizeChanger: false }}
    />
  );
};

export default AppointmentTable;
