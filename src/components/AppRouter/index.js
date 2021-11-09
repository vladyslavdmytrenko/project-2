import React from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from 'antd';

import Sidebar from 'components/Sidebar';

import { PublicRoutes, PrivateRoutes } from 'router';

const AppRouter = () => {
  const renderRoute = (routes) =>
    routes.map(({ path, Component, exact }, idx) => (
      <Route key={idx} path={path} element={Component} exact={exact} />
    ));

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Routes>
          {renderRoute(PublicRoutes)} {renderRoute(PrivateRoutes)}
        </Routes>
      </Layout>
    </Layout>
  );
};

export default AppRouter;
