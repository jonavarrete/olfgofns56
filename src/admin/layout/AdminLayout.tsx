import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Navigate } from 'react-router-dom';

export default function AdminLayout() {
  const { state } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!state.currentAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-space-gradient text-white relative">
      <div className="flex relative z-10 min-h-screen">
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
        <div className="flex-1 relative flex flex-col min-w-0">
          <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-4 lg:p-6 relative overflow-x-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}