"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { AppButton } from "@/components/AppButton";
import { projects } from "@/data";

export default function ProjectsPage() {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header — forest green brand */}
      <section className="py-20 px-4 text-center bg-[#064E3B]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <AppButton href="/" variant="ghost-light" size="md">
              ← Back to Home
            </AppButton>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
            My Projects
          </h1>
          <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed">
            A portfolio of lean, scalable applications built for real-world startup challenges -
            from MVPs and SaaS platforms to experimental side projects.
          </p>
        </div>
      </section>

      {/* Amber band */}
      <div className="h-15 bg-amber-500" />

      {/* Featured */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-[#064E3B] mb-8">Featured</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                objectFit={project.objectFit}
                featured
              />
            ))}
          </div>
        </div>
      </section>

      {/* All others */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-[#064E3B] mb-8">More Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, index) => (
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
        </div>
      </section>
    </div>
  );
}
