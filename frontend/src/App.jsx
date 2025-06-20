import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import FacultyDashboard from './components/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/ForgotPassword';
import AdminForgotPassword from './components/AdminForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LoginPage />} />

        {/* Password reset routes */}
        <Route path="/faculty/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

        {/* Protected routes */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRole="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                <a
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;