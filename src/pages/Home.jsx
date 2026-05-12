import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Gamepad2, Newspaper } from 'lucide-react';
import Canvas3D from '../components/Canvas3D';

const stats = [
    ['44+', 'learning paths'],
    ['13', 'school levels'],
    ['4', 'main sections']
];

const Home = () => {
    return (
        <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Canvas3D />
            <section className="relative z-10 pointer-events-none *:pointer-events-auto">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300"
                >
                    ROOT Academy 2026
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="mb-6 max-w-3xl font-serif text-5xl font-bold leading-[1.02] text-slate-950 dark:text-white md:text-7xl"
                >
                    A calmer place to learn what matters.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                    className="mb-8 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg"
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
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950"
                    >
                        <BookOpen className="h-4 w-4" />
                        Start Learning
                    </Link>
                    <Link
                        to="/intelligence"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white/70 px-5 py-3 text-sm font-bold uppercase tracking-widest text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-emerald-300 dark:hover:text-emerald-300"
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
                <div className="rounded-lg border border-white/70 bg-white/70 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70">
                    <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Learning Space</p>
                            <h2 className="font-serif text-2xl font-bold text-slate-950 dark:text-white">Education Hub</h2>
                        </div>
                        <span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                            Live
                        </span>
                    </div>

                    <div className="grid gap-3">
                        <Link to="/news" className="group flex items-center justify-between rounded-md border border-slate-200 bg-white/70 p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-300/40 dark:hover:bg-emerald-400/10">
                            <span className="flex items-center gap-3 text-sm font-medium text-slate-800 dark:text-white">
                                <Newspaper className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                                Education and technology feeds
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-emerald-700 dark:text-slate-400 dark:group-hover:text-emerald-300">Open</span>
                        </Link>
                        <Link to="/arcade" className="group flex items-center justify-between rounded-md border border-slate-200 bg-white/70 p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-300/40 dark:hover:bg-emerald-400/10">
                            <span className="flex items-center gap-3 text-sm font-medium text-slate-800 dark:text-white">
                                <Gamepad2 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                                Practice games
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-emerald-700 dark:text-slate-400 dark:group-hover:text-emerald-300">Play</span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {stats.map(([value, label]) => (
                        <div key={label} className="rounded-lg border border-white/70 bg-white/65 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
                            <div className="font-serif text-2xl font-bold text-slate-950 dark:text-white">{value}</div>
                            <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
