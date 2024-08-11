import React, { useState, useEffect } from 'react';
import '../css/Information.css'; 
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import content from '../json/content.json'; 
import Cookies from 'js-cookie';

const CircleImage = () => {
  const [index, setIndex] = useState(0);
  const [language, setLanguage] = useState('hu'); 

  useEffect(() => {
    const storedLanguage = Cookies.get('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    const interval = setInterval(() => {
      const currentLanguage = Cookies.get('language');
      if (currentLanguage && currentLanguage !== language) {
        setLanguage(currentLanguage);
        setIndex(0); 
      }
    }, 1000); 
    return () => clearInterval(interval);
  }, [language]);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % content[language].length);
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + content[language].length) % content[language].length);
  };

  const { title, description, imagePath } = content[language][index];

  return (
    <div className="background">
      <div className="circle-image-container">
        <div className="circle"></div>
        <img className="image" src={imagePath} alt="Circle" />
        <div className="text-container">
          <Box className="box">
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="left-icon">
              <IconButton onClick={handlePrevious}>
                <ArrowBack />
              </IconButton>
            </div>
            <div className="right-icon">
              <IconButton onClick={handleNext}>
                <ArrowForward />
              </IconButton>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CircleImage;
