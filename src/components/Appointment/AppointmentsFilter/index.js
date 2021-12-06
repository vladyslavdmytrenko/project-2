import React, { useState, useEffect } from 'react';
import { Col, Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
  filterAppointment,
  fetchDepartments,
} from 'redux/reducers/appointmentsSlice';
import { FETCH_STATUS } from 'constant';

// import style from './index.module.css';

const AppointmentsFilter = () => {
  const dispatch = useDispatch();
  const [departmentStatus, setDepartmentStatus] = useState(FETCH_STATUS.IDLE);
  const { filterCriteria, appointmentStatus, departments } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepartmentStatus(FETCH_STATUS.LOADING);

      try {
        await dispatch(fetchDepartments()).unwrap();
        setDepartmentStatus(FETCH_STATUS.SUCCEEDED);
      } catch (e) {
        setDepartmentStatus(FETCH_STATUS.FAILED);
      }
    };

    if (departmentStatus === FETCH_STATUS.IDLE) {
      fetchDepartment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentStatus]);

  const onDepartmentChange = (value) => {
    if (departmentStatus !== FETCH_STATUS.LOADING) {
      dispatch(filterAppointment({ ...filterCriteria, department: value }));
    }
  };

  const onStatusChange = (value) => {
    dispatch(
      filterAppointment({ ...filterCriteria, appointmentStatus: value })
    );
  };

  const renderStatus = appointmentStatus.map((item) => (
    <Select.Option value={item} key={item}>
      {item}
    </Select.Option>
  ));

  const renderDepartments = () => {
    if (departmentStatus === FETCH_STATUS.LOADING) {
      return (
        <Select.Option value="Spin" key="Spin">
          <Spin />
        </Select.Option>
      );
    }

    return departments.map((item) => (
      <Select.Option value={item} key={item}>
        {item}
      </Select.Option>
    ));
  };

  return (
    <>
      <Col span={11}>
        <Select
          style={{ width: '100%', marginRight: '5px' }}
          placeholder="Select department"
          onChange={onDepartmentChange}
        >
          {renderDepartments()}
        </Select>
      </Col>
      <Col offset={2} span={11}>
        <Select
          style={{ width: '100%' }}
          placeholder="Select Status"
          onChange={onStatusChange}
        >
          {renderStatus}
        </Select>
      </Col>
    </>
  );
};

export default AppointmentsFilter;
