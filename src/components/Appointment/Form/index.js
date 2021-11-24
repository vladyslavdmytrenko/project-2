import React from 'react';
import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
} from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';

import style from './AppointmentForm.module.css';

const formatTime = 'HH:mm';
const formatDate = 'MM/DD/YYYY';
const wrapperLayoutInput = {
  span: 24,
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .max(100, 'Maximum is 100 characters')
    .required('Required'),
  lastName: yup
    .string()
    .max(100, 'Maximum is 100 characters')
    .required('Required'),
  appointmentDate: yup.date().required('Required'),
  appointmentTime: yup.date().required('Required'),
});

const AppointmentForm = (props) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      firstName: 'first name',
      secondName: '',
      appointmentDate: '',
      appointmentTime: '',
    },
    validationSchema,
    onSubmit: (values) => console.log(values),
  });
  console.log(values, touched, errors);
  return (
    <form onSubmit={handleSubmit}>
      <Row justify="space-around">
        <Col span={10}>
          <Form.Item
            name="First Name"
            label="First Name"
            wrapperCol={wrapperLayoutInput}
            help={touched.firstName && errors.firstName ? errors.firstName : ''}
            validateStatus={
              touched.firstName && errors.firstName ? 'error' : undefined
            }
            required
          >
            <Input
              name="firstName"
              placeholder="Enter first name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>

          <Row justify="space-between" align="bottom" wrap={false}>
            <Form.Item
              name="Appointment Date and Time"
              label="Appointment Date and Time"
              help={
                touched.appointmentDate && errors.appointmentDate
                  ? errors.appointmentDate
                  : ''
              }
              validateStatus={
                touched.appointmentDate && errors.appointmentDate
                  ? 'error'
                  : undefined
              }
            >
              <DatePicker
                input={style.input}
                format={formatDate}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.appointmentDate}
              />
            </Form.Item>
            <Form.Item input={style.input} name="Appointment time *">
              <TimePicker input={style.input} format={formatTime} />
            </Form.Item>
          </Row>

          <Form.Item
            name="Department *"
            label="Department *"
            wrapperCol={wrapperLayoutInput}
          >
            <Select placeholder="Select Department">
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="tom">Tom</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            name="Second Name *"
            label="Second Name *"
            wrapperCol={wrapperLayoutInput}
          >
            <Input placeholder="Enter second name" />
          </Form.Item>

          <Form.Item
            name="Phone number *"
            label="Phone number *"
            wrapperCol={wrapperLayoutInput}
          >
            <Input type="number" placeholder="(___)-____-___)" />
          </Form.Item>

          <Form.Item name="Notes" label="Notes" wrapperCol={wrapperLayoutInput}>
            <Input.TextArea placeholder="Enter notes" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 14, span: 10 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={resetForm}>
              Cancel
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </form>
  );
};

export default AppointmentForm;
