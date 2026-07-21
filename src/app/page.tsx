"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { AppButton } from "@/components/AppButton";
import { projects } from "@/data";
import Link from "next/link";

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
      "After working in marketing and teaching myself web development in my spare time, I started working at a small development agency as an engineer.",
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
    year: "2026",
    title: "Senior AI Software Engineer at NREIG",
    description:
      "Joined NREIG to implement custom ML and AI systems in production: fine-tuning small language models for domain-specific tasks. Currently going deep on Bayesian methods. The through-line is matching the technique to the problem instead of reaching for the same tool every time.",
  },
  {
    year: "Now",
    title: "Building Across the Stack",
    description:
      "Shipping AI systems at NREIG, and continuing with PressurePro as a contractor on their tire management platform. Whyyy is live at whyyy.app. Still partnering with early-stage founders through Pollex. Always shipping something new.",
  },
];

// Pick a column count that divides the featured projects evenly, so the last
// row is never left with a single orphaned card. Class strings are written out
// in full so Tailwind's scanner can see them.
function featuredGridClasses(count: number) {
  if (count % 3 === 0) return { cols: "lg:grid-cols-3", width: "max-w-6xl" };
  if (count % 2 === 0) return { cols: "lg:grid-cols-2", width: "max-w-4xl" };
  return { cols: "lg:grid-cols-3", width: "max-w-6xl" };
}

export default function Home() {
  const featured = projects.filter((project) => project.featured);
  const grid = featuredGridClasses(featured.length);

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
              <p className="text-white/88 text-lg leading-relaxed mb-6">
                These days most of that work is machine learning. I fine-tune small language
                models, build gradient-boosted predictors, and wire them to optimizers that
                turn a forecast into an actual recommendation. The skill I care most about
                isn&apos;t any one technique, it&apos;s diagnosis: knowing when a problem wants
                a fine-tuned model, a tree ensemble, a solver, or just a well-designed prompt.
              </p>
              <p className="text-white/88 text-lg leading-relaxed">
                The two halves reinforce each other. A model that never leaves the notebook
                isn&apos;t worth much, and the hard part is usually getting it into software
                people actually use, with the evaluation and plumbing to keep it honest.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-white mb-6">What I bring</h3>
              <div className="space-y-4">
                {[
                  "Custom ML: fine-tuned SLMs, gradient boosting, Bayesian methods",
                  "Optimization: ILP and greedy solvers for real decision recommendations",
                  "LLM systems: RAG, semantic search, agentic workflows",
                  "Full-stack delivery: schema → UI → deploy, Django + Next.js",
                  "The judgment to pick the right tool, and to skip the LLM when it's wrong",
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

      {/* ── How I Approach ML/AI ── amber accent ────────────────── */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-forest mb-4 text-center">
            How I Approach ML/AI
          </h2>
          <p className="text-forest/65 text-lg text-center max-w-2xl mx-auto mb-14">
            Most AI work fails for unglamorous reasons: the wrong technique for the
            problem, or a good model that never makes it into production. Here&apos;s
            how I avoid both.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: "Understand the problem first",
                body: "Before any model, I get clear on what decision this is supposed to change and what it costs to be wrong. Half the time that conversation reveals the real problem isn't a modeling problem at all.",
              },
              {
                step: "02",
                title: "Match the technique to the constraints",
                body: "Data volume, latency budget, interpretability requirements, and cost narrow the field fast. A fine-tuned small model, a tree ensemble, a solver, and an LLM call are very different answers, and the constraints usually pick one.",
              },
              {
                step: "03",
                title: "Build the evaluation before the model",
                body: "If you can't measure it honestly, you can't improve it or defend it. I set up backtesting and offline evaluation up front, which is what makes it possible to tell real gains from noise.",
              },
              {
                step: "04",
                title: "Ship it into real software",
                body: "A notebook isn't a product. The model has to live behind an API, in a pipeline, in a UI someone uses, with monitoring for when the data shifts underneath it. That's where full-stack experience earns its keep.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white border border-forest/10"
              >
                <span className="font-mono text-sm text-amber-600 font-semibold">
                  {item.step}
                </span>
                <h3 className="font-heading text-xl font-semibold text-forest mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-forest/65 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-forest/70 text-center mt-12 max-w-2xl mx-auto">
            Sometimes the right answer is a 200-line model that runs in
            milliseconds instead of an LLM call. Knowing when to reach for the
            simpler tool is most of the job.
          </p>
        </div>
      </section>

      {/* ── Featured Projects ── white ──────────────────────────── */}
      <section className="py-20 px-4 bg-white" id="projects">
        <div className={`${grid.width} mx-auto`}>
          <Link href="/projects" className="block text-center mb-12 group">
            <h2 className="font-heading text-4xl font-bold text-forest group-hover:text-forest/75 transition-colors cursor-pointer">
              Featured Projects
            </h2>
          </Link>
          <div className={`grid md:grid-cols-2 ${grid.cols} gap-6`}>
            {featured.map((project, index) => (
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
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold text-forest mb-12">
            Technologies & Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6">
              <h3 className="font-heading text-xl text-forest mb-4">AI &amp; ML</h3>
              <p className="text-forest/65">
                XGBoost, scikit-learn, PyTorch, SLM fine-tuning, Bayesian methods,
                ILP / optimization, RAG, pgvector, FastEmbed, LLM APIs
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-forest mb-4">Backend</h3>
              <p className="text-forest/65">
                Python, Django, Django Rest Framework, Flask, PostgreSQL, MongoDB,
                Neo4j, Celery
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-forest mb-4">Frontend</h3>
              <p className="text-forest/65">
                React, Next.js, TypeScript, Tailwind CSS, NextUI, ReactNative, MaterialUI
              </p>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl text-forest mb-4">Infrastructure</h3>
              <p className="text-forest/65">
                Docker, AWS, Vercel, Git, Stripe, Bash Scripting
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
