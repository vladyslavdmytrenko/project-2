import DeletePage from 'pages/Appointment/Delete';
import EditPage from 'pages/Appointment/Edit';
import HomePage from 'pages/Appointment/Home';
import InfoPage from 'pages/Appointment/Info';

export const PrivateRoutes = [
  { path: '/appointments/:id', Component: <InfoPage />, exact: true },
  { path: '/appointments/:id/delete', Component: <DeletePage />, exact: true },
  { path: '/appointments/:id/edit', Component: <EditPage />, exact: true },
];

export const PublicRoutes = [
  { path: '/', Component: <HomePage />, exact: true },
];
