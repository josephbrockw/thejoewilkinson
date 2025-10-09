"use client";

import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export function HeroSection() {
  useEffect(() => {
    const createParticles = () => {
      const particleContainer = document.querySelector('.particle-container');
      if (!particleContainer) return;

      // Clear existing particles
      particleContainer.innerHTML = '';

      // Create 20 particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random initial position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (2-4px)
        const size = Math.random() * 3 + 3;
        
        // Random color (blue or green)
        const colors = ['#3B82F6', '#10B981'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration (6-12 seconds)
        const duration = Math.random() * 6 + 6;
        
        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          left: ${x}%;
          top: ${y}%;
          opacity: ${Math.random() * 0.6 + 0.4};
          animation: floatRandom${i} ${duration}s ease-in-out infinite;
          box-shadow: 0 0 6px ${color}40;
        `;
        
        // Create unique keyframes for each particle
        const keyframes = `
          @keyframes floatRandom${i} {
            0%, 100% {
              transform: translate(0, 0);
              opacity: ${Math.random() * 0.4 + 0.4};
            }
            25% {
              transform: translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 60}px);
              opacity: ${Math.random() * 0.6 + 0.6};
            }
            50% {
              transform: translate(${(Math.random() - 0.5) * 80}px, ${(Math.random() - 0.5) * 80}px);
              opacity: ${Math.random() * 0.5 + 0.5};
            }
            75% {
              transform: translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 60}px);
              opacity: ${Math.random() * 0.7 + 0.5};
            }
          }
        `;
        
        // Add keyframes to document
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        particleContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background text-center px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10"></div>
        <div className="particle-container absolute inset-0"></div>
        <div className="shimmer-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-4 leading-tight">
            Joe Wilkinson 
          </h1>
          <h2 className="font-heading text-xl md:text-2xl lg:text-3xl text-secondary mb-6 font-medium">
            Entrepreneurial Engineer | Startup Builder | Full-Stack Expert
          </h2>
        </div>
        
        <p className="text-lg md:text-xl text-secondary/90 max-w-3xl mx-auto mb-12 leading-relaxed">
          Transforming innovative concepts into scalable digital solutions. 
          From MVP to enterprise-scale applications, I bridge the gap between vision and execution.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            color="primary"
            size="lg"
            radius="md"
            className="font-semibold shadow-lg hover:shadow-xl transition-all hero-glow px-10 py-4 text-lg cursor-pointer"
          >
            View Projects
          </Button>
          <Button
            variant="bordered"
            color="primary"
            size="lg"
            radius="md"
            className="font-semibold border-primary/50 hover:border-primary hover:bg-primary/10 transition-all px-10 py-4 text-lg cursor-pointer"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
