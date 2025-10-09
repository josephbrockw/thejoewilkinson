"use client";

import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies?: string[];
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
}

export function ProjectCard({ title, description, image, technologies, objectFit = "cover" }: ProjectCardProps) {
  const hasImage = image && image !== "null" && image !== "";

  let imageClassName = "";
  if (objectFit === "contain") {
    imageClassName = "p-6";
  }
  
  return (
    <Card className="bg-content1 border border-divider hover:border-primary/60 transition-all group cursor-pointer">
      <CardBody className="p-0">
        {hasImage ? (
          <div className="relative overflow-hidden h-48">
            <Image
              src={image}
              alt={title}
              fill
              className={`group-hover:scale-105 transition-transform duration-300 ${imageClassName}`}
              style={{ objectFit }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-secondary">Project Image</p>
            </div>
          </div>
        )}
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
