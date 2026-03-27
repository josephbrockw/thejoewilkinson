"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { AppButton } from "@/components/AppButton";
import { projects } from "@/data";
import Link from "next/link";

const STATS = [
  { number: "10+", label: "Years Building"     },
  { number: "10+", label: "Products Shipped"   },
  { number: "3",   label: "Live SaaS Products" },
  { number: "15+", label: "Technologies"       },
];

const TIMELINE = [
  {
    year: "2013",
    title: "University of Tulsa",
    description:
      "Graduated with degrees in Business Management and Marketing and certification in Nonprofit Management.",
  },
  {
    year: "2015",
    title: "Going All-In on Engineering",
    description:
      "After working in marketing and teaching myself web development in my spare time, I started working a small development agency as an engineer.",
  },
  {
    year: "2016",
    title: "Giving Back",
    description:
     "Cofounded and ran a nonprofit (Code the Block) to help bring computer science education to underserved communities in Kansas City. We ran several in and out of school programs, winning the Brave IT award along the way."
  },
  {
    year: "2020",
    title: "TripleBlind",
    description:
      "Joined TripleBlind as a core engineer, which went on to raise $32mil before being acquired by Selfiie. I built the Router: the service powering authentication, data-sharing permissions, and multi-party compute orchestration for their enterprise Privacy Suite platform. Produced enterprise level software for a highly regulated industry.",
  },
  {
    year: "2025",
    title: "Founded Pollex",
    description:
      "Launched Pollex (pollex.studio) a technical partnership studio that helps non-technical founders build MVPs through a hybrid cash + equity model. We handle discovery, product roadmap, development, and brand design end-to-end.",
  },
  {
    year: "Now",
    title: "Continuing to Deliver Products",
    description:
      "Currently engineering at PressurePro, building a modern tire management platform on Next.js and MongoDB. Continuing to partner with early-stage founders through Pollex. Building Omnigraph to try to connect all human knowledge. Always shipping something new.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* ── Amber band ──────────────────────────────────────────── */}
      <div className="h-15 bg-amber-500" />

      {/* ── About ── amber primary ──────────────────────────────── */}
      <section className="py-20 px-4 bg-[#064E3B]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-white mb-12 text-center">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-white/88 text-lg leading-relaxed mb-6">
                I&apos;m a full-stack engineer who thinks like a founder. My work sits at the
                intersection of clean code and real business outcomes, building products that
                ship fast, scale when they need to, and actually solve problems people have.
              </p>
              <p className="text-white/88 text-lg leading-relaxed">
                I&apos;ve spent years moving between the engineering and the entrepreneurial
                side: writing the code, architecting the systems, and figuring out what to
                build and why. That dual perspective is what makes me most useful at the
                early stages of a product.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-white mb-6">What I bring</h3>
              <div className="space-y-4">
                {[
                  "Idea → MVP in weeks, not months",
                  "Full-stack from database schema to UI to deployment",
                  "AI & LLM integration (OpenAI, RAG pipelines)",
                  "The full SaaS stack: Stripe, auth, multi-tenancy",
                  "Deep experience with Django + React / Next.js",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-4 h-4 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    </span>
                    <span className="text-white/88">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── white ──────────────────────────── */}
      <section className="py-20 px-4 bg-white" id="projects">
        <div className="max-w-6xl mx-auto">
          <Link href="/projects" className="block text-center mb-12 group">
            <h2 className="font-heading text-4xl font-bold text-forest group-hover:text-forest/75 transition-colors cursor-pointer">
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
          <div className="text-center mt-10">
            <AppButton href="/projects" variant="secondary">
              View All Projects
            </AppButton>
          </div>
        </div>
      </section>

      {/* ── Journey ── forest green ─────────────────────────────── */}
      <section className="py-20 px-4 bg-[#064E3B]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-white mb-16 text-center">
            The Journey
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-4 w-px bg-gradient-to-b from-amber-400 via-amber-300/40 to-transparent" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-8 items-start pl-2">
                  <div className="relative flex-shrink-0 w-9 h-9 rounded-full bg-amber-500 border-2 border-amber-400 flex items-center justify-center shadow-md z-10">
                    <span className="text-[9px] font-bold text-white leading-none text-center">{item.year}</span>
                  </div>
                  <div className="pt-1 pb-2">
                    <h3 className="font-heading text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-white/68 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── amber accent ──────────────────────────────── */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold text-forest mb-12">
            Technologies & Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="font-heading text-xl text-forest mb-4">Frontend</h3>
              <p className="text-forest/65">
                React, Next.js, TypeScript, Tailwind CSS, NextUI, ReactNative, MaterialUI
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-forest mb-4">Backend</h3>
              <p className="text-forest/65">
                Python, Django, Django Rest Framework, Flask, PostgreSQL, MongoDB
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-forest mb-4">Tools</h3>
              <p className="text-forest/65">
                Git, Docker, AWS, Vercel, Stripe, OpenAI API, Celery, Bash Scripting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── forest green ─────────────────────────────── */}
      <section className="py-24 px-4 bg-[#064E3B]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s Build Something
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-10">
            Have an idea that needs to ship? Looking for an engineer who gets
            the business side too? I&apos;d love to hear about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppButton href="/contact" variant="primary">
              Get in Touch
            </AppButton>
            <AppButton
              href="https://www.linkedin.com/in/joebwilkinson/"
              variant="ghost-light"
              external
            >
              Connect on LinkedIn
            </AppButton>
          </div>
        </div>
      </section>
    </div>
  );
}
