import React from 'react';
import { Select, Col, Row, Space, Button } from 'antd';

// import style from './Detail.module.css';

const AppointmentDetailForm = (props) => {
  const {
    statuses,
    value,
    handleChangeOption,
    handleNavigateToEdit,
    handleNavigateToDelete,
  } = props;

  const renderOptions = () =>
    statuses.map((status) => (
      <Select.Option key={status} value={status}>
        {status}
      </Select.Option>
    ));

  return (
    <>
      <Row justify="end" style={{ padding: 10 }}>
        <Col>
          <Space>
            <Select
              style={{ width: '100%', marginRight: '5px' }}
              placeholder="Select department"
              size="large"
              onChange={handleChangeOption}
              defaultValue={value}
            >
              {renderOptions()}
            </Select>
            <Button type="primary" size="large" onClick={handleNavigateToEdit}>
              Edit
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleNavigateToDelete}
            >
              Delete
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default AppointmentDetailForm;
