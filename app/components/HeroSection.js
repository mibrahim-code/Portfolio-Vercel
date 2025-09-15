// app/components/HeroSection.js
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  ANIMATIONS,
  GRADIENTS,
} from "../constants";

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const TextElement = ({ children, delay = 0, className = "" }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
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
        animate={isMounted ? { width: "100%" } : {}}
        transition={{ duration: 1.4, delay, ease: [0.215, 0.61, 0.355, 1] }}
        className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 sm:my-12 w-32 sm:w-48 mx-auto"
      />
    );
  };

  const GridPattern = () => {
    const circleData = [
      { width: 67, height: 56, top: 37.53, left: 94.93 },
      { width: 71, height: 71, top: 52.72, left: 49.28 },
      { width: 90, height: 35, top: 13.14, left: 7.4 },
      { width: 26, height: 73, top: 72.6, left: 20.06 },
      { width: 58, height: 68, top: 56.08, left: 63.05 },
      { width: 34, height: 74, top: 44.1, left: 23.54 },
      { width: 85, height: 64, top: 32.52, left: 7.32 },
      { width: 83, height: 41, top: 92.59, left: 52.02 },
      { width: 47, height: 48, top: 92.53, left: 22.69 },
      { width: 54, height: 33, top: 6.35, left: 78.82 },
      { width: 37, height: 41, top: 87.41, left: 8.29 },
      { width: 33, height: 61, top: 96.94, left: 75.73 },
    ];

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-20" />

        {circleData.map((data, i) => (
          <motion.div
            key={i}
            className={`absolute ${BORDERS.radius.full} border border-${COLORS.gray[200]}`}
            style={{
              width: data.width,
              height: data.height,
              top: `${data.top}%`,
              left: `${data.left}%`,
            }}
            animate={
              isMounted
                ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }
                : {}
            }
            transition={{
              duration: 8 + i * 0.5,
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
      <div className="hidden md:flex absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 flex-col space-y-3 md:space-y-5">
        {["home", "services", "projects", "contact"].map((item, i) => (
          <motion.div
            key={item}
            className="flex items-center group"
            initial={{ x: 20, opacity: 0 }}
            animate={isMounted ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            whileHover={{ x: -8 }}
          >
            <motion.div
              className={`w-1.5 h-1.5 ${BORDERS.radius.full} bg-${COLORS.gray[400]} mr-2 md:mr-3`}
              animate={
                isMounted
                  ? {
                      scale: [1, 1.4, 1],
                      backgroundColor: [
                        COLORS.gray[400],
                        COLORS.gray[600],
                        COLORS.gray[400],
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
            <span
              className={`text-xs text-${COLORS.gray[500]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide hidden md:block`}
            >
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
          className={`absolute left-4 md:left-12 top-1/3 w-20 h-20 md:w-40 md:h-40 bg-${COLORS.white} border border-${COLORS.gray[100]} ${SHADOWS.sm} ${BORDERS.radius.md} transform rotate-3`}
          initial={{ y: 40, opacity: 0, rotate: 0 }}
          animate={isMounted ? { y: 0, opacity: 0.15, rotate: 3 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
          whileHover={{ opacity: 0.25, transition: { duration: 0.3 } }}
        />
        <motion.div
          className={`absolute right-4 md:right-16 bottom-1/4 w-24 h-16 md:w-48 md:h-32 bg-${COLORS.white} border border-${COLORS.gray[100]} ${SHADOWS.sm} ${BORDERS.radius.md} transform -rotate-2`}
          initial={{ y: 40, opacity: 0, rotate: 0 }}
          animate={isMounted ? { y: 0, opacity: 0.15, rotate: -2 } : {}}
          transition={{ duration: 1.2, delay: 0.7 }}
          whileHover={{ opacity: 0.25, transition: { duration: 0.3 } }}
        />
        <motion.div
          className={`absolute left-1/4 bottom-1/3 w-12 h-12 md:w-24 md:h-24 bg-${COLORS.white} border border-${COLORS.gray[100]} ${SHADOWS.sm} ${BORDERS.radius.md} transform rotate-2`}
          initial={{ y: 40, opacity: 0, rotate: 0 }}
          animate={isMounted ? { y: 0, opacity: 0.1, rotate: 2 } : {}}
          transition={{ duration: 1.2, delay: 0.9 }}
          whileHover={{ opacity: 0.2, transition: { duration: 0.3 } }}
        />
      </>
    );
  };

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center bg-${COLORS.white} overflow-hidden ${SPACING.section.py}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-50 to-gray-50 rounded-full blur-2xl sm:blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-tr from-gray-50 to-blue-50 rounded-full blur-2xl sm:blur-3xl opacity-20" />
      </div>

      <GridPattern />
      <FloatingShapes />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center">
          <TextElement delay={0.1}>
            <motion.div
              className={`inline-flex items-center ${BORDERS.radius.full} bg-gradient-to-r from-gray-100 to-blue-50 px-4 py-2 text-xs text-${COLORS.gray[600]} mb-8 sm:mb-12 tracking-wide border border-gray-200`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative flex h-1.5 w-1.5 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              CURRENTLY ACCEPTING NEW PROJECTS
            </motion.div>
          </TextElement>

          <TextElement delay={0.2}>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-light text-${COLORS.gray[900]} mb-4 md:mb-6 tracking-tight`}
            >
              Elegant Digital Solutions
            </h1>
          </TextElement>

          <TextElement delay={0.3}>
            <motion.h2
              className={`text-2xl md:text-3xl lg:text-4xl text-${COLORS.gray[900]} mb-6 md:mb-8 font-light tracking-normal`}
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              Crafted with Precision
            </motion.h2>
          </TextElement>

          <LineReveal delay={0.4} />

          <TextElement delay={0.5}>
            <p
              className={`text-lg text-${COLORS.gray[600]} max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-light`}
            >
              I design and develop sophisticated web applications and
              cross-platform experiences that help businesses thrive.
              Specializing in education, healthcare, and e-commerce solutions.
            </p>
          </TextElement>

          <TextElement delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 md:mt-14">
              {/* Explore Work button - White text */}
              <motion.a
                href="/#projects"
                whileHover={{
                  y: -2,
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
                }}
                whileTap={{ scale: 0.985 }}
                className={`px-6 py-3.5 bg-gradient-to-r from-gray-900 to-blue-900 text-white ${BORDERS.radius.xl} font-medium text-sm tracking-wider ${SHADOWS.md} hover:${SHADOWS.lg} ${ANIMATIONS.transitions.default} w-full sm:w-auto text-center`}
              >
                Explore Work
              </motion.a>

              {/* Start a Project button - Black text */}
              <motion.a
                href="/#contact"
                whileHover={{ y: -2, backgroundColor: COLORS.gray[100] }}
                whileTap={{ scale: 0.985 }}
                className={`px-6 py-3.5 bg-${COLORS.white} border border-${COLORS.gray[200]} ${BORDERS.radius.xl} font-medium text-sm text-black tracking-wider hover:border-${COLORS.gray[300]} ${SHADOWS.sm} hover:${SHADOWS.md} ${ANIMATIONS.transitions.default} w-full sm:w-auto text-center`}
              >
                Start a Project
              </motion.a>
            </div>
          </TextElement>
        </div>
      </div>

      <AnimatedDots />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isMounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className={`absolute left-4 md:left-8 bottom-4 md:bottom-8 text-xs text-${COLORS.gray[400]} tracking-widest`}
      >
        <div className="flex items-center">
          <div className={`h-px w-6 md:w-8 bg-${COLORS.gray[300]} mr-2`}></div>
          MIBRAHIM.CODE
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;