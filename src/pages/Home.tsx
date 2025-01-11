import React from 'react';
import { ArrowRight, Code2, Globe, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05),transparent_50%)] animate-pulse-slower"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-3 py-1 mb-6 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-white/80 text-sm">Now accepting new projects</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
              <span className="inline-block animate-fade-in">Accelerate</span><br />
              <span className="inline-block animate-fade-in-delay-1">Your Digital</span><br />
              <span className="inline-block bg-gradient-to-r from-white via-white/90 to-white/80 text-transparent bg-clip-text animate-fade-in-delay-2">Growth</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl animate-fade-in-delay-2 font-light leading-relaxed">
              We craft exceptional digital experiences that drive innovation and deliver measurable results for forward-thinking businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-delay-2">
              <Link to="/portfolio" className="hero-button group">
                View Our Work
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="hero-button group">
                Let's Talk
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/5 pt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">100+</div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="w-[2px] h-8 bg-gradient-to-b from-white/5 to-white/20"></div>
        </div>
      </section>
      
      {/* Rest of the sections remain the same */}
    </div>
  );
}