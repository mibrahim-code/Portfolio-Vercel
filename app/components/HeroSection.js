// app/components/HeroSection.js
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const TextElement = ({ children, delay = 0, className = "" }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  const LineReveal = ({ delay = 0 }) => {
    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.4, delay, ease: [0.215, 0.61, 0.355, 1] }}
        className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-10"
      />
    );
  };

  const GridPattern = () => {
    const circleData = [
      { width: 67, height: 56, top: 37.53, left: 94.93 },
      { width: 71, height: 71, top: 52.72, left: 49.28 },
      { width: 90, height: 35, top: 13.14, left: 7.40 },
      { width: 26, height: 73, top: 72.60, left: 20.06 },
      { width: 58, height: 68, top: 56.08, left: 63.05 },
      { width: 34, height: 74, top: 44.10, left: 23.54 },
      { width: 85, height: 64, top: 32.52, left: 7.32 },
      { width: 83, height: 41, top: 92.59, left: 52.02 },
      { width: 47, height: 48, top: 92.53, left: 22.69 },
      { width: 54, height: 33, top: 6.35, left: 78.82 },
      { width: 37, height: 41, top: 87.41, left: 8.29 },
      { width: 33, height: 61, top: 96.94, left: 75.73 }
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-10" />
        
        {circleData.map((data, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-gray-200"
            style={{
              width: data.width,
              height: data.height,
              top: `${data.top}%`,
              left: `${data.left}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    );
  };

  const AnimatedDots = () => {
    return (
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-5">
        {['home', 'services', 'projects', 'contact'].map((item, i) => (
          <motion.div
            key={item}
            className="flex items-center group"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            whileHover={{ x: -8 }}
          >
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3"
              animate={{
                scale: [1, 1.4, 1],
                backgroundColor: ["#9ca3af", "#4b5563", "#9ca3af"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
            <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    );
  };

  const FloatingShapes = () => {
    return (
      <>
        <motion.div
          className="absolute left-12 top-1/3 w-40 h-40 bg-white border border-gray-100 shadow-xs rounded-xl transform rotate-3"
          initial={{ y: 40, opacity: 0, rotate: 0 }}
          animate={{ y: 0, opacity: 0.15, rotate: 3 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          whileHover={{ opacity: 0.25, transition: { duration: 0.3 } }}
        />
        <motion.div
          className="absolute right-16 bottom-1/4 w-48 h-32 bg-white border border-gray-100 shadow-xs rounded-xl transform -rotate-2"
          initial={{ y: 40, opacity: 0, rotate: 0 }}
          animate={{ y: 0, opacity: 0.15, rotate: -2 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          whileHover={{ opacity: 0.25, transition: { duration: 0.3 } }}
        />
        <motion.div
          className="absolute left-1/4 bottom-1/3 w-24 h-24 bg-white border border-gray-100 shadow-xs rounded-lg transform rotate-2"
          initial={{ y: 40, opacity: 0, rotate: 0 }}
          animate={{ y: 0, opacity: 0.1, rotate: 2 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          whileHover={{ opacity: 0.2, transition: { duration: 0.3 } }}
        />
      </>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <GridPattern />
      <FloatingShapes />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 py-20">
        <div className="text-center">
          <TextElement delay={0.1}>
            <motion.div 
              className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-600 mb-14 tracking-wider"
              whileHover={{ y: -2, backgroundColor: "rgba(243, 244, 246, 1)" }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative flex h-1.5 w-1.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-500"></span>
              </span>
              CURRENTLY ACCEPTING NEW PROJECTS
            </motion.div>
          </TextElement>

          <TextElement delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 tracking-tight">
              Elegant Digital Solutions
            </h1>
          </TextElement>

          <TextElement delay={0.3}>
            <motion.h2 
              className="text-5xl md:text-6xl font-normal text-gray-900 mb-8"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              Crafted with Precision
            </motion.h2>
          </TextElement>

          <LineReveal delay={0.4} />

          <TextElement delay={0.5}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light tracking-wide">
              I design and develop sophisticated web applications and cross-platform experiences that help businesses thrive. Specializing in education, healthcare, and e-commerce solutions.
            </p>
          </TextElement>

          <TextElement delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-14">
              <motion.button
                whileHover={{ y: -2, boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.985 }}
                className="px-8 py-3.5 bg-gray-900 text-white rounded-lg font-medium text-sm tracking-wider shadow-xs hover:shadow-sm transition-all duration-300"
              >
                Explore Work
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                whileTap={{ scale: 0.985 }}
                className="px-8 py-3.5 bg-white border border-gray-200 rounded-lg font-medium text-sm text-gray-700 tracking-wider hover:border-gray-300 transition-all duration-300"
              >
                Start a Project
              </motion.button>
            </div>
          </TextElement>
        </div>
      </div>

      <AnimatedDots />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute left-8 bottom-8 text-xs text-gray-400 tracking-widest"
      >
        <div className="flex items-center">
          <div className="h-px w-8 bg-gray-300 mr-2"></div>
          MIBRAHIM.CODE
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;