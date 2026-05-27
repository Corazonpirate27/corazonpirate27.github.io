import React from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Github, GraduationCap, MapPin, MessageSquare, Rocket, ShieldCheck, Sparkles } from 'lucide-react';

const values = [
    {
        title: 'Focused Learning',
        description: 'Courses, practice, and tools are grouped so students can choose a path without getting lost.',
        icon: GraduationCap
    },
    {
        title: 'Practical Tools',
        description: 'The platform includes AI guidance, coding practice, games, and exam access.',
        icon: Rocket
    },
    {
        title: 'Trust First',
        description: 'Clear links, simple navigation, and visible project context make the site easier to understand.',
        icon: ShieldCheck
    }
];

const contactLinks = [
    { label: 'GitHub', href: 'https://github.com/Corazonpirate27', icon: Github },
    { label: 'Projects', href: 'https://github.com/Corazonpirate27?tab=repositories', icon: FolderKanban }
];

const About = () => {
    return (
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">About ROOT Academy</p>
                    <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight text-slate-950 dark:text-white md:text-7xl">
                        A personal learning platform built for serious students.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                        ROOT Academy brings courses, AI study help, practice tools, news, coding lessons, and exam preparation into one calm workspace.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        {contactLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith('http') ? '_blank' : undefined}
                                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-5 py-3 text-sm font-bold uppercase tracking-widest text-slate-700 shadow-sm backdrop-blur-xl transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-emerald-300 dark:hover:text-emerald-300"
                                >
                                    <Icon className="h-4 w-4" />
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="relative overflow-hidden rounded-lg border border-white/70 bg-white/75 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/75"
                >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/70 to-sky-400/40" />
                    <Sparkles className="mb-5 h-7 w-7 text-emerald-600 dark:text-emerald-300" />
                    <h2 className="font-serif text-3xl font-bold text-slate-950 dark:text-white">Mission</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Help learners move from curiosity to skill: choose a path, study the best resources, practice in the browser, ask for guidance, and test themselves with a real exam platform.
                    </p>
                    <div className="mt-6 grid gap-3 border-t border-slate-200 pt-6 dark:border-white/10">
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                            Built as a global online learning workspace
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                            Open for feedback, improvements, and new ideas
                        </div>
                    </div>
                </motion.div>
            </section>

            <section className="mt-10 grid gap-5 md:grid-cols-3">
                {values.map((value) => {
                    const Icon = value.icon;
                    return (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-lg border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70"
                        >
                            <Icon className="mb-4 h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                            <h3 className="font-serif text-2xl font-bold text-slate-950 dark:text-white">{value.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{value.description}</p>
                        </motion.div>
                    );
                })}
            </section>
        </div>
    );
};

export default About;
