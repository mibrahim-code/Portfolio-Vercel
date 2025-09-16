// app/components/ClientReviews.js
"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  ANIMATIONS,
  GRADIENTS,
} from "../constants";

const ClientReviews = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  const reviews = [
    {
      id: 1,
      client: "quotes2000",
      message: "Ibrahim - Did a great eccomerce website for me and he did it quick in 3 days. He did every thing the lay out the plug ins and made me customization to the way I wanted it thanks amazing guy 5 ***** will use him again.",
      ratings: {
        communication: 5,
        recommendation: 5,
        service: 5
      },
      image: "/images/quotesreview.jpg",
    },
    {
      id: 2,
      client: "roadtofiverr321",
      message: "Ibrahim was so responsive and good at his work and started immediately with the project. I recommend Ibrahim for those who want to have high quality website for less budget and fast delivery.",
      ratings: {
        communication: 5,
        recommendation: 5,
        service: 5
      },
      image: "/images/roadtofiverrreview.jpg",
    }
  ];

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const ImageModal = () => {
  if (!selectedImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={() => setSelectedImage(null)}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative max-w-4xl w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-0 right-1 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
          onClick={() => setSelectedImage(null)}
          aria-label="Close modal"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative w-full h-auto max-h-[80vh] rounded-lg overflow-hidden bg-gray-800 flex justify-center">
          {/* Use regular img tag instead of Next Image for better control */}
          <img
            src={selectedImage}
            alt="Full size review"
            className="object-contain max-w-full max-h-[80vh]"
          />
        </div>
        <p className="text-white text-center mt-4 text-sm">Click anywhere to close</p>
      </motion.div>
    </motion.div>
  );
};

  const ReviewCard = ({ review, index }) => {
    return (
      <div className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col h-full ${BORDERS.radius.lg} bg-white border-gray-100 hover:bg-gray-50 hover:shadow-md`}>
        {/* Client Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {review.client.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm sm:text-base">{review.client}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <StarRating rating={5} />
              <span className="text-xs text-gray-500 ml-1">5.0</span>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed flex-grow">
          {review.message}
        </p>

        {/* Rating Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Communication</span>
            <StarRating rating={review.ratings.communication} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Recommendation</span>
            <StarRating rating={review.ratings.recommendation} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Service</span>
            <StarRating rating={review.ratings.service} />
          </div>
        </div>

        {/* Review Screenshot */}
        <div 
          className="relative h-36 w-full rounded-xl overflow-hidden border border-gray-200 cursor-pointer group"
          onClick={() => setSelectedImage(review.image)}
        >
          <Image
            src={review.image}
            alt={`Review from ${review.client}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7" />
            </svg>
          </div>
        </div>

        {/* Fiverr Badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center bg-green-100 px-2 py-1 rounded-full">
            <svg className="w-3 h-3 text-green-600 mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.004 5.424C22.89 3.72 21.627 2.457 19.923 2.343c-2.265-.136-5.48-.394-9.423-.394s-7.158.258-9.423.394C1.373 2.457.11 3.72-.004 5.424c-.136 2.265-.394 5.48-.394 9.423s.258 7.158.394 9.423c.114 1.704 1.377 2.967 3.081 3.081 2.265.136 5.48.394 9.423.394s7.158-.258 9.423-.394c1.704-.114 2.967-1.377 3.081-3.081.136-2.265.394-5.48.394-9.423s-.258-7.158-.394-9.423zm-9.004 11.576l-7-4.75 7-4.75 7 4.75-7 4.75z"/>
            </svg>
            <span className="text-xs font-medium text-green-700">Fiverr</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        id="reviews"
        ref={sectionRef}
        className="relative py-16 sm:py-24 bg-white overflow-hidden"
      >
        {/* Background elements - more subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-48 h-48 bg-blue-50 rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-50 rounded-full opacity-30 blur-2xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className={`inline-flex items-center ${BORDERS.radius.full} bg-gradient-to-r from-gray-100 to-blue-50 px-4 py-2 text-xs mb-6 md:mb-10 tracking-wide border border-gray-200`}
              style={{ color: COLORS.gray[600] }}
            >
              <span className="relative flex h-1.5 w-1.5 mr-2 sm:mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              CLIENT TESTIMONIALS
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4 sm:mb-6 tracking-tight"
            >
              Client Satisfaction
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "96px" } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-6 sm:my-10 w-24"
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light px-4"
            >
              Hear what my clients have to say about working with me
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <ReviewCard review={review} index={index} />
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12 sm:mt-20"
          >
            <p className="text-gray-600 mb-6">
              Ready to start your project?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-900 to-blue-900 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              Get In Touch
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Image Modal */}
      <ImageModal />
    </>
  );
};

export default ClientReviews;