import React from 'react';
import { Layout, Menu } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

import style from './Sidebar.module.css';

const Sidebar = () => {
  const isAuth = true;
  return (
    <>
      <Layout.Sider className={style.sidebar} collapsible={true}>
        <Menu
          theme="dark"
          className={style.menu}
          onClick={(...arg) => console.log(arg)}
        >
          {!isAuth ? (
            <Menu.Item icon={<LoginOutlined />} key="login">
              Login
            </Menu.Item>
          ) : (
            <Menu.Item icon={<LogoutOutlined />} key="login">
              logout
            </Menu.Item>
          )}
        </Menu>
      </Layout.Sider>
    </>
  );
};

export default Sidebar;
