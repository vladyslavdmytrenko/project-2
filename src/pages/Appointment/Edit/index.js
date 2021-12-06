import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Row, Col, Spin, Result, Button } from 'antd';

import AppointmentForm from 'components/Appointment/Form';
import { updateAppointment } from 'redux/reducers/appointmentsSlice';
import { useNavigate, useParams } from 'react-router';

import { FETCH_STATUS } from 'constant';
import { fetchAppointment } from 'redux/reducers/appointmentsSlice';
import { timestampToMoment, dateTimeToTimestamp } from 'utils';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appointment, setAppointment] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(FETCH_STATUS.IDLE);
  const [fetchError, setFetchError] = useState(null);
  const [formValue, setFormValue] = useState(null);

  const handleOk = async (newAppointment) => {
    const timestamp = dateTimeToTimestamp(
      newAppointment.appointmentDate,
      newAppointment.appointmentTime
    );
    const transformData = {
      patient_name: `${newAppointment.firstName} ${newAppointment.secondName}`,
      appointment_date: timestamp,
      department: newAppointment.department,
      phone_number: newAppointment.phoneNumber,
      notes: newAppointment.notes,
    };

    try {
      await dispatch(updateAppointment({ id, changedData: transformData }));
      navigate(`/appointment/${id}`);
    } catch (e) {}
  };

  const handleCancel = () => {
    navigate(`/appointment/${id}`);
  };

  useEffect(() => {
    if (appointmentStatus === FETCH_STATUS.IDLE) {
      getAppointment(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentStatus]);

  const getAppointment = async () => {
    setAppointmentStatus(FETCH_STATUS.LOADING);
    try {
      const result = await dispatch(fetchAppointment(id)).unwrap();

      const formValue = {
        firstName: result.patient_name.split(' ')[0],
        secondName: result.patient_name.split(' ')[1],
        appointmentDate: timestampToMoment(result.appointment_date),
        appointmentTime: timestampToMoment(result.appointment_date),
        phoneNumber: result.phone_number,
        notes: result.notes,
        department: result.department,
      };

      setFormValue(formValue);
      setAppointment(result);
      setAppointmentStatus(FETCH_STATUS.SUCCEEDED);
    } catch (e) {
      setFetchError(e.message);
      setAppointmentStatus(FETCH_STATUS.FAILED);
    }
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
  return (
    <>
      <Typography.Title level={1}>Edit Appointment {id}</Typography.Title>

      <AppointmentForm
        onCancelAction={handleCancel}
        onSubmitAction={handleOk}
        formValues={formValue}
        submitTitle="Edit"
        cancelTitle="Cancel"
      />
    </>
  );
};

export default EditPage;
