import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoutes from 'components/PrivateRoute';

import All from 'pages/Appointment/All';
import Delete from 'pages/Appointment/Delete';
import Detail from 'pages/Appointment/Detail';
import Edit from 'pages/Appointment/Edit';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<All />} />

      <Route path="/appointment/:id" element={<Detail />} />

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
  );
};

export default Router;
