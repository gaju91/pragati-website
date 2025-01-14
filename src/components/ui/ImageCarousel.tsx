import React, { useEffect, useState } from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2400&h=1000',
    alt: 'Digital Marketing Dashboard'
  },
  {
    url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=2400&h=1000',
    alt: 'Web Development'
  },
  {
    url: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=2400&h=1000',
    alt: 'Mobile App Development'
  },
  {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2400&h=1000',
    alt: 'Digital Innovation'
  }
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(images.length).fill(false));

  useEffect(() => {
    // Preload all images
    images.forEach((image, index) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        setIsLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });

    const interval = setInterval(() => {
      setCurrentIndex(current => (current + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Only show carousel when at least the first image is loaded
  if (!isLoaded[0]) {
    return (
      <div className="w-full h-[400px] bg-black/20 animate-pulse rounded-xl">
        <noscript>
          <img
            src={images[0].url}
            alt={images[0].alt}
            className="w-full h-full object-cover rounded-xl"
          />
        </noscript>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                     ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        </div>
      ))}
      
      {/* Fallback for no JavaScript */}
      <noscript>
        <img
          src={images[0].url}
          alt={images[0].alt}
          className="w-full h-full object-cover"
        />
      </noscript>
    </div>
  );
}