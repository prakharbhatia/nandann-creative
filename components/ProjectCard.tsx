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
            className="group relative break-inside-avoid mb-6 cursor-pointer"
            onClick={() => onClick(project)}
        >
            <div className="relative overflow-hidden rounded-2xl bg-gray-800 aspect-[4/3] group-hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="absolute inset-0">
                    {project.images[0] ? (
                        <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <span className="text-gray-600">No Image</span>
                        </div>
                    )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full backdrop-blur-sm">
                            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </span>
                        {project.isLive && (
                            <span className="flex items-center gap-1 text-xs text-green-400">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                Live
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                        {project.title}
                    </h3>

                    {project.clientName && !project.isConfidential && (
                        <p className="text-sm text-gray-400 mb-2">{project.clientName}</p>
                    )}

                    <div className="flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                                +{project.techStack.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
