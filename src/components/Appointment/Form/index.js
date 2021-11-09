import React from 'react';
import { Col, Row, Form, Input, DatePicker, TimePicker, Select } from 'antd';

import style from './AppointmentForm.module.css';

const formatTime = 'HH:mm';
const formatDate = 'MM/DD/YYYY';

const AppointmentForm = () => {
  return (
    <Form layout="vertical" autoComplete="off" size="large">
      <Row justify="space-around">
        <Col span={10}>
          <Form.Item name="First Name *" label="First Name *">
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Row justify="space-between" align="bottom" wrap={false}>
            <Form.Item
              name="Appointment Date and Time *"
              label="Appointment Date and Time *"
            >
              <DatePicker input={style.input} format={formatDate} />
            </Form.Item>
            <Form.Item input={style.input} name="Appointment time *">
              <TimePicker input={style.input} format={formatTime} />
            </Form.Item>
          </Row>
          <Form.Item name="Department *" label="Department *">
            <Select placeholder="Select Department">
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="tom">Tom</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="Second Name *" label="Second Name *">
            <Input placeholder="Enter second name" />
          </Form.Item>
          <Form.Item name="Phone number *" label="Phone number *">
            <Input type="number" placeholder="(___)-____-___)" />
          </Form.Item>
          <Form.Item name="Notes" label="Notes">
            <Input.TextArea placeholder="Enter notes" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppointmentForm;
