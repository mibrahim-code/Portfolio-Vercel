// app/components/ProjectShowcase.js
"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDERS,
  SHADOWS,
  ANIMATIONS,
  GRADIENTS,
} from "../constants";

const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Rawdhat's ChildCare Portal Website",
        category: "Web Development",
        description:
          "A safe and educational environment for your children, guided by local professionals. Child care management software that makes families & teachers happier. Rawdhat manages Billing, Attendance, Registration, Communication, Paperwork, Payroll, and more for child care programs.",
        tech: ["React", "Next.js", "Tailwind", "Node.js"],
        image: "/images/rawdhat.jpg",
        liveUrl: "https://rawdhat.com/en/home",
        githubUrl: "https://github.com/mzainDev/Day-Care-Center.git",
      },
      {
        id: 2,
        title: "Arooj Cybersecurity & AI Solutions",
        category: "Web Development",
        description:
          "A professional website built for a Saudi-based software house specializing in cybersecurity and AI solutions. Designed with a modern UI, service sections, testimonials, and blog integration to showcase their expertise.",
        tech: ["Next.js", "Tailwind CSS", "Node.js"],
        image: "/images/aroojsolution.jpg",
        liveUrl: "https://hadnat.site/",
        githubUrl: "https://github.com/mibrahim-code/Arooj-Solutions",
      },
      {
        id: 3,
        title: "esmnooservices",
        category: "WordPress Website",
        description:
          "A professional one-page WordPress website designed for a video editor to showcase their portfolio and services. The site features a modern design with sections for highlighting video editing skills, client testimonials, and a contact form to generate new business opportunities.",
        tech: ["WordPress", "Elementor", "CSS", "PHP"],
        image: "/images/esmnooservices.jpg",
        liveUrl: "#",
        githubUrl: "#",
      },
    ],
    []
  );

  const ProjectCard = useCallback(({ project, index }) => {
    return (
      <div
        className={`relative p-4 sm:p-6 rounded-3xl border-2 transition-all duration-500 cursor-pointer group flex flex-col h-full border-gray-100 bg-gray-50/50 hover:border-gray-300 hover:bg-white hover:shadow-lg md:hover:shadow-2xl`}
      >
        {/* Project Image with Overlay */}
        <div className="relative h-48 sm:h-60 w-full mb-4 sm:mb-6 rounded-2xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority={index === 0}
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-1 sm:p-2 flex flex-col flex-grow">
          <h3
            className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 transition-colors duration-500 group-hover:text-gray-900 text-gray-800`}
          >
            {project.title}
          </h3>

          <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg font-light flex-grow">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 text-xs sm:text-sm rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 sm:gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-gray-900 to-blue-900 text-white text-sm sm:text-base font-medium rounded-xl text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                View Project
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-200 text-gray-700 text-sm sm:text-base font-medium rounded-xl hover:border-gray-300 transition-colors duration-300 shadow-sm hover:shadow-md flex items-center justify-center hover:-translate-y-0.5"
              >
                <span className="sr-only">GitHub</span>
                <GitHubIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-3xl border-2 pointer-events-none transition-all duration-300 border-blue-200/50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100`}
        />
      </div>
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-white overflow-hidden"
    >
      {/* Background grid + blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-50 to-gray-50 rounded-full blur-2xl sm:blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-tr from-gray-50 to-blue-50 rounded-full blur-2xl sm:blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className={`inline-flex items-center ${BORDERS.radius.full} bg-gradient-to-r from-gray-100 to-blue-50 px-4 py-2 text-xs mb-8 md:mb-12 tracking-wide border border-gray-200`}
            style={{ color: COLORS.gray[600] }}
          >
            <span className="relative flex h-1.5 w-1.5 mr-2 sm:mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            FEATURED WORK
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 sm:mb-8 tracking-tight"
          >
            Crafting Digital Excellence
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "128px" } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-8 sm:my-12 sm:w-48"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-4"
          >
            Each project represents a unique challenge solved with precision and
            creativity
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
