"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Projects Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto" id="projects">
        <Link href="/projects" className="block text-center mb-12 group">
          <h2 className="font-heading text-4xl font-bold text-primary group-hover:text-primary/80 transition-colors cursor-pointer">
            Featured Projects
          </h2>
        </Link>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter(project => project.featured)
            .map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                objectFit={project.objectFit}
              />
            ))}
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
                React, Next.js, TypeScript, Tailwind CSS, NextUI, ReactNative, MaterialUI
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-primary mb-4">Backend</h3>
              <p className="text-secondary">
                Python, Django, Django Rest Framework, Flask, PostgreSQL
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-primary mb-4">Tools</h3>
              <p className="text-secondary">
                Git, Docker, AWS, Vercel, Stripe, OpenAI API, Celery, Bash Scripting
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
