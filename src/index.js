import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import userReducer from './features/users/userSlice';
import authReducer from './features/auth/authSlice'; // ✅ Import auth slice

const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer, // ✅ Add auth to store
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter> {/* ✅ Wrap with router */}
      <App />
    </BrowserRouter>
  </Provider>
);
