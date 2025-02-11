import React from 'react';

const Footer = () => {
  return (
    <footer className="botom-0 bg-blue-500 p-4 shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-white font-bold text-xl">Nevzat Atlay</span>
        </div>
        <p className="text-white text-sm">
          © {new Date().getFullYear()} Weather App - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
