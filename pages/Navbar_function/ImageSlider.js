import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const images = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/8.jpg',
  '/images/9.jpg',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} 
      >
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={image} alt={`Slide ${index}`} className="slide-image" />
          </div>
        ))}
      </div>
      <button className="prev" onClick={handlePrev}>❮</button>
      <button className="next" onClick={handleNext}>❯</button>
    </div>
  );
};

export default ImageSlider;
