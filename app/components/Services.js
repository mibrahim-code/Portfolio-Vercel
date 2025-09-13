'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

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
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: ["React/Next.js", "Responsive Design", "Performance Optimization", "SEO Friendly"]
    },
    {
      title: "Cross Platform Mobile Apps",
      description: "Native-feeling applications that work seamlessly across iOS and Android. I use React Native to build performant mobile apps with beautiful UI and smooth animations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: ["React Native", "iOS & Android", "Native Performance", "Offline Support"]
    },
    {
      title: "WordPress Solutions",
      description: "Custom WordPress themes, plugins, and full-site builds. I combine WordPress's flexibility with modern development practices for scalable and maintainable solutions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      features: ["Custom Themes", "Plugin Development", "WooCommerce", "API Integration"]
    }
  ];

  return (
    <section id="services" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-20" />
        
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50 to-gray-50 rounded-full blur-3xl opacity-20"
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-gray-50 to-blue-50 rounded-full blur-3xl opacity-20"
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

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-gradient-to-r from-gray-100 to-blue-50 px-6 py-3 text-sm text-gray-600 mb-12 tracking-wide border border-gray-200"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
            SERVICES & EXPERTISE
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight"
          >
            Digital Excellence
          </motion.h2>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-12"
          />

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Crafting digital experiences that blend innovative technology with stunning design
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setActiveService(index)}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer group ${
                activeService === index 
                  ? 'border-gray-300 bg-white shadow-2xl' 
                  : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
              }`}
            >
              <motion.div 
                className={`mb-8 p-4 rounded-2xl inline-block transition-all duration-500 ${
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

              <h3 className={`text-2xl font-semibold mb-6 transition-colors duration-500 ${
                activeService === index ? 'text-gray-900' : 'text-gray-800'
              }`}>
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
                {service.description}
              </p>

              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <motion.div 
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + featureIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-gray-700"
                  >
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      activeService === index ? 'bg-blue-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className={`absolute inset-0 rounded-3xl border-2 pointer-events-none ${
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
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={scrollToContact}
            whileHover={{ 
              y: -4, 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-4 bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-2xl font-medium text-lg tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;