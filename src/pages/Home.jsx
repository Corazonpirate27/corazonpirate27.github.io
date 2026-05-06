import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Gamepad2, Newspaper, Terminal } from 'lucide-react';

const stats = [
    ['21', 'learning tracks'],
    ['3', 'open news APIs'],
    ['6', 'arcade sims']
];

const Home = () => {
    return (
        <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr]">
            <section>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 font-mono text-[10px] uppercase tracking-widest text-root-green"
                >
                    System 2026 Online
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 }}
                    className="mb-6 max-w-3xl font-serif text-5xl font-bold leading-[1.02] text-white md:text-7xl"
                >
                    Learn tech with a cleaner command center.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 }}
                    className="mb-8 max-w-2xl text-base leading-7 text-gray-400 md:text-lg"
                >
                    Courses, open-source news, Groq-powered AI guidance, and lightweight arcade drills in one optimized workspace.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 }}
                    className="flex flex-col gap-3 sm:flex-row"
                >
                    <Link
                        to="/curriculum"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-root-green px-5 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-white"
                    >
                        <Terminal className="h-4 w-4" />
                        Start Learning
                    </Link>
                    <Link
                        to="/intelligence"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-root-green hover:text-root-green"
                    >
                        <Cpu className="h-4 w-4" />
                        Ask AI
                    </Link>
                </motion.div>
            </section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="grid gap-4"
            >
                <div className="rounded-md border border-white/10 bg-black/55 p-5 backdrop-blur">
                    <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Workspace</p>
                            <h2 className="font-serif text-2xl font-bold text-white">ROOT Stack</h2>
                        </div>
                        <span className="rounded border border-root-green/30 bg-root-green/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-root-green">
                            Live
                        </span>
                    </div>

                    <div className="grid gap-3">
                        <Link to="/news" className="group flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-root-green/40 hover:bg-white/[0.06]">
                            <span className="flex items-center gap-3 text-sm font-medium text-white">
                                <Newspaper className="h-5 w-5 text-root-green" />
                                Open-source tech feeds
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-root-green">Open</span>
                        </Link>
                        <Link to="/arcade" className="group flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-root-green/40 hover:bg-white/[0.06]">
                            <span className="flex items-center gap-3 text-sm font-medium text-white">
                                <Gamepad2 className="h-5 w-5 text-root-green" />
                                Optimized arcade lab
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-root-green">Boot</span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {stats.map(([value, label]) => (
                        <div key={label} className="rounded-md border border-white/10 bg-black/45 p-4">
                            <div className="font-serif text-2xl font-bold text-white">{value}</div>
                            <div className="mt-1 text-[10px] uppercase tracking-widest text-gray-500">{label}</div>
                        </div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
