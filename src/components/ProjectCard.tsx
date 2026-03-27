"use client";

import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies?: string[];
  objectFit?: "cover" | "contain" | "fill" | "scale-down";
  featured?: boolean;
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  objectFit = "cover",
  featured = false,
}: ProjectCardProps) {
  const hasImage = image && image !== "null" && image !== "";

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 overflow-hidden h-full">
      {/* Amber top accent bar */}
      <div className="h-1 bg-amber-500 w-full" />

      {/* Image */}
      {hasImage ? (
        <div className={`relative overflow-hidden h-48 ${objectFit === "contain" ? "bg-gray-50" : ""}`}>
          <Image
            src={image}
            alt={title}
            fill
            className={`transition-transform duration-300 group-hover:scale-105 ${objectFit === "contain" ? "p-6" : ""}`}
            style={{ objectFit }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-amber-50 to-emerald-50/40 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-heading text-lg font-bold text-forest group-hover:text-forest/75 transition-colors leading-snug">
            {title}
          </h3>
          {featured && (
            <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
              Featured
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm leading-relaxed flex-grow">
          {description}
        </p>
      </div>

      {/* Tech badges */}
      {technologies && technologies.length > 0 && (
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-medium bg-forest/5 text-forest/70 rounded-lg border border-forest/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
