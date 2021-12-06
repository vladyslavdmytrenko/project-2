import React, { useEffect, useState } from 'react';
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
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';

import { validationSchema } from '../validationForm';
import {
  DATE_FORMAT,
  TIME_FORMAT,
  INITIAL_FORM_VALUES,
  FETCH_STATUS,
} from 'constant';

import style from './AppointmentForm.module.css';
import { fetchDepartments } from 'redux/reducers/appointmentsSlice';

const renderOptionDepartments = (departments) => {
  if (!departments) return null;

  return departments.map((item) => (
    <Select.Option key={item} value={item}>
      {item}
    </Select.Option>
  ));
};

const AppointmentForm = (props) => {
  const {
    onSubmitAction,
    onCancelAction,
    formValues,
    submitTitle,
    cancelTitle,
  } = props;

  const initialValues = formValues || INITIAL_FORM_VALUES;

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    setFieldTouched,
    values,
    touched,
    errors,
    isValid,
  } = useFormik({
    validateOnMount: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmitAction && onSubmitAction(values);
      resetForm();
    },
  });

  const dispatch = useDispatch();
  const departments = useSelector((state) =>
    state.appointments.departments.filter((item) => item !== 'All')
  );
  const [departmentStatus, setDepartmentStatus] = useState(FETCH_STATUS.IDLE);

  useEffect(() => {
    const getDepartments = async () => {
      setDepartmentStatus(FETCH_STATUS.LOADING);

      try {
        await dispatch(fetchDepartments()).unwrap();
        setDepartmentStatus(FETCH_STATUS.SUCCEEDED);
      } catch (e) {
        setDepartmentStatus(FETCH_STATUS.FAILED);
      }
    };

    if (departmentStatus !== FETCH_STATUS.IDLE) {
      getDepartments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentStatus]);

  const handleCancel = () => {
    resetForm();
    onCancelAction && onCancelAction();
  };

  return (
    <Form layout="vertical" autoComplete="off" onFinish={handleSubmit}>
      <Row justify="space-around">
        <Col span={10}>
          <Form.Item
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
                format={DATE_FORMAT}
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
                format={TIME_FORMAT}
                minuteStep={60}
                onChange={(time) => {
                  setFieldValue('appointmentTime', time);
                }}
                onBlur={() => setFieldTouched('appointmentTime')}
                value={values.appointmentTime}
              />
            </Form.Item>
          </Row>

          <Form.Item
            label="Department"
            hasFeedback={touched.department}
            help={
              touched.department && errors.department
                ? errors.department
                : false
            }
            validateStatus={
              touched.department && errors.department ? 'error' : 'success'
            }
            required
          >
            <Select
              name="department"
              placeholder="Select Department"
              onChange={(value) => {
                setFieldValue('department', value);
              }}
              onBlur={() => setFieldTouched('department')}
              loading={departmentStatus === FETCH_STATUS.LOADING}
              value={values.department}
            >
              {renderOptionDepartments(departments)}
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
              name="secondName"
              type="text"
              placeholder="Enter second name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.secondName}
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
            <Button htmlType="button" onClick={handleCancel}>
              {cancelTitle}
            </Button>
            <Button type="primary" htmlType="submit" disabled={!isValid}>
              {submitTitle}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppointmentForm;
