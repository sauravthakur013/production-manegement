// src/components/UI/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, User, LayoutDashboard, LineChart } from 'lucide-react';
import { usePathname } from 'next/navigation';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPage = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to determine if a link is active
  const isActive = (path: string) => currentPage === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white/95 border-b border-gray-200 py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/dashboard" className="text-xl font-bold text-gray-800 uppercase">
              prod-manager
            </a>
          </div>

         

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center">
          <a 
              href="/dashboard" 
              className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              } rounded`}
            >
              <LineChart size={18} />
              <span>Dashboard</span>
            </a>
            
            <a 
              href="/control-tower" 
              className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors ${
                isActive('/control-tower') 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              } rounded mx-2`}
            >
              <LayoutDashboard size={18} />
              <span>Control Tower</span>
            </a>
            
            <a 
              href="/profile" 
              className={`flex items-center space-x-2 px-4 py-2 font-medium transition-colors ${
                isActive('/profile') 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              } rounded`}
            >
              <User size={18} />
              <span>Profile</span>
            </a>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex md:hidden items-center space-x-1">
            
            <a 
              href="/dashboard" 
              className={`p-2 rounded-full ${
                isActive('/dashboard') 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LineChart size={20} />
            </a>
            <a 
              href="/control-tower" 
              className={`p-2 rounded-full ${
                isActive('/control-tower') 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard size={20} />
            </a>
            <a 
              href="/profile" 
              className={`p-2 rounded-full ${
                isActive('/profile') 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User size={20} />
            </a>
            
            
            {/* Mobile Menu Button */}
            {/* <button 
              className="p-2 ml-1 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button> */}
          </div>
        </div>

        {/* Mobile Menu */}
        {/* {isMobileMenuOpen && (
          <div className="md:hidden py-4 mt-2 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <a href="/" className="px-2 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Home
              </a>
              <a href="/products" className="px-2 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Products
              </a>
              <a href="/about" className="px-2 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                About
              </a>
            </nav>
          </div>
        )} */}
      </div>
    </header>
  );
}

export default Navbar;