import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Star, Timer, ArrowRight } from 'lucide-react';

export default function ComingSoon() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05),transparent_50%)] animate-pulse-slower"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            <Star className="w-4 h-4 text-white/10" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Rocket Animation */}
          <div className="inline-block mb-8 animate-bounce-slow">
            <div className="relative">
              <Rocket className="w-16 h-16 text-white" />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-t from-white/0 to-white/20 blur-lg animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in">
            Coming Soon
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-delay-1">
            We're crafting something amazing! Our portfolio showcase is under construction and will be launching soon.
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
            {Object.entries(countdown).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 animate-fade-in-delay-2"
              >
                <div className="text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-gray-400 capitalize">{unit}</div>
              </div>
            ))}
          </div>

          {/* Notification Form */}
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 animate-fade-in-delay-2">
            <div className="flex items-center justify-center mb-4">
              <Timer className="w-6 h-6 text-white/60 mr-2" />
              <h3 className="text-lg font-medium text-white">Get Notified</h3>
            </div>
            <form className="flex gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button type="submit" className="nav-button">
                Notify Me
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>

          {/* Back to Home */}
          <div className="mt-12 animate-fade-in-delay-2">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}