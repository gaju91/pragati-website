import { ExternalLink, Github, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sampleProjects } from '../lib/sampleData';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  testimonial_text?: string;
  testimonial_author?: string;
  testimonial_role?: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(sampleProjects as any);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6 tracking-tight animate-fade-in">
              Our Work
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-delay-1">
              Explore our portfolio of successful projects that have helped businesses transform their digital presence.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="space-y-24 mb-32">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-[400px] object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                  <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.description }} />

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-button"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-button"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    )}
                  </div>

                  {project.testimonial_text && (
                    <blockquote className="mt-8 border-l-2 border-white/20 pl-6">
                      <p className="text-lg text-gray-300 italic">{project.testimonial_text}</p>
                      {project.testimonial_author && (
                        <footer className="mt-2">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <Star className="w-4 h-4 text-yellow-500" />
                            <Star className="w-4 h-4 text-yellow-500" />
                            <Star className="w-4 h-4 text-yellow-500" />
                            <Star className="w-4 h-4 text-yellow-500" />
                          </div>
                          <cite className="text-white font-medium block mt-2">
                            {project.testimonial_author}
                            {project.testimonial_role && (
                              <span className="text-gray-400 font-normal"> - {project.testimonial_role}</span>
                            )}
                          </cite>
                        </footer>
                      )}
                    </blockquote>
                  )}
                </div>
              </div>
            ))}

            Coming soon...
          </div>
        </div>
      </div>
    </>
  );
}