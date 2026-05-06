import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, ExternalLink, Gamepad2, Globe, GraduationCap, Menu, Terminal, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MatrixBackground from './MatrixBackground';

const navLinks = [
    { name: 'Courses', path: '/curriculum', icon: GraduationCap },
    { name: 'Intelligence', path: '/intelligence', icon: Cpu },
    { name: 'News', path: '/news', icon: Globe },
    { name: 'Arcade', path: '/arcade', icon: Gamepad2 }
];

const NavLink = ({ link, active, onClick }) => {
    const Icon = link.icon;

    return (
        <Link
            to={link.path}
            onClick={onClick}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
                active
                    ? 'bg-root-green text-black'
                    : 'text-gray-400 hover:bg-white/[0.06] hover:text-white'
            }`}
        >
            <Icon className="h-4 w-4" />
            {link.name}
        </Link>
    );
};

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="relative flex min-h-screen flex-col bg-root-dark text-gray-200 selection:bg-root-green/30 selection:text-white">
            <MatrixBackground />

            <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <Link to="/" className="group flex shrink-0 items-center gap-3">
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-root-green/30 bg-root-green/10">
                            <Terminal className="h-5 w-5 text-root-green" />
                        </span>
                        <span className="hidden font-serif text-base font-bold tracking-widest text-white sm:block">
                            ROOT<span className="font-normal text-gray-500">.ACADEMY</span>
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
                            className="hidden rounded-md border border-root-green/30 bg-root-green px-3 py-2 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white md:inline-flex"
                        >
                            App
                        </a>
                        <a
                            href="https://github.com/Corazonpirate27"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-widest text-gray-300 transition-colors hover:bg-white/10 md:inline-flex"
                        >
                            GitHub
                            <ExternalLink className="h-3 w-3" />
                        </a>
                        <button
                            type="button"
                            className="rounded-md border border-white/10 bg-white/[0.03] p-2 text-gray-300 transition-colors hover:bg-white/10 lg:hidden"
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
                        className="fixed inset-0 z-40 bg-black/95 px-6 pt-24 backdrop-blur-xl lg:hidden"
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
                                className="mt-4 rounded-md border border-root-green/30 bg-root-green px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-black"
                            >
                                Download App
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-1 pt-16">
                {children}
            </main>

            <footer className="mt-auto border-t border-white/10 bg-black/70 py-6 backdrop-blur">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-[10px] uppercase tracking-widest text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                    <span>ROOT Academy 2026</span>
                    <span>Open feeds // Groq Intelligence // Arcade Lab</span>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
