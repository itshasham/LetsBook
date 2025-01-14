import React from "react";
import Link from "next/link";
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <div className="container">
        <div className="logo-brand">
          <Link href="/">
            <img
              src="/images/mainlogo.webp"
              alt="logo"
              className="logo-image"
            />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/Navbar_function/Home">Home</Link>
            </li>
            <li>
              <Link href="/Navbar_function/About">About</Link>
            </li>
            <li>
              <Link href="/Navbar_function/Services">Tours</Link>
            </li>
            <li>
              <Link href="/Navbar_function/Accessories">Accessories</Link>
            </li>
            <li>
              <Link href="/Navbar_function/ContactUs">Contact</Link>
            </li>
            <li>
              <Link href="/Navbar_function/Cart">View Cart</Link>
            </li>
            <li>
              <Link href="/Navbar_function/Login">Admin Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;