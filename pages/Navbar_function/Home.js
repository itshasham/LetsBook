import React from 'react';
import './Home.css';
import Link from 'next/link'; 
// import FeaturedProducts from '../Admin/Accessories/Accessories_function/FeatureProduct';
import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div className="image-container">
          <div className="text-content">
            <h1>DON'T MISS <br>
            </br>THE JOURNEY <br /> </h1>
            <p>Explore new destinations and feel the excitement with every step.<br />
              Start your adventure today!</p>
            <Link href="/Navbar_function/Services">
              <button className="shop-button">EXPLORE TRIPS</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        {/* <FeaturedProducts/> */}
      </div>
    </div>




  );
}

export default Home;
