import React from 'react';
import { Layout, Menu, Spin } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { login, logout } from 'redux/reducers/authSlice';
import { FETCH_STATUS } from 'constant';

import style from './Sidebar.module.css';

const Sidebar = () => {
  const { isAuth, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClickMenuItem = ({ key }) => {
    if (key === 'login') {
      dispatch(login());
    }

    if (key === 'logout') {
      dispatch(logout());
    }
  };

  const renderMenu = () => {
    if (status === FETCH_STATUS.LOADING) {
      return (
        <Menu.Item key="spin">
          <Spin />
        </Menu.Item>
      );
    }

    if (!isAuth) {
      return (
        <Menu.Item icon={<LoginOutlined />} key="login">
          Login
        </Menu.Item>
      );
    }

    return (
      <Menu.Item icon={<LogoutOutlined />} key="logout">
        logout
      </Menu.Item>
    );
  };

  return (
    <>
      <Layout.Sider className={style.sidebar} collapsible={true}>
        <Menu theme="dark" className={style.menu} onClick={onClickMenuItem}>
          {renderMenu()}
        </Menu>
      </Layout.Sider>
    </>
  );
};

export default Sidebar;
