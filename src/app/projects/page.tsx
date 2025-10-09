"use client";

import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Data Marketplace API",
      description: "Django + React platform enabling secure data sharing with Stripe integration and real-time analytics. Features user authentication, data validation, and automated billing.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center",
      technologies: ["Django", "React", "Stripe", "PostgreSQL", "Redis"]
    },
    {
      title: "E-commerce Platform",
      description: "Next.js + Stripe integration with inventory management and real-time analytics dashboard. Includes admin panel, order tracking, and customer support chat.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop&crop=center",
      technologies: ["Next.js", "Stripe", "Tailwind", "MongoDB", "Vercel"]
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat with OpenAI integration, built with Socket.io and React for seamless conversations. Features message history, user presence, and AI-powered responses.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center",
      technologies: ["React", "OpenAI", "Socket.io", "Node.js", "Express"]
    },
    {
      title: "Task Management SaaS",
      description: "Full-stack project management tool with team collaboration, time tracking, and reporting features. Built with modern React patterns and scalable backend architecture.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&crop=center",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker"]
    },
    {
      title: "Cryptocurrency Dashboard",
      description: "Real-time crypto portfolio tracker with price alerts, market analysis, and trading insights. Integrates with multiple exchange APIs for comprehensive data.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop&crop=center",
      technologies: ["Vue.js", "Python", "FastAPI", "WebSocket", "Chart.js"]
    },
    {
      title: "Social Media Analytics",
      description: "Analytics platform for social media managers with automated reporting, engagement tracking, and content performance insights across multiple platforms.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
      technologies: ["Angular", "Python", "Django", "Celery", "AWS"]
    }
  ];

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
            A collection of applications and platforms I've built, showcasing expertise in 
            full-stack development, API design, and modern web technologies.
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
            />
          ))}
        </div>
      </section>
    </div>
  );
}
