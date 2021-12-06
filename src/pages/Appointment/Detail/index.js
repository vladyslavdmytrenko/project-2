import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Spin, Result, Button } from 'antd';

import AppointmentDetailForm from 'components/Appointment/DetailForm';
import AppointmentDetail from 'components/Appointment/Detail';
import { FETCH_STATUS } from 'constant';
import {
  fetchAppointment,
  updateAppointment,
} from 'redux/reducers/appointmentsSlice';

const DetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appointment, setAppointment] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(FETCH_STATUS.IDLE);
  const [fetchError, setFetchError] = useState(null);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const statuses = useSelector((state) =>
    state.appointments.appointmentStatus.filter((item) => item !== 'All')
  );

  useEffect(() => {
    if (appointmentStatus === FETCH_STATUS.IDLE) {
      getAppointment(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentStatus]);

  const getAppointment = async (id) => {
    setAppointmentStatus(FETCH_STATUS.LOADING);
    try {
      const result = await dispatch(fetchAppointment(id)).unwrap();

      setAppointment(result);
      setAppointmentStatus(FETCH_STATUS.SUCCEEDED);
    } catch (e) {
      setFetchError(e.message);
      setAppointmentStatus(FETCH_STATUS.FAILED);
    }
  };

  const handleChangeOption = async (value) => {
    setAppointmentStatus(FETCH_STATUS.LOADING);
    try {
      const result = await dispatch(
        updateAppointment({ id, changedData: { status: value } })
      ).unwrap();

      setAppointment(result);
      setAppointmentStatus(FETCH_STATUS.SUCCEEDED);
    } catch (e) {
      setFetchError(e.message);
      setAppointmentStatus(FETCH_STATUS.FAILED);
    }
  };

  const handleNavigateToEdit = () => {
    navigate(`/appointment/${id}/edit`);
  };

  const handleNavigateToDelete = () => {
    navigate(`/appointment/${id}/delete`);
  };

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
        value={appointment.status}
        handleChangeOption={handleChangeOption}
        handleNavigateToEdit={handleNavigateToEdit}
        handleNavigateToDelete={handleNavigateToDelete}
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
