// app/components/ProjectShowcase.js
'use client';

import Image from 'next/image';
import { useState } from 'react';

const ProjectShowcase = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Rawdhat's ChildCare Portal Website",
      category: "Education",
      description:
        "A safe and educational environment for your children, guided by local professionals. Child care management software that makes families & teachers happier. Rawdhat manages Billing, Attendance, Registration, Communication, Paperwork, Payroll, and more for child care programs.",
      tech: ["React", "Next.js", "Tailwind", "Node.js"],
      image: "/images/HadnatSite.PNG",
      liveUrl: "https://rawdhat.com/en/home",
      githubUrl: "https://github.com/mzainDev/Day-Care-Center.git",
    },
    {
      id: 2,
      title: "MediCare Hub",
      category: "Healthcare",
      description:
        "A comprehensive healthcare management system with patient portals, appointment scheduling, and telehealth capabilities.",
      tech: ["Vue", "TypeScript", "Firebase", "Tailwind"],
      image: "/placeholder-2.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Aura Fashion",
      category: "E-Commerce",
      description:
        "A luxury fashion e-commerce experience with virtual try-on, AR viewing, and personalized styling recommendations.",
      tech: ["Next.js", "Three.js", "Stripe", "MongoDB"],
      image: "/placeholder-3.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const ProjectCard = ({ project, index }) => {
    return (
      <div
        onMouseEnter={() => setActiveProject(index)}
        className={`relative p-6 rounded-3xl border-2 transition-all duration-500 cursor-pointer group flex flex-col h-full ${
          activeProject === index 
            ? 'border-gray-300 bg-white shadow-2xl' 
            : 'border-gray-100 bg-gray-50/50 hover:border-gray-200'
        }`}
      >
        {/* Project Image with Overlay */}
        <div className="relative h-60 w-full mb-6 rounded-2xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
              {project.category}
            </span>
          </div>
        </div>
        
        <div className="p-2 flex flex-col flex-grow">
          <h3 className={`text-2xl font-semibold mb-4 transition-colors duration-500 ${
            activeProject === index ? 'text-gray-900' : 'text-gray-800'
          }`}>
            {project.title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed text-lg font-light flex-grow">
            {project.description}
          </p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-5 py-3 bg-gradient-to-r from-gray-900 to-blue-900 text-white text-base font-medium rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                View Project
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 border border-gray-200 text-gray-700 text-base font-medium rounded-xl hover:border-gray-300 transition-colors duration-300 shadow-sm hover:shadow-md flex items-center justify-center hover:-translate-y-0.5"
              >
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 rounded-3xl border-2 pointer-events-none transition-all duration-300 ${
          activeProject === index ? 'border-blue-200/50 opacity-100 scale-100' : 'border-transparent opacity-0 scale-95'
        }`} />
      </div>
    );
  };

  return (
    <section id="projects" className="relative py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-20" />
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50 to-gray-50 rounded-full blur-3xl opacity-20" />
        
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-gray-50 to-blue-50 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-gray-100 to-blue-50 px-6 py-3 text-sm text-gray-600 mb-12 tracking-wide border border-gray-200">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
            FEATURED WORK
          </div>

          <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight">
            Crafting Digital Excellence
          </h2>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-12 w-48" />

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Each project represents a unique challenge solved with precision and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;