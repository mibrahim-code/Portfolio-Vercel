// app/components/Services.js
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import WebIcon from '@mui/icons-material/Web';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Image from 'next/image';
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  ANIMATIONS,
  GRADIENTS
} from '../constants';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies. I create fast, accessible, and SEO-optimized web applications that deliver exceptional user experiences across all devices.",
      icon: <WebIcon sx={{ fontSize: 64 }} />,
      features: ["React/Next.js", "Responsive Design", "Performance Optimization", "SEO Friendly"]
    },
    {
      title: "Cross Platform Mobile Apps",
      description: "Native-feeling applications that work seamlessly across iOS and Android. I use React Native to build performant mobile apps with beautiful UI and smooth animations.",
      icon: <PhoneIphoneIcon sx={{ fontSize: 64 }} />,
      features: ["React Native", "iOS & Android", "Native Performance", "Offline Support"]
    },
    {
      title: "WordPress Solutions",
      description: "Custom WordPress themes, plugins, and full-site builds. I combine WordPress's flexibility with modern development practices for scalable and maintainable solutions.",
      icon: (
        <div className="w-16 h-16 relative">
          <Image
            src="/images/pngwing.com.png"
            alt="WordPress Logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
      ),
      features: ["Custom Themes", "Plugin Development", "WooCommerce", "API Integration"]
    }
  ];

  return (
    <section id="services" className={`relative ${SPACING.section.py} bg-white overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)] bg-[size:4rem_4rem] md:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-20" />
        
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-50 to-gray-50 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-gray-50 to-blue-50 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -15, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className={`text-center ${SPACING.section.mb}`}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`inline-flex items-center ${BORDERS.radius.full} bg-gradient-to-r from-gray-100 to-blue-50 px-4 py-2 text-xs text-${COLORS.gray[600]} mb-8 md:mb-12 tracking-wide border border-gray-200`}
          >
            <span className="relative flex h-1.5 w-1.5 mr-2 md:mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            SERVICES & EXPERTISE
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight"
          >
            Digital Excellence
          </motion.h2>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-8 md:my-12 max-w-xs md:max-w-sm"
          />

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed font-light"
          >
            Crafting digital experiences that blend innovative technology with stunning design
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setActiveService(index)}
              onTouchStart={() => setActiveService(index)}
              className={`relative ${SPACING.element.p} ${BORDERS.radius.lg} ${BORDERS.width.medium} ${ANIMATIONS.transitions.default} cursor-pointer group ${
                activeService === index 
                  ? 'border-gray-300 bg-white shadow-lg md:shadow-2xl' 
                  : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
              }`}
            >
              <motion.div 
                className={`mb-6 md:mb-8 p-3 md:p-4 ${BORDERS.radius.lg} inline-block ${ANIMATIONS.transitions.default} ${
                  activeService === index 
                    ? 'bg-gradient-to-br from-blue-50 to-gray-50 shadow-inner' 
                    : 'bg-white shadow-xs group-hover:shadow-sm'
                }`}
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className={activeService === index ? 'text-blue-600' : 'text-gray-600'}>
                  {service.icon}
                </div>
              </motion.div>

              <h3 className={`text-xl md:text-2xl font-semibold mb-4 md:mb-6 ${ANIMATIONS.transitions.default} ${
                activeService === index ? 'text-gray-900' : 'text-gray-800'
              }`}>
                {service.title}
              </h3>

              <p className={`text-gray-600 mb-6 md:mb-8 text-lg leading-relaxed font-light`}>
                {service.description}
              </p>

              <div className="space-y-2 md:space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <motion.div 
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + featureIndex * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex items-center text-gray-700"
                  >
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-2 md:mr-3 ${
                      activeService === index ? 'bg-blue-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-xs md:text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className={`absolute inset-0 ${BORDERS.radius.lg} ${BORDERS.width.medium} pointer-events-none ${
                  activeService === index ? 'border-blue-200/50' : 'border-transparent'
                }`}
                initial={false}
                animate={{ 
                  opacity: activeService === index ? 1 : 0,
                  scale: activeService === index ? 1 : 0.95
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ 
              y: -4, 
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 cursor-pointer py-3 md:px-12 md:py-4 ${GRADIENTS.blue} text-white ${BORDERS.radius.lg} font-medium text-base md:text-lg tracking-wide ${SHADOWS.lg} hover:shadow-xl ${ANIMATIONS.transitions.default}`}
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;