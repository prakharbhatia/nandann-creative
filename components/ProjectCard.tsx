import React from 'react';
import { Project } from '../data/projects';
import Image from 'next/image';

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <div
            className="group break-inside-avoid mb-6 cursor-pointer bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 border border-white/5 hover:-translate-y-1"
            onClick={() => onClick(project)}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 to-black overflow-hidden">
                {project.images[0] ? (
                    <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-700 font-medium">No Image</span>
                    </div>
                )}

                {/* Live Badge (Overlaid on image) */}
                {project.isLive && (
                    <div className="absolute top-3 right-3">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-black/60 text-green-400 backdrop-blur-md rounded-full border border-white/10">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            Live
                        </span>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.title}
                </h3>

                {project.clientName && !project.isConfidential && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-1">{project.clientName}</p>
                )}

                <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                            +{project.techStack.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
