"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Projects Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <Link href="/projects" className="block text-center mb-12 group">
          <h2 className="font-heading text-4xl font-bold text-primary group-hover:text-primary/80 transition-colors cursor-pointer">
            Featured Projects
          </h2>
        </Link>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            title="Data Marketplace API"
            description="Django + React platform enabling secure data sharing with Stripe integration and real-time analytics."
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center"
            technologies={["Django", "React", "Stripe", "PostgreSQL"]}
          />
          <ProjectCard
            title="E-commerce Platform"
            description="Next.js + Stripe integration with inventory management and real-time analytics dashboard."
            image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center"
            technologies={["Next.js", "Stripe", "Tailwind", "MongoDB"]}
          />
          <ProjectCard
            title="AI Chat Application"
            description="Real-time chat with OpenAI integration, built with Socket.io and React for seamless conversations."
            image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center"
            technologies={["React", "OpenAI", "Socket.io", "Node.js"]}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-content2">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold text-primary mb-12">
            Technologies & Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="font-heading text-xl text-primary mb-4">Frontend</h3>
              <p className="text-secondary">
                React, Next.js, TypeScript, Tailwind CSS, NextUI
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-primary mb-4">Backend</h3>
              <p className="text-secondary">
                Node.js, Python, Django, PostgreSQL, MongoDB
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-primary mb-4">Tools</h3>
              <p className="text-secondary">
                Git, Docker, AWS, Vercel, Stripe, OpenAI API
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
