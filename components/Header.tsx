import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 shadow-lg z-50 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <span className="text-white font-bold text-xl">Nevzat Atlay</span>
        </div>

        {/* Weather App Title */}
        <h3 className="text-3xl font-extrabold text-white tracking-wider uppercase">
          Weather App
        </h3>
      </div>
    </header>
  );
};

export default Header;
