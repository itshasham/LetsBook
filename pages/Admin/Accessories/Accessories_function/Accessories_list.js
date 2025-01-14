import React from 'react';
import Link from 'next/link';  
import '../Accessories_style/viewallaccessories.css'; 

const AccessoriesPage = () => {
  return (
    <div className="admin-container">
      <div className="sidebar">
        <h1 className="sidebar-title">Admin Dashboard</h1>
        <ul className="sidebar-menu">
          <li>
            <Link href="/Admin/Accessories/Accessories_function/add_accessories" passHref>
              <img src='/images/plus.png' alt="Add Icon" className="sidebar-icon" /> Add New Accessory
            </Link>
          </li>
          <li>
            <Link href="/Admin/Accessories/Accessories_function/viewallaccessories" passHref>
              <img src='/images/eye.png' alt="View Icon" className="sidebar-icon" /> View All Accessories
            </Link>
          </li>
          <li>
            <Link href="/Admin/Accessories/Accessories_function/add_accessories" passHref>
              <img src='/images/cloud-sun.png' alt="Weather Icon" className="sidebar-icon" /> Weather
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h2>Manage Accessories</h2>
      </div>
    </div>
  );
};

export default AccessoriesPage;
