import React from 'react';
import { Col, Layout, Row, Select } from 'antd';

// import style from './index.module.css';

const AppointmentsFilter = () => {
  return (
    <Layout.Header>
      <Row justify="space-between" gutter={10}>
        <Col span={6}></Col>
        <Col offset={6} span={6}>
          <Select
            style={{ width: '100%', marginRight: '5px' }}
            placeholder="Select department"
          >
            <Select.Option value="1">Jack</Select.Option>
            <Select.Option value="2">Jack</Select.Option>
            <Select.Option value="3">Jack</Select.Option>
            <Select.Option value="4">Jack</Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <Select style={{ width: '100%' }} placeholder="Select Status">
            <Select.Option value="1">Jack</Select.Option>
            <Select.Option value="2">Jack</Select.Option>
            <Select.Option value="3">Jack</Select.Option>
            <Select.Option value="4">Jack</Select.Option>
          </Select>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default AppointmentsFilter;
