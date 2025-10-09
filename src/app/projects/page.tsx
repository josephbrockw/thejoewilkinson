"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function ProjectsPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-8">
            <Button variant="bordered" color="primary" className="mb-8">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-6">
            My Projects
          </h1>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            A portfolio of lean, scalable applications built for real-world startup challenges — from MVPs and SaaS platforms to experimental side projects. Each one started as an idea and ended as something users could touch, test, and love.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
    </div>
  );
}
