import React, { useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ClipboardCheck, Code2, Cpu, ExternalLink, FileText, FolderKanban, Gamepad2, Globe, GraduationCap, Info, Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import FluidBackground from './FluidBackground';

const navLinks = [
    { name: 'Courses', path: '/curriculum', icon: GraduationCap, description: 'Learning paths' },
    { name: 'Intelligence', path: '/intelligence', icon: Cpu, description: 'AI study guide' },
    { name: 'News', path: '/news', icon: Globe, description: 'Education feeds' },
    { name: 'Arcade', path: '/arcade', icon: Gamepad2, description: 'Practice games' },
    { name: 'Playground', path: '/playground', icon: Code2, description: 'Code lessons' },
    { name: 'Word for All', shortName: 'Word', href: 'https://project-word-editor.pages.dev/', icon: FileText, description: 'Web editor', external: true },
    { name: 'Exam', href: 'https://universal-exam-platform.pages.dev/', icon: ClipboardCheck, description: 'Test platform', external: true },
    { name: 'Projects', path: '/projects', icon: FolderKanban, description: 'Live work' },
    { name: 'About', path: '/about', icon: Info, description: 'Mission & contact' }
];

const bottomNavLinks = [
    navLinks[0],
    navLinks[1],
    navLinks[4],
    navLinks[5],
    navLinks[6]
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
    const className = `group flex min-h-14 items-center gap-3 rounded-lg border px-3.5 py-3 transition-all duration-200 ${
        active
            ? 'border-slate-950 bg-slate-950 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-white dark:bg-white dark:text-slate-950'
            : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-white/80 hover:text-slate-950 hover:shadow-sm dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-white/10 dark:hover:text-white'
    }`;
    const iconClassName = `flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
        active
            ? 'bg-white/15 dark:bg-slate-950/10'
            : 'bg-slate-950/[0.04] text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700 dark:bg-white/[0.06] dark:text-slate-300 dark:group-hover:bg-emerald-400/10 dark:group-hover:text-emerald-300'
    }`;
    const label = (
        <>
            <span className={iconClassName}>
                <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold leading-5">{link.name}</span>
                <span className={`block truncate text-[11px] leading-4 ${active ? 'text-white/70 dark:text-slate-600' : 'text-slate-400 dark:text-slate-500'}`}>
                    {link.description}
                </span>
            </span>
        </>
    );

    if (link.external) {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={onClick}
                className={className}
            >
                {label}
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5" />
            </a>
        );
    }

    return (
        <Link
            to={link.path}
            onClick={onClick}
            className={className}
        >
            {label}
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

            <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/65 dark:border-white/10 dark:bg-slate-950/80 dark:supports-[backdrop-filter]:bg-slate-950/65">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
                    <Link to="/" className="group flex shrink-0 items-center gap-3">
                        <span className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-400/25 dark:bg-emerald-400/10">
                            <BookOpen className="h-[22px] w-[22px] text-emerald-600 dark:text-emerald-300" />
                        </span>
                        <span className="hidden font-serif text-lg font-bold tracking-widest text-slate-950 dark:text-white sm:block">
                            ROOT<span className="font-normal text-slate-500 dark:text-slate-400">.ACADEMY</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <a
                            href="https://github.com/Corazonpirate27/root.codex.2026"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden rounded-lg border border-emerald-500 bg-emerald-500 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950 md:inline-flex"
                        >
                            App
                        </a>
                        <a
                            href="https://github.com/Corazonpirate27"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-4 py-2.5 text-xs uppercase tracking-widest text-slate-600 shadow-sm transition-colors hover:bg-slate-950 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 md:inline-flex"
                        >
                            GitHub
                            <ExternalLink className="h-3 w-3" />
                        </a>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="rounded-lg border border-slate-200 bg-white/70 p-2.5 text-slate-600 shadow-sm transition-colors hover:bg-slate-950 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                            aria-label="Toggle dark mode"
                            aria-pressed={theme === 'dark'}
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            type="button"
                            className="rounded-lg border border-slate-200 bg-white/70 p-2.5 text-slate-600 shadow-sm transition-colors hover:bg-slate-950 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
                            onClick={() => setIsMobileMenuOpen((open) => !open)}
                            aria-label="Toggle navigation"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <aside className="fixed bottom-0 left-0 top-20 z-40 hidden w-72 border-r border-black/10 bg-white/70 px-4 py-6 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/55 dark:border-white/10 dark:bg-slate-950/70 dark:supports-[backdrop-filter]:bg-slate-950/55 lg:block">
                <div className="mb-5 px-2">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">Navigation</p>
                    <h2 className="mt-1 font-serif text-2xl font-bold text-slate-950 dark:text-white">Workspace</h2>
                </div>
                <div className="grid gap-2.5">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path || link.href}
                            link={link}
                            active={location.pathname === link.path}
                        />
                    ))}
                </div>
            </aside>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-white/95 px-6 pt-28 backdrop-blur-xl dark:bg-slate-950/95 lg:hidden"
                    >
                        <div className="mx-auto grid max-w-sm gap-3.5">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path || link.href}
                                    link={link}
                                    active={location.pathname === link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                />
                            ))}
                            <a
                                href="https://github.com/Corazonpirate27/root.codex.2026"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 rounded-lg border border-emerald-500 bg-emerald-500 px-4 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-white"
                            >
                                Download App
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isMobileMenuOpen && (
                <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/90 px-2 py-2 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 lg:hidden">
                    <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
                        {bottomNavLinks.map((link) => {
                            const Icon = link.icon;
                            const active = location.pathname === link.path;
                            const className = `flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-[10px] font-semibold transition-colors ${
                                active
                                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                                    : 'text-slate-500 hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white'
                            }`;

                            if (link.external) {
                                return (
                                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={className}>
                                        <Icon className="h-5 w-5" />
                                        <span className="max-w-full truncate px-1">{link.shortName || link.name}</span>
                                    </a>
                                );
                            }

                            return (
                                <Link key={link.path} to={link.path} className={className}>
                                    <Icon className="h-5 w-5" />
                                    <span className="max-w-full truncate px-1">{link.shortName || link.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            )}

            <main className="relative z-10 flex-1 pb-20 pt-20 lg:pb-0 lg:pl-72">
                {children}
            </main>

            <footer className="relative z-10 mt-auto border-t border-black/10 bg-white/75 py-6 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/75">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:pl-72">
                    <span>ROOT Academy 2026</span>
                    <span>Courses // AI guidance // Practice lab</span>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
