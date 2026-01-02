import React, { useState, useMemo } from 'react';
import { projects, Project } from '../data/projects';
import ProjectCard from './ProjectCard';
import FilterBar from './FilterBar';
import ProjectLightbox from './ProjectLightbox';
import { AnimatePresence, motion } from 'framer-motion';

export default function PortfolioGallery() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeTechStack, setActiveTechStack] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(projects.map((p) => p.category));
        return Array.from(cats);
    }, []);

    // Extract unique tech stacks
    const techStacks = useMemo(() => {
        const stacks = new Set<string>();
        projects.forEach((p) => {
            p.techStack.forEach((tech) => stacks.add(tech));
        });
        return Array.from(stacks).sort();
    }, []);

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
            const matchesTechStack = activeTechStack === 'all' || project.techStack.includes(activeTechStack);
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

            return matchesCategory && matchesTechStack && matchesSearch;
        });
    }, [activeCategory, activeTechStack, searchQuery]);

    return (
        <section className="min-h-screen bg-black text-white pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        Our Work
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Explore our portfolio of high-performance websites, custom plugins, and enterprise solutions.
                    </p>
                </div>

                {/* Filter Bar */}
                <FilterBar
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    techStacks={techStacks}
                    activeTechStack={activeTechStack}
                    onTechStackChange={setActiveTechStack}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* Masonry Grid */}
                <motion.div
                    layout
                    className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                        <button
                            onClick={() => {
                                setActiveCategory('all');
                                setActiveTechStack('all');
                                setSearchQuery('');
                            }}
                            className="mt-4 text-blue-400 hover:text-blue-300 underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Lightbox */}
                <ProjectLightbox
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </div>
        </section>
    );
}
