"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { Card, CardBody } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      {/* Projects Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl font-bold text-primary text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard />
          <Card className="bg-content1 border border-divider hover:border-primary/60 transition-all">
            <CardBody className="p-6">
              <h3 className="font-heading text-xl text-primary mb-3">
                E-commerce Platform
              </h3>
              <p className="text-secondary">
                Next.js + Stripe integration with inventory management and real-time analytics.
              </p>
            </CardBody>
          </Card>
          <Card className="bg-content1 border border-divider hover:border-primary/60 transition-all">
            <CardBody className="p-6">
              <h3 className="font-heading text-xl text-primary mb-3">
                AI Chat Application
              </h3>
              <p className="text-secondary">
                Real-time chat with OpenAI integration, built with Socket.io and React.
              </p>
            </CardBody>
          </Card>
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
