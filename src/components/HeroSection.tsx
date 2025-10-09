"use client";

import { Button } from "@nextui-org/react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-6xl md:text-8xl font-bold text-primary mb-6">
          Joe Wilkinson
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl text-secondary mb-8">
          Full Stack Developer
        </h2>
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
          Crafting modern web experiences with cutting-edge technologies. 
          Specializing in React, Next.js, and scalable backend architectures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            color="primary"
            size="lg"
            radius="md"
            className="font-semibold shadow-lg hover:shadow-xl transition-all hero-glow px-8 py-3"
          >
            View My Work
          </Button>
          <Button
            variant="bordered"
            color="primary"
            size="lg"
            radius="md"
            className="font-semibold border-primary/50 hover:border-primary transition-all px-8 py-3"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
