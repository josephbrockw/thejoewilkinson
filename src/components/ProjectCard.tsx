"use client";

import { Card, CardBody, Image } from "@nextui-org/react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies?: string[];
}

export function ProjectCard({ title, description, image, technologies }: ProjectCardProps) {
  return (
    <Card className="bg-content1 border border-divider hover:border-primary/60 transition-all group cursor-pointer">
      <CardBody className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            radius="none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="font-heading text-xl text-primary mb-3 group-hover:text-primary/80 transition-colors">
            {title}
          </h3>
          <p className="text-secondary mb-4 leading-relaxed">
            {description}
          </p>
          {technologies && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
