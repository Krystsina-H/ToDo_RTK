import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import './App.css';
import Auth from './pages/auth';
import Todos from './pages/todos';
import NotFount from './pages/notFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default App;
