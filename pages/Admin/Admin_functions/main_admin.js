import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/token';
import '../Admin_css/main_admin.css'; 
import Navbar from '@/components/Navbar';

const AdminPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div>
      <Navbar/>
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Admin Dashboard</h1>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link href="/Admin/Tour/Tour_functions/add_tour" className="sidebar-item">
              <img src='/images/plus.png' alt="Add Trip" className="sidebar-icon" />
              Add New Trip
            </Link>
          </li>
          <li>
            <Link href="/Admin/Accessories/Accessories_function/Accessories_list" className="sidebar-item">
              <img src='/images/manage.png' alt="Manage Accessories" className="sidebar-icon" />
              Manage Accessories
            </Link>
          </li>
          <li>
            <Link href="/Admin/Tour/Tour_functions/view_all_tours" className="sidebar-item">
              <img src='/images/eye.png' alt="View All Tours" className="sidebar-icon" />
              View All Tours
            </Link>
            <Link href="/Admin/Admin_functions/viewOrders" className="sidebar-item">
              View Orders
            </Link>
            <Link href="/Admin/Admin_functions/viewMessages" className="sidebar-item">
              View Contact Messages
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
    </div>
  );
};

export default AdminPage;
