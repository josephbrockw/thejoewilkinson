"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
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
          <ProjectCard
            title="Prompt with Friends"
            description="A social party game where players write creative prompts and compete to generate the funniest or most on-theme AI images — the best image wins the round."
            image="/images/pwf_logo.png"
            technologies={["ReactNative", "GenAI", "Python", "Django"]}
            objectFit="contain"
          />
          <ProjectCard
            title="Capwise"
            description="A custom fantasy basketball platform that transforms a dynasty league into a true front office experience— complete with salary cap management, rookie drafts, and a real-time trade machine."
            image="/images/capwise_logo.png"
            technologies={["Next.js", "Stripe", "Tailwind", "MongoDB"]}
            objectFit="contain"
          />
          <ProjectCard
            title="TripleBlind Router"
            description="Developed the TripleBlind Router, the core service powering authentication, data sharing permissions, and multi-party compute orchestration between organizations within the Privacy Suite platform."
            image="/images/TripleBlind_logo.png"
            technologies={["Django", "API", "React", "Celery"]}
            objectFit="contain"
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
