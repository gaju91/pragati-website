import React from 'react';
import { ArrowUpRight, ExternalLink, Github, Quote } from 'lucide-react';
import { Project } from './projectData';

interface Props {
  project: Project;
  isReversed: boolean;
  onSelect: () => void;
}

export default function ProjectCard({ project, isReversed, onSelect }: Props) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-8 items-center p-6 rounded-xl bg-gradient-to-r from-gray-900 to-black shadow-lg ${
        isReversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Image Stack */}
      <div className="w-full md:w-1/2 relative">
        <div
          className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-4 border-white"
          onClick={onSelect}
        >
          {project.images.slice(0, 3).reverse().map((image, idx) => (
            <div
              key={image}
              className="absolute inset-0 transition-all duration-500 transform"
              style={{
                transform: `perspective(1000px) rotateY(${idx * -5}deg) translateZ(${idx * -20}px)`,
                opacity: 1 - idx * 0.2,
                zIndex: 3 - idx,
              }}
            >
              <img
                src={image}
                alt={`${project.title} preview ${idx + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <button className="hero-button transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Gallery
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="w-full md:w-1/2 space-y-6">
        {/* Title and Tags */}
        <div>
          <h3 className="text-4xl font-extrabold text-white">{project.title}</h3>
          {project.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-blue-500 rounded-full text-white shadow-md">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed text-lg">
          {project.description.length > 200
            ? `${project.description.substring(0, 200)}...`
            : project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-sm bg-gray-800 rounded-full text-white shadow-inner">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="hero-button group">
              View Live
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="hero-button-secondary group">
              View Code
              <Github className="w-4 h-4 ml-2" />
            </a>
          )}
        </div>

        {/* Testimonials */}
        {project.testimonials && (
          <div className="mt-8 p-6 bg-gray-900 rounded-xl border border-white flex flex-col sm:flex-row gap-4 items-center shadow-lg">
            <img
              src={project.testimonials.image}
              alt={project.testimonials.author}
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-white">
              <p className="italic text-gray-300 leading-relaxed">
                <Quote className="inline w-5 h-5 text-white mr-2" />
                {project.testimonials.quote}
              </p>
              <p className="mt-2 font-bold">{project.testimonials.author}</p>
              <p className="text-sm text-gray-400">{project.testimonials.role}</p>
              <div className="flex gap-2 mt-2">
                {project.testimonials.links.map((link) => (
                  <a
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Project Journals */}
        {project.project_journals && (
          <div className="mt-6">
            <h4 className="text-lg font-bold text-white mb-2">Project Journals</h4>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              {project.project_journals.map((journal, index) => (
                <li key={index} className="leading-relaxed">{journal}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
