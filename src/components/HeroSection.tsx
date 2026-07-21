"use client";

import { NetworkGraph } from "./NetworkGraph";
import { AppButton } from "./AppButton";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <NetworkGraph />

      <div className="relative z-10 max-w-2xl w-full mx-auto px-6 text-center bg-opacity-50">
        <div className="bg-white/70  rounded-3xl px-8 md:px-14 py-12 md:py-16 shadow-2xl shadow-forest/10">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-forest leading-tight mb-4">
            Joe Wilkinson
          </h1>
          <h2 className="font-heading text-lg md:text-xl text-forest/60 font-medium mb-6 tracking-wide">
            AI/ML Engineer · Full-Stack Builder · Founder&apos;s Mindset
          </h2>
          <p className="text-base md:text-lg text-gray-500 mb-10 leading-relaxed">
            I build the software businesses run on, and the AI that makes it
            smarter. For over a decade I&apos;ve turned ideas into products that
            ship fast, scale when they need to, and drive real results, always
            choosing the right tool for the problem instead of the trendiest one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppButton href="/projects" variant="primary" size="lg">
              View Projects
            </AppButton>
            <AppButton href="/contact" variant="secondary" size="lg">
              Get In Touch
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
