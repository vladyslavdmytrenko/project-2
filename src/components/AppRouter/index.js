import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import PrivateRoutes from 'components/PrivateRoute';
import Sidebar from 'components/Sidebar';

import All from 'pages/Appointment/All';
import Delete from 'pages/Appointment/Delete';
import Detail from 'pages/Appointment/Detail';
import Edit from 'pages/Appointment/Edit';

const AppRouter = () => {
  return (
    <Layout>
      <Sidebar />

      <Layout>
        <Routes>
          <Route path="/" element={<All />} />

          <Route
            path="/appointment/:id"
            element={
              <PrivateRoutes>
                <Detail />
              </PrivateRoutes>
            }
          />

          <Route
            path="/appointment/:id/delete"
            element={
              <PrivateRoutes>
                <Delete />
              </PrivateRoutes>
            }
          />

          <Route
            path="/appointment/:id/edit"
            element={
              <PrivateRoutes>
                <Edit />
              </PrivateRoutes>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default AppRouter;
