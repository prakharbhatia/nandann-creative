import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data/projects';
import Image from 'next/image';
import { X, ExternalLink, Server, Code2 } from 'lucide-react';

interface ProjectLightboxProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-900 border border-white/10 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Image Section (Left/Top) */}
                            <div className="w-full md:w-1/2 bg-black relative min-h-[300px] md:min-h-full">
                                {project.images[0] ? (
                                    <Image
                                        src={project.images[0]}
                                        alt={project.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        No Image Available
                                    </div>
                                )}
                            </div>

                            {/* Details Section (Right/Bottom) */}
                            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full">
                                            {project.category.toUpperCase()}
                                        </span>
                                        {project.isLive && (
                                            <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                                LIVE PROJECT
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
                                    {project.clientName && !project.isConfidential && (
                                        <p className="text-lg text-gray-400">{project.clientName}</p>
                                    )}
                                </div>

                                {/* Tech Stack & Hosting */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="flex items-center gap-2 text-gray-400 mb-2 text-sm font-medium">
                                            <Code2 size={16} />
                                            TECH STACK
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((tech) => (
                                                <span key={tech} className="text-xs text-white bg-white/10 px-2 py-1 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {(project.link || project.hostingProvider) && (
                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <div className="flex items-center gap-2 text-gray-400 mb-2 text-sm font-medium">
                                                <Server size={16} />
                                                HOSTING / LIVE
                                            </div>
                                            {project.hostingProvider && (
                                                <div className="text-white text-sm mb-1">{project.hostingProvider}</div>
                                            )}
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                                                >
                                                    Visit Live Site <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-6 text-gray-300 leading-relaxed overflow-y-auto pr-2 custom-scrollbar">
                                    <div>
                                        <h3 className="text-white font-semibold mb-2">Overview</h3>
                                        <p>{project.description}</p>
                                    </div>

                                    {project.challenge && (
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">The Challenge</h3>
                                            <p>{project.challenge}</p>
                                        </div>
                                    )}

                                    {project.solution && (
                                        <div>
                                            <h3 className="text-white font-semibold mb-2">Our Solution</h3>
                                            <p>{project.solution}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
