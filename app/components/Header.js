// app/components/Header.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
  ANIMATIONS,
  GRADIENTS
} from '../constants';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Only close menu if not in the middle of a smooth scroll
      if (!isScrollingRef.current) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Smooth scroll function with offset for header height
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    
    // Set flag to indicate we're in a smooth scroll
    isScrollingRef.current = true;
    
    if (href === '#home') {
      // Scroll to very top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        // Get the exact position of the target element
        const targetRect = target.getBoundingClientRect();
        const targetPosition = window.pageYOffset + targetRect.top;
        
        // Get header height
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        
        // Scroll to the target position minus header height
        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: 'smooth'
        });
      }
    }
    
    // Close mobile menu after a short delay to allow scroll to complete
    setTimeout(() => {
      setMobileMenuOpen(false);
      isScrollingRef.current = false;
    }, 500);
  };

  // Direct scroll to top for logo
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 ${ANIMATIONS.transitions.default} ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-white/20 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <a
              href="#home"
              onClick={scrollToTop}
              className={`text-2xl font-bold ${GRADIENTS.blue} bg-clip-text text-transparent`}
              aria-label="Home"
            >
              mibrahim.code
            </a>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`relative text-gray-700 hover:text-blue-600 font-medium ${ANIMATIONS.transitions.default} group`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-4 text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <motion.div
          ref={mobileMenuRef}
          initial={false}
          animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white/90 backdrop-blur-md rounded-lg mt-2"
          style={{ display: mobileMenuOpen ? 'block' : 'none' }}
        >
          <nav className="pb-4 space-y-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-4"
                >
                  {item.name}
                </a>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;