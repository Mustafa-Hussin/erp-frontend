import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../modules/auth/LoginPage';
import ForgotPasswordPage from '../modules/auth/ForgotPasswordPage';
import ChangePasswordPage from '../modules/auth/ChangePasswordPage';

// Import pages
import DashboardPage from '../modules/dashboard/DashboardPage';
import SalesPage from '../modules/sales/SalesPage';
import PurchasesPage from '../modules/purchases/PurchasesPage';
import InventoryPage from '../modules/inventory/InventoryPage';
import AccountsPage from '../modules/accounts/AccountsPage';
import UsersPage from '../modules/users/UsersPage';
import ReportsPage from '../modules/reports/ReportsPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/purchases" element={<PurchasesPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/accounts" element={<AccountsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/change-password" element={<ChangePasswordPage />} />
              </Routes>
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
