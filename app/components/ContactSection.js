'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const formRef = useRef();
  const recaptchaRef = useRef();

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize reCAPTCHA after script loads
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          // Check if reCAPTCHA hasn't been rendered in this element yet
          if (recaptchaRef.current && !recaptchaRef.current.hasChildNodes()) {
            try {
              // Render reCAPTCHA widget
              const widgetId = window.grecaptcha.render(recaptchaRef.current, {
                sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Replace with your actual site key
                callback: (token) => {
                  setRecaptchaToken(token);
                  if (errors.recaptcha) {
                    setErrors({
                      ...errors,
                      recaptcha: ''
                    });
                  }
                },
                'expired-callback': () => {
                  setRecaptchaToken(null);
                }
              });
            } catch (error) {
              console.log('reCAPTCHA already rendered or other error:', error);
            }
          }
        });
      }
    };

    // Set up timer to clear status messages after 15 seconds
    let timer;
    if (submitStatus) {
      timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 15000); // 15 seconds
    }
    
    // Clean up the timer when component unmounts or status changes
    return () => {
      if (timer) clearTimeout(timer);
      if (script) document.body.removeChild(script);
    };
  }, [submitStatus, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    // reCAPTCHA validation
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please verify you are not a robot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Send email using EmailJS
    emailjs.send(
      'service_hb9ad07', 
      'template_v0yyzmi', 
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        'g-recaptcha-response': recaptchaToken
      },
      'ZS-OUrEZCsqXuCb-p'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      // Reset reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
      setRecaptchaToken(null);
    })
    .catch((error) => {
      console.error('FAILED...', error);
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const TextElement = ({ children, delay = 0, className = "" }) => {
    return (
      <div className={className}>
        {children}
      </div>
    );
  };

  const LineReveal = ({ delay = 0 }) => {
    return (
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-10" />
    );
  };

  const GridPattern = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-10" />
      </div>
    );
  };

  const FloatingShapes = () => {
    return (
      <>
        <div className="absolute left-12 top-1/3 w-40 h-40 bg-white border border-gray-100 shadow-xs rounded-xl transform rotate-3 opacity-15" />
        <div className="absolute right-16 bottom-1/4 w-48 h-32 bg-white border border-gray-100 shadow-xs rounded-xl transform -rotate-2 opacity-15" />
        <div className="absolute left-1/4 bottom-1/3 w-24 h-24 bg-white border border-gray-100 shadow-xs rounded-lg transform rotate-2 opacity-10" />
      </>
    );
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden py-20">
      <GridPattern />
      <FloatingShapes />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 w-full">
        <div className="text-center mb-16">
          <TextElement delay={0.1}>
            <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-600 mb-14 tracking-wider">
              <span className="relative flex h-1.5 w-1.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-500"></span>
              </span>
              GET IN TOUCH
            </div>
          </TextElement>

          <TextElement delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 tracking-tight">
              Let&apos;s Start a Conversation
            </h1>
          </TextElement>

          <TextElement delay={0.3}>
            <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-8">
              Contact Me
            </h2>
          </TextElement>

          <LineReveal delay={0.4} />

          <TextElement delay={0.5}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light tracking-wide">
              Have a project in mind or want to discuss potential collaboration? I&apos;m always open to new opportunities and interesting challenges.
            </p>
          </TextElement>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800">Email</h3>
              </div>
              <a
                href="mailto:mibrahim.code@gmail.com"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 block pl-14"
              >
                mibrahim.code@gmail.com
              </a>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.520.149-.174.198-.298.298-.497.099-.198.050-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.500-.669-.510-.173-.008-.371-.010-.570-.010-.198 0-.520.074-.792.372-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.200 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.360.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.510-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.640 0 5.122 1.030 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.450-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .160 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800">WhatsApp</h3>
              </div>
              <a
                href="https://wa.me/923058739445"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 block pl-14"
              >
                +92 3058739445
              </a>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800">Availability</h3>
              </div>
              <p className="text-gray-600 pl-14">Currently accepting new projects</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800">Response Time</h3>
              </div>
              <p className="text-gray-600 pl-14">I typically reply within 24 hours</p>
            </div>
          </div>

          <div id="contact-form">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-gray-100 shadow-xs">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 ${
                    errors.message ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <div>
                <div ref={recaptchaRef} className="g-recaptcha"></div>
                {errors.recaptcha && <p className="mt-1 text-sm text-red-600">{errors.recaptcha}</p>}
              </div>

              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm flex justify-between items-center">
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                  <button 
                    onClick={() => setSubmitStatus(null)}
                    className="text-green-800 hover:text-green-900 ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm flex justify-between items-center">
                  <span>There was an error sending your message. Please try again or contact me directly via email.</span>
                  <button 
                    onClick={() => setSubmitStatus(null)}
                    className="text-red-800 hover:text-red-900 ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gray-900 text-white rounded-lg font-medium text-sm tracking-wider shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        section {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;