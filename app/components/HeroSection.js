"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    let animationFrame;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(59,130,246,0.6)";

      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(147,197,253,${1 - dist / 100})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

const HeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden pt-16 md:pt-20 scroll-mt-20"
    >
      {/* Background */}
      <ParticleBackground />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem] opacity-20 pointer-events-none" />

      {/* Badge in center */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center rounded-full bg-gradient-to-r from-gray-100 to-blue-50 px-4 py-2 text-xs md:text-sm text-gray-600 mb-10 border border-gray-200 shadow-sm z-10"
      >
        <span className="relative flex h-1.5 w-1.5 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
        </span>
        Accepting New Projects
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative w-52 h-52 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-[0_20px_60px_rgba(59,130,246,0.5)] ring-4 ring-gray-200 hover:scale-105 transition-transform duration-500"
        >
          <Image
            src="/images/profilepic.jpg"
            alt="Muhammad Ibrahim"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Text + CTA */}
        <div className="text-center lg:text-left space-y-6 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 tracking-tight"
          >
            Muhammad Ibrahim
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-600 leading-relaxed font-light"
          >
            Full-Stack Web Developer passionate about building clean, scalable,
            and user-friendly applications. I love crafting modern digital
            experiences with precision and creativity.
          </motion.p>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3"
          >
            {[
              "Next.js",
              "React",
              "Node.js",
              "Express",
              "Sequelize",
              "MySQL",
              "Tailwind CSS",
              "JavaScript",
              "UI/UX",
            ].map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-4 justify-center lg:justify-start"
          >
            <a
              href="#projects"
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 sm:px-8 py-3 border border-gray-200 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
