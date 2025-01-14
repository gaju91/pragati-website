import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from './projectData';

interface Props {
  projects: Project[];
  setSelectedProject: (project: Project) => void;
  setCurrentImageIndex: (index: number) => void;
}

export default function ProjectList({ projects, setSelectedProject, setCurrentImageIndex }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-16">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          isReversed={index % 2 === 1}
          onSelect={() => {
            setSelectedProject(project);
            setCurrentImageIndex(0);
          }}
        />
      ))}
    </div>
  );
}
