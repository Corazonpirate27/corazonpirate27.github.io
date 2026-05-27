import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, ClipboardCheck, Code2, ExternalLink, FileText, Gamepad2, Github, Newspaper } from 'lucide-react';

const projects = [
    {
        title: 'Universal Exam Platform',
        description: 'A dedicated exam and test preparation platform for structured practice.',
        href: 'https://universal-exam-platform.pages.dev/',
        icon: ClipboardCheck,
        status: 'Live',
        accent: 'from-emerald-400/22 to-sky-400/14'
    },
    {
        title: 'AI Study Assistant',
        description: 'A Groq-powered guidance space for study plans, roadmaps, and document help.',
        to: '/intelligence',
        icon: Bot,
        status: 'Built in',
        accent: 'from-cyan-400/20 to-emerald-400/12'
    },
    {
        title: 'Code Playground',
        description: 'Browser lessons for JavaScript, Python, algebra, and vector practice.',
        to: '/playground',
        icon: Code2,
        status: 'Interactive',
        accent: 'from-indigo-400/18 to-emerald-400/12'
    },
    {
        title: 'Word for All',
        description: 'A web-based writing and editing workspace for focused document work.',
        href: 'https://project-word-editor.pages.dev/',
        icon: FileText,
        status: 'Web based',
        accent: 'from-violet-400/18 to-sky-400/12'
    },
    {
        title: 'Practice Arcade',
        description: 'Learning games and small drills that make revision feel lighter.',
        to: '/arcade',
        icon: Gamepad2,
        status: 'Practice',
        accent: 'from-rose-400/14 to-emerald-400/12'
    },
    {
        title: 'Education Feeds',
        description: 'A news area for education, technology, and learning updates.',
        to: '/news',
        icon: Newspaper,
        status: 'Reading',
        accent: 'from-amber-400/16 to-sky-400/12'
    }
];

const ProjectLink = ({ project }) => {
    const Icon = project.icon;
    const content = (
        <>
            <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
            <div className="relative flex min-h-60 flex-col justify-between p-6">
                <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/70 bg-white/70 text-emerald-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-emerald-300">
                        <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded border border-slate-200 bg-white/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
                        {project.status}
                    </span>
                </div>
                <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-950 dark:text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                        Open
                        <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                </div>
            </div>
        </>
    );

    const className = "group relative overflow-hidden rounded-lg border border-white/70 bg-white/70 shadow-sm backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-900/70";

    if (project.href) {
        return <a href={project.href} target="_blank" rel="noreferrer" className={className}>{content}</a>;
    }

    return <Link to={project.to} className={className}>{content}</Link>;
};

const Projects = () => {
    return (
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <section className="mb-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Projects</p>
                    <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight text-slate-950 dark:text-white md:text-7xl">
                        Live tools from the ROOT Academy workspace.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                        A clean showcase for the apps, learning tools, and experiments connected to this web platform.
                    </p>
                </motion.div>

                <motion.a
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    href="https://github.com/Corazonpirate27"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-2xl transition-colors hover:border-emerald-300 dark:border-white/10 dark:bg-slate-900/70"
                >
                    <span>
                        <span className="block font-serif text-xl font-bold text-slate-950 dark:text-white">GitHub Profile</span>
                        <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">Code, repos, and updates</span>
                    </span>
                    <Github className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                </motion.a>
            </section>

            <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <ProjectLink key={project.title} project={project} />
                ))}
            </motion.div>
        </div>
    );
};

export default Projects;
