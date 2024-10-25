import React from 'react';
import { Cloud, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Cloud className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">WeatherPro</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Forecast</a>
            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Maps</a>
            <a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">Get Started</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">Forecast</a>
              <a href="#" className="block text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium">Maps</a>
              <a href="#" className="block bg-blue-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-600 transition-colors">Get Started</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}