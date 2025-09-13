// app/components/Footer.js
'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center"
          >
            <span className="text-gray-500 text-sm mr-1">Created by</span>
            <span className="text-gray-700 font-medium">Ibrahim</span>
            <span className="text-red-400 mx-1">with</span>
            <span className="text-red-500">♥</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;