import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

import style from './Detail.module.css';
import { timestampToDateTime } from 'utils';

const AppointmentDetail = (props) => {
  const { appointment_date, department, notes, patient_name, phone_number } =
    props.appointment;

  return (
    <>
      <Row justify="space-around" className={style.container}>
        <Col span={10}>
          <Card title="General Information" className={style.card}>
            <Row>
              <Col span={12}>
                <Typography.Title level={4}>Appointment date:</Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Title level={4}>
                  {timestampToDateTime(appointment_date)}
                </Typography.Title>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Typography.Title level={4}>Department: </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Title level={4}>{department}</Typography.Title>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Typography.Title level={4}>Notes: </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Title level={4}>{notes}</Typography.Title>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={10}>
          <Card title="Contact Information" className={style.card}>
            <Row>
              <Col span={12}>
                <Typography.Title level={4}>
                  Patient full name:{' '}
                </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Title level={4}>{patient_name}</Typography.Title>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Typography.Title level={4}>Contact number: </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Title level={4}>{phone_number}</Typography.Title>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AppointmentDetail;
