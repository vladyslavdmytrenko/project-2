import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin, Result, Button } from 'antd';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import AppointmentDetailForm from 'components/Appointment/DetailForm';
import AppointmentDetail from 'components/Appointment/Detail';
import { FETCH_STATUS } from 'constant';
import {
  fetchAppointment,
  updateAppointment,
} from 'redux/reducers/appointmentsSlice';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(FETCH_STATUS.IDLE);
  const [fetchError, setFetchError] = useState(null);
  console.log(appointment);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const statuses = useSelector((state) =>
    state.appointments.appointmentStatus.filter((item) => item !== 'All')
  );

  const handleChangeOption = async (value) => {
    setAppointmentStatus(FETCH_STATUS.LOADING);
    try {
      await dispatch(updateAppointment(id, { status: value })).unwrap();
      setAppointmentStatus(FETCH_STATUS.SUCCEEDED);
    } catch (e) {
      setFetchError(e.message);
      setAppointmentStatus(FETCH_STATUS.FAILED);
    }
  };

  const getAppointment = async () => {
    setAppointmentStatus(FETCH_STATUS.LOADING);
    try {
      const result = await dispatch(fetchAppointment(id)).unwrap();
      console.log(result);
      setAppointment(result);

      setAppointmentStatus(FETCH_STATUS.SUCCEEDED);
    } catch (e) {
      console.log(e);
      setFetchError(e.message);
      setAppointmentStatus(FETCH_STATUS.FAILED);
    }
  };

  useEffect(() => {
    if (appointmentStatus === FETCH_STATUS.IDLE) {
      getAppointment(id);
    }
  });

  if (appointmentStatus === FETCH_STATUS.LOADING) {
    return (
      <Row style={{ height: '100%' }} justify="center" align="middle">
        <Col>
          <Spin />
        </Col>
      </Row>
    );
  }

  if (appointmentStatus === FETCH_STATUS.FAILED || !appointment) {
    return (
      <Row style={{ height: '100%' }} justify="center" align="middle">
        <Col>
          <Result
            status="warning"
            title={fetchError}
            extra={
              <Button type="primary" key="console" onClick={getAppointment}>
                Try again
              </Button>
            }
          />
        </Col>
      </Row>
    );
  }

  const renderHeader = () => {
    if (!isAuth) {
      return null;
    }

    return (
      <AppointmentDetailForm
        statuses={statuses}
        handleChangeOption={handleChangeOption}
        value={appointment.status}
      />
    );
  };

  return (
    <>
      {renderHeader()}
      <Row>
        <Col offset={1}>
          <Typography.Title level={2}>
            Appointment {id} Details
          </Typography.Title>
        </Col>
      </Row>
      <AppointmentDetail appointment={appointment} />
    </>
  );
};

export default DetailPage;
