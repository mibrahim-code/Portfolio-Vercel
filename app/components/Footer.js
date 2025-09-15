// app/components/Footer.js
'use client';

import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      href: 'https://github.com/mibrahim-code',
      icon: <GitHubIcon fontSize="small" />,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/muhammad-ibrahim10/',
      icon: <LinkedInIcon fontSize="small" />,
      label: 'LinkedIn',
    },
    {
      href: 'https://wa.me/923058739445',
      icon: <WhatsAppIcon fontSize="small" />,
      label: 'WhatsApp',
    },
  ];

  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side - Copyright */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-gray-600"
        >
          © {currentYear} Muhammad Ibrahim
        </motion.p>

        {/* Right Side - Socials */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex space-x-5 mt-4 md:mt-0"
        >
          {socials.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;