import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

import style from './Detail.module.css';

const AppointmentDetail = () => {
  return (
    <>
      <Row>
        <Col offset={1}>
          <Typography.Title level={1}>Appointment #id Details</Typography.Title>
        </Col>
      </Row>

      <Row justify="space-around" className={style.container}>
        <Col span={10}>
          <Card title="General Information" className={style.card}>
            <Row>
              <Col span={12}>
                <Typography.Title level={3}>Appointment date:</Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Title level={3}>
                  12/21/2021 03:00 PM
                </Typography.Title>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={10}>
          <Card title="Contact Information" className={style.card}>
            Contact Information
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AppointmentDetail;
