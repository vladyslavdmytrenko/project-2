import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Row, Col, Button, Spin, Result, Typography, Modal } from 'antd';

import AppointmentDetail from 'components/Appointment/Detail';
import {
  deleteAppointment,
  fetchAppointment,
} from 'redux/reducers/appointmentsSlice';
import { FETCH_STATUS } from 'constant';

const DeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appointment, setAppointment] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(FETCH_STATUS.IDLE);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (appointmentStatus === FETCH_STATUS.IDLE) {
      getAppointment(id);
    }
  });

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

  const handleOk = async () => {
    try {
      await dispatch(deleteAppointment(id)).unwrap();
      navigate(`/`);
    } catch (e) {}
  };

  const handleCancel = () => {
    navigate(`/appointment/${id}`);
  };

  if (
    appointmentStatus === FETCH_STATUS.LOADING ||
    appointmentStatus === FETCH_STATUS.IDLE
  ) {
    return (
      <Row style={{ height: '100%' }} justify="center" align="middle">
        <Col>
          <Spin />
        </Col>
      </Row>
    );
  }

  if (appointmentStatus === FETCH_STATUS.FAILED) {
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

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={1}>Delete Appointment {id}</Typography.Title>
        </Col>
      </Row>

      <AppointmentDetail appointment={appointment} />

      <Modal
        title="Create an Appointment"
        visible={true}
        width="80%"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Title level={3}>
          Are you sure you want to delete this appointment ?
        </Typography.Title>
      </Modal>
    </>
  );
};

export default DeletePage;
