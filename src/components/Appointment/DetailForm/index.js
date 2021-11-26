import React from 'react';
import { Select, Col, Row, Space, Button } from 'antd';

// import style from './Detail.module.css';

const AppointmentDetailForm = (props) => {
  const { statuses, handleChangeOption, value } = props;
  const renderOptions = () =>
    statuses.map((status) => (
      <Select.Option key={value} value={status}>
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
              defaultValue={statuses.find((item) => item === value)}
            >
              {renderOptions()}
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
