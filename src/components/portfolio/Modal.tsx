import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from './projectData';

interface Props {
  project: Project;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  closeModal: () => void;
}

export default function Modal({ project, currentImageIndex, setCurrentImageIndex, closeModal }: Props) {
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const activeThumbnail = document.querySelector(`.thumbnail-${currentImageIndex}`) as HTMLElement;
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [currentImageIndex]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center mt-10 mb-10"
      onClick={closeModal}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          closeModal();
        }}
        className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Modal Content */}
      <div className="relative w-full max-w-5xl bg-gray-900 rounded-xl shadow-lg overflow-hidden p-6">
        {/* Shining Header Title */}
        <div className="relative text-center">
          <h1 className="text-4xl font-extrabold text-white uppercase tracking-wide animate-shine">
            {project.title}
          </h1>
          {/* Mirror Effect */}
          <h1
            className="text-4xl font-extrabold text-white uppercase tracking-wide opacity-30 transform scale-y-[-1] mt-2 blur-sm"
            style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 50%, 0 50%)' }}
          >
            {project.title}
          </h1>
        </div>

        {/* Main Image Display */}
        <div className="relative w-full aspect-[16/9] bg-black flex items-center justify-center rounded-lg border-4 border-white mt-8">
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain shadow-lg"
          />
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 rounded-full 
                     text-white/80 hover:text-white hover:bg-black/80 transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 rounded-full 
                     text-white/80 hover:text-white hover:bg-black/80 transition-all duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>

        {/* Image Description */}
        <div className="mt-4 text-center text-gray-300">
          <p>{`Image ${currentImageIndex + 1} of ${project.images.length}`}</p>
        </div>

        {/* Thumbnails */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 justify-center">
          {project.images.map((image, index) => (
            <button
              key={image}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
              className={`thumbnail-${index} relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden 
                         transition-all duration-300 ${
                           index === currentImageIndex
                             ? 'ring-4 ring-white scale-110'
                             : 'opacity-50 hover:opacity-100'
                         }`}
              aria-label={`View image ${index + 1} of ${project.images.length}`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
