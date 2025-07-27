// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import NotFound from './pages/NotFound';
import React from 'react';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {token ? (
        <>
          <Route path="/users" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
