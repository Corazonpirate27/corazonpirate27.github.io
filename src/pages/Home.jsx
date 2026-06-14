import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Brain, CheckCircle2, Clock3, Code2, FolderKanban, Gamepad2, Newspaper, Radio, Sparkles } from 'lucide-react';

const stats = [
    ['27+', 'learning paths'],
    ['325+', 'curated resources'],
    ['N-12', 'school grades']
];

const quickLinks = [
    { title: 'Education and technology feeds', action: 'Open', to: '/news', icon: Newspaper },
    { title: 'Practice games', action: 'Play', to: '/arcade', icon: Gamepad2 },
    { title: 'Code playground', action: 'Build', to: '/playground', icon: Code2 }
];

const dashboardItems = [
    { title: 'Continue Course', description: 'Pick a learning path and keep moving.', to: '/curriculum', icon: BookOpen },
    { title: 'Ask AI', description: 'Get help with roadmap, notes, or revision.', to: '/intelligence', icon: Brain },
    { title: 'Practice Code', description: 'Run lessons directly in the browser.', to: '/playground', icon: Code2 },
    { title: 'Open Projects', description: 'View connected apps and live work.', to: '/projects', icon: FolderKanban }
];

const previews = [
    { title: 'Arcade', description: 'Quick practice games for active recall.', to: '/arcade', icon: Gamepad2 },
    { title: 'News', description: 'Education and technology reading space.', to: '/news', icon: Newspaper }
];

const Home = () => {
    return (
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8">
            <div className="grid min-h-[calc(100vh-80px)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="relative z-10 pointer-events-none *:pointer-events-auto">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 font-mono text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300"
                >
                    ROOT Academy 2026
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="mb-7 max-w-3xl font-serif text-5xl font-bold leading-[1.01] text-slate-950 dark:text-white sm:text-6xl md:text-8xl"
                >
                    A calmer place to <span className="text-gradient">learn what matters.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                    className="mb-9 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl"
                >
                    Explore school subjects, career fields, modern technology, news, AI guidance, and practice drills in one real education workspace.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 }}
                    className="flex flex-col gap-3 sm:flex-row"
                >
                    <Link
                        to="/curriculum"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:from-slate-950 hover:to-slate-950 dark:hover:from-white dark:hover:to-white dark:hover:text-slate-950"
                    >
                        <BookOpen className="h-4 w-4" />
                        Start Learning
                    </Link>
                    <Link
                        to="/intelligence"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-emerald-300 dark:hover:text-emerald-300"
                    >
                        <Brain className="h-4 w-4" />
                        Ask AI
                    </Link>
                </motion.div>
            </section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="relative z-10 grid gap-4 pointer-events-none *:pointer-events-auto"
            >
                <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/75 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/75">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/70 to-sky-400/40" />

                    <div className="relative">
                        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 pb-5 dark:border-white/10">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Learning Space</p>
                                <h2 className="mt-1 font-serif text-3xl font-bold text-slate-950 dark:text-white">Education Hub</h2>
                            </div>
                            <span className="inline-flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                <Radio className="h-3 w-3" />
                                Live
                            </span>
                        </div>

                        <div className="mb-6 grid divide-y divide-slate-200 border-b border-slate-200 pb-6 dark:divide-white/10 dark:border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                            {stats.map(([value, label]) => (
                                <div key={label} className="py-3 first:pt-0 last:pb-0 sm:px-4 sm:py-0 sm:first:pl-0 sm:last:pr-0">
                                    <div className="font-serif text-3xl font-bold text-slate-950 dark:text-white">{value}</div>
                                    <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid">
                            {quickLinks.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.title}
                                        to={item.to}
                                        className={`group flex min-h-16 items-center justify-between gap-4 py-3 transition-colors hover:text-emerald-700 dark:hover:text-emerald-300 ${index > 0 ? 'border-t border-slate-200 dark:border-white/10' : ''}`}
                                    >
                                        <span className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-800 dark:text-white">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-950/[0.04] text-emerald-600 transition-colors dark:bg-white/[0.06] dark:text-emerald-300">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <span className="truncate">{item.title}</span>
                                        </span>
                                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-emerald-700 dark:text-slate-400 dark:group-hover:text-emerald-300">{item.action}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
                        <Sparkles className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">Designed for focused study sessions with tools close at hand.</p>
                    </div>
                    <div className="rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
                        <Brain className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">AI guidance, coding practice, games, and feeds work as one workspace.</p>
                    </div>
                </div>
            </motion.section>
            </div>

            <section className="relative z-10 -mx-5 overflow-hidden border-y border-slate-200/70 py-4 dark:border-white/10 lg:-mx-8" aria-hidden="true">
                <div className="marquee-track animate-marquee gap-10 font-serif text-2xl font-bold uppercase tracking-wide text-slate-300 dark:text-slate-700">
                    {[0, 1].map((copy) => (
                        <div key={copy} className="flex shrink-0 items-center gap-10 pr-10">
                            {['Mathematics', 'Coding', 'Science', 'Business', 'Agriculture', 'AI', 'Nursery - Grade 12', 'Cybersecurity', 'Robotics', 'Design'].map((subject) => (
                                <span key={subject} className="flex items-center gap-10">
                                    {subject}
                                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <motion.section
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 py-8"
            >
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Student Dashboard</p>
                        <h2 className="mt-2 font-serif text-4xl font-bold text-slate-950 dark:text-white">Today's learning</h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Clock3 className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                        Pick one action and keep momentum.
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {dashboardItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                            <Link
                                to={item.to}
                                className="group block h-full rounded-2xl border border-white/70 bg-white/70 p-5 shadow-sm backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-900/70"
                            >
                                <div className="mb-5 flex items-center justify-between">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950/[0.04] text-emerald-600 dark:bg-white/[0.06] dark:text-emerald-300">
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <CheckCircle2 className="h-4 w-4 text-slate-300 transition-colors group-hover:text-emerald-500 dark:text-slate-600" />
                                </div>
                                <h3 className="font-serif text-xl font-bold text-slate-950 dark:text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                            </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 pb-10 pt-4"
            >
                <div className="mb-6">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Previews</p>
                    <h2 className="mt-2 font-serif text-4xl font-bold text-slate-950 dark:text-white">Explore the workspace</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {previews.map((preview) => {
                        const Icon = preview.icon;
                        return (
                            <Link
                                key={preview.title}
                                to={preview.to}
                                className="group relative min-h-56 overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-slate-900/70"
                            >
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/60 to-sky-400/40" />
                                <Icon className="mb-10 h-7 w-7 text-emerald-600 dark:text-emerald-300" />
                                <h3 className="font-serif text-2xl font-bold text-slate-950 dark:text-white">{preview.title}</h3>
                                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-300">{preview.description}</p>
                                <span className="mt-5 inline-flex text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Open</span>
                            </Link>
                        );
                    })}
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
