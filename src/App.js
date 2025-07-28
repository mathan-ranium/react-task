import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import NotFound from './pages/NotFound';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/users" /> : <Login />}
        />

        {/* Protected Routes */}
        {token ? (
          <>
            <Route path="/users" element={<Users />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        {/* Catch-all if token exists and route doesn't match */}
        {token && <Route path="*" element={<NotFound />} />}
      </Routes>
    </>
   
  );
}

export default App;
