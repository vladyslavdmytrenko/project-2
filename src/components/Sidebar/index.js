import React from 'react';
import { Layout, Menu, Spin } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import {
  authStatusSelector,
  isAuthSelector,
  login,
  logout,
} from 'redux/reducers/authSlice';
import { FETCH_STATUS } from 'constant';

import style from './Sidebar.module.css';

const Sidebar = () => {
  const isAuth = useSelector(isAuthSelector);
  const status = useSelector(authStatusSelector);
  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(logout());
  };

  const handlerLogin = () => {
    dispatch(login());
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
        <Menu.Item icon={<LoginOutlined />} key="login" onClick={handlerLogin}>
          Login
        </Menu.Item>
      );
    }

    return (
      <Menu.Item icon={<LogoutOutlined />} key="logout" onClick={handlerLogout}>
        logout
      </Menu.Item>
    );
  };

  return (
    <>
      <Layout.Sider className={style.sidebar} collapsible={true}>
        <Menu theme="dark" className={style.menu}>
          {renderMenu()}
        </Menu>
      </Layout.Sider>
    </>
  );
};

export default Sidebar;
