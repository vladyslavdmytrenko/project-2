import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRouter from 'components/AppLayout';

import 'antd/dist/antd.css';
import './App.css';
import { store } from 'redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
