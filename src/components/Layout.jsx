import React, { useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Code2, Cpu, ExternalLink, Gamepad2, Globe, GraduationCap, Menu, Moon, Sun, Terminal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import FluidBackground from './FluidBackground';

const navLinks = [
    { name: 'Courses', path: '/curriculum', icon: GraduationCap },
    { name: 'Intelligence', path: '/intelligence', icon: Cpu },
    { name: 'News', path: '/news', icon: Globe },
    { name: 'Arcade', path: '/arcade', icon: Gamepad2 },
    { name: 'Playground', path: '/playground', icon: Code2 },
    { name: 'Terminal', path: '/terminal', icon: Terminal }
];

const THEME_STORAGE_KEY = 'root_theme';

const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const NavLink = ({ link, active, onClick }) => {
    const Icon = link.icon;

    return (
        <Link
            to={link.path}
            onClick={onClick}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
                active
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
        >
            <Icon className="h-4 w-4" />
            {link.name}
        </Link>
    );
};

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState(getInitialTheme);
    const location = useLocation();

    useLayoutEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark');

    return (
        <div className="relative isolate flex min-h-screen flex-col bg-transparent text-slate-900 selection:bg-emerald-300/40 selection:text-slate-950 dark:text-slate-100 dark:selection:bg-emerald-400/30 dark:selection:text-white">
            <FluidBackground />

            <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <Link to="/" className="group flex shrink-0 items-center gap-3">
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 dark:border-emerald-400/25 dark:bg-emerald-400/10">
                            <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                        </span>
                        <span className="hidden font-serif text-base font-bold tracking-widest text-slate-950 dark:text-white sm:block">
                            ROOT<span className="font-normal text-slate-500 dark:text-slate-400">.ACADEMY</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                link={link}
                                active={location.pathname === link.path}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href="https://github.com/Corazonpirate27/root.codex.2026"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden rounded-md border border-emerald-500 bg-emerald-500 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950 md:inline-flex"
                        >
                            App
                        </a>
                        <a
                            href="https://github.com/Corazonpirate27"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden items-center gap-2 rounded-md border border-slate-200 bg-white/70 px-3 py-2 text-xs uppercase tracking-widest text-slate-600 transition-colors hover:bg-slate-950 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 md:inline-flex"
                        >
                            GitHub
                            <ExternalLink className="h-3 w-3" />
                        </a>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="rounded-md border border-slate-200 bg-white/70 p-2 text-slate-600 transition-colors hover:bg-slate-950 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                            aria-label="Toggle dark mode"
                            aria-pressed={theme === 'dark'}
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            type="button"
                            className="rounded-md border border-slate-200 bg-white/70 p-2 text-slate-600 transition-colors hover:bg-slate-950 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
                            onClick={() => setIsMobileMenuOpen((open) => !open)}
                            aria-label="Toggle navigation"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-white/95 px-6 pt-24 backdrop-blur-xl dark:bg-slate-950/95 lg:hidden"
                    >
                        <div className="mx-auto grid max-w-sm gap-3">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    link={link}
                                    active={location.pathname === link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                />
                            ))}
                            <a
                                href="https://github.com/Corazonpirate27/root.codex.2026"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 rounded-md border border-emerald-500 bg-emerald-500 px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white"
                            >
                                Download App
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 flex-1 pt-16">
                {children}
            </main>

            <footer className="relative z-10 mt-auto border-t border-black/10 bg-white/75 py-6 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                    <span>ROOT Academy 2026</span>
                    <span>Courses // AI guidance // Practice lab</span>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
