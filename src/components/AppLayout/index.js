import React from 'react';
import { Layout } from 'antd';

import Sidebar from 'components/Sidebar';
import Router from 'router';

const AppRouter = () => {
  return (
    <Layout>
      <Sidebar />

      <Layout>
        <Router />
      </Layout>
    </Layout>
  );
};

export default AppRouter;
