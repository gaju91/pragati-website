import React, { useState } from 'react';
import Header from '../components/portfolio/Header';
import ProjectList from '../components/portfolio/ProjectList';
import Modal from '../components/portfolio/Modal';
import { projects, Project } from '../components/portfolio/projectData';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <Header />
      <ProjectList
        projects={projects}
        setSelectedProject={setSelectedProject}
        setCurrentImageIndex={setCurrentImageIndex}
      />
      {selectedProject && (
        <Modal
          project={selectedProject}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          closeModal={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}