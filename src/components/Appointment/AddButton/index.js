import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import AppointmentForm from 'components/Appointment/Form';
import { createAppointment } from 'redux/reducers/appointmentsSlice';

const AddButton = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  if (!isAuth) return null;

  const onShowModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (newAppointment) => {
    await dispatch(createAppointment(newAppointment));
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
        width="80%"
        footer={null}
      >
        <AppointmentForm
          onCancelAction={handleCancel}
          onSubmitAction={handleOk}
          submitTitle="Create"
          cancelTitle="Cancel"
        />
      </Modal>
    </>
  );
};

export default AddButton;
