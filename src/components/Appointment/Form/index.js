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
import moment from 'moment';
import NumberFormat from 'react-number-format';

import style from './AppointmentForm.module.css';

const formatTime = 'HH:mm';
const formatDate = 'MM/DD/YYYY';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .max(100, 'Maximum is 100 characters')
    .required('Required'),

  secondName: yup
    .string()
    .max(100, 'Maximum is 100 characters')
    .required('Required'),

  appointmentDate: yup
    .string()
    .nullable()
    .required('Required')
    .test(
      'dateTest',
      'Invalid date',
      (value) =>
        moment(value).format(formatDate) > moment(Date.now()).format(formatDate)
    ),

  appointmentTime: yup
    .string()
    .nullable()
    .required('Required')
    .test(
      'timeTest',
      'Invalid date',
      (value) =>
        moment(value).format(formatTime) > moment(Date.now()).format(formatTime)
    ),

  phoneNumber: yup
    .string()
    .matches(/\(\d{3}\)-\d{3}-\d{4}/g, 'Phone number is not valid')
    .required('Required'),

  notes: yup.string().max(500),
});

const AppointmentForm = (props) => {
  const initialValues = {
    firstName: '',
    secondName: '',
    appointmentDate: '',
    appointmentTime: '',
    phoneNumber: '',
    notes: '',
    department: null,
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldTouched,
    values,
    touched,
    errors,
    isValid,
  } = useFormik({
    isInitialValid: false,
    initialValues,
    validationSchema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <Form layout="vertical" autoComplete="off" onFinish={handleSubmit}>
      <Row justify="space-around">
        <Col span={10}>
          <Form.Item
            name="firstName"
            label="First Name"
            hasFeedback={touched.firstName}
            help={
              touched.firstName && errors.firstName ? errors.firstName : false
            }
            validateStatus={
              touched.firstName && errors.firstName ? 'error' : 'success'
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
              label="Appointment Date and Time"
              hasFeedback={touched.appointmentDate}
              help={
                touched.appointmentDate && errors.appointmentDate
                  ? errors.appointmentDate
                  : false
              }
              validateStatus={
                touched.appointmentDate && errors.appointmentDate
                  ? 'error'
                  : 'success'
              }
              required
            >
              <DatePicker
                className={style.input}
                allowClear={false}
                format={formatDate}
                onChange={(date) => {
                  setFieldValue('appointmentDate', date);
                }}
                onBlur={() => setFieldTouched('appointmentDate', true)}
                value={values.appointmentDate}
              />
            </Form.Item>

            <Form.Item
              hasFeedback={touched.appointmentTime}
              help={
                touched.appointmentTime && errors.appointmentTime
                  ? errors.appointmentTime
                  : false
              }
              validateStatus={
                touched.appointmentTime && errors.appointmentTime
                  ? 'error'
                  : 'success'
              }
              required
            >
              <TimePicker
                className={style.input}
                allowClear={false}
                format={formatTime}
                onChange={(time) => {
                  setFieldValue('appointmentTime', time);
                }}
                onBlur={() => setFieldTouched('appointmentTime')}
                value={values.appointmentTime}
              />
            </Form.Item>
          </Row>

          <Form.Item label="Department" required>
            <Select placeholder="Select Department">
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="tom">Tom</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            label="Second Name"
            hasFeedback={touched.secondName}
            help={
              touched.secondName && errors.secondName
                ? errors.secondName
                : false
            }
            validateStatus={
              touched.secondName && errors.secondName ? 'error' : 'success'
            }
            required
          >
            <Input
              placeholder="Enter second name"
              name="secondName"
              onChange={handleChange}
              onBlur={handleBlur}
              valuer={values.secondName}
            />
          </Form.Item>

          <Form.Item
            label="Phone number"
            hasFeedback={touched.phoneNumber}
            help={
              touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : false
            }
            validateStatus={
              touched.phoneNumber && errors.phoneNumber ? 'error' : 'success'
            }
            required
          >
            <NumberFormat
              name="phoneNumber"
              type="text"
              format="(###)-###-####"
              placeholder="(###)-###-####"
              mask="_"
              customInput={Input}
              onChange={(e) => {
                setFieldValue('phoneNumber', e.target.value);
              }}
              onBlur={handleBlur}
              value={values.phoneNumber}
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
            hasFeedback={touched.notes}
            help={touched.notes && errors.notes ? errors.notes : false}
            validateStatus={touched.notes && errors.notes ? 'error' : 'success'}
          >
            <Input.TextArea
              name="notes"
              placeholder="Enter notes"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.notes}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!isValid}>
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={() => resetForm({ values: initialValues })}
            >
              Cancel
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppointmentForm;
