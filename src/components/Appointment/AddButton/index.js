import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import AppointmentForm from 'components/Appointment/Form';

const AddButton = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!isAuth) return null;

  const onShowModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        icon={<PlusCircleOutlined />}
        shape="circle"
        size="large"
        onClick={onShowModal}
      />
      <Modal
        title="Create an Appointment"
        visible={isModalVisible}
        onCancel={handleCancel}
        width="80%"
        footer={null}
      >
        <AppointmentForm />
      </Modal>
    </>
  );
};

export default AddButton;
