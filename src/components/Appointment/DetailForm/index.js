import React from 'react';

import { Select, Col, Row, Space, Button } from 'antd';

// import style from './Detail.module.css';

const AppointmentDetailForm = () => {
  return (
    <>
      <Row justify="end" style={{ padding: 10 }}>
        <Col>
          <Space>
            <Select
              style={{ width: '100%', marginRight: '5px' }}
              placeholder="Select department"
              size="large"
            >
              <Select.Option value="1">Jack</Select.Option>
              <Select.Option value="2">Jack</Select.Option>
              <Select.Option value="3">Jack</Select.Option>
              <Select.Option value="4">Jack</Select.Option>
            </Select>
            <Button type="primary" size="large">
              Edit
            </Button>
            <Button type="primary" size="large">
              Delete
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default AppointmentDetailForm;
