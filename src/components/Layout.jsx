import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, ExternalLink, Cpu, Gamepad2, GraduationCap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixBackground from './MatrixBackground';

const MatrixLink = ({ to, name, active }) => {
    const [text, setText] = useState(name);
    const intervalRef = useRef(null);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";

    const onMouseEnter = () => {
        let iteration = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setText(prev =>
                name.split("")
                    .map((letter, index) => {
                        if (index < iteration) return name[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("")
            );

            if (iteration >= name.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    // Reset on unmount or mouse leave buffer (optional, but let's keep it simple: it solves to completion)
    // Actually, force text back to name if needed, but the effect solves automatically.

    return (
        <Link
            to={to}
            onMouseEnter={onMouseEnter}
            className={`relative text-[10px] uppercase tracking-widest font-medium transition-colors flex items-center gap-2 group
              ${active ? 'text-white' : 'text-gray-400 hover:text-white'}
            `}
        >
            <span className="relative z-10 font-mono">{text}</span>
            {active && <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-px bg-root-green" />}
        </Link>
    );
};


const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Nav Links updated with News
    const navLinks = [
        { name: 'Curriculum', path: '/curriculum', icon: GraduationCap },
        { name: 'Intelligence', path: '/intelligence', icon: Cpu },
        { name: 'Tech News', path: '/news', icon: Globe },
        { name: 'Arcade', path: '/arcade', icon: Gamepad2 },
    ];

    return (
        <div className="min-h-screen flex flex-col relative text-gray-200 font-sans selection:bg-root-green/30 selection:text-white">
            <MatrixBackground />

            {/* Navbar */}
            <nav className="fixed w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl h-20">
                <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <div className="w-8 h-8 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-root-green blur opacity-20 group-hover:opacity-50 transition-opacity rounded"></div>
                            <Terminal className="w-6 h-6 text-root-green" />
                        </div>
                        <span className="font-serif font-bold tracking-widest text-lg hidden sm:block">ROOT<span className="opacity-50 font-normal">.ACADEMY</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <MatrixLink
                                key={link.path}
                                to={link.path}
                                name={link.name}
                                active={location.pathname === link.path}
                            />
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Download App */}
                        <a
                            href="https://github.com/Corazonpirate27/root.codex.2026"
                            target="_blank"
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-root-green text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all animate-pulse hover:animate-none"
                        >
                            <span>Download App</span>
                        </a>

                        {/* Extension */}
                        <a
                            href="https://github.com/Corazonpirate27/ghost-text-extension"
                            target="_blank"
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-root-green hover:text-root-green transition-all text-[10px] uppercase tracking-widest text-gray-400"
                        >
                            <span className="hidden xl:inline">Extension</span>
                            <span className="xl:hidden">Ext</span>
                        </a>

                        {/* Github */}
                        <a
                            href="https://github.com/Corazonpirate27"
                            target="_blank"
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-white hover:text-white transition-all text-[10px] uppercase tracking-widest text-gray-400"
                        >
                            <span>Github</span>
                        </a>

                        {/* Creator Link */}
                        <a
                            href="https://arogyabaral.com.np"
                            target="_blank"
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-root-green hover:text-black transition-all text-[10px] uppercase tracking-widest text-gray-300"
                        >
                            <span>Creator</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                            className="lg:hidden p-2 text-gray-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 lg:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-3xl font-serif text-gray-300 hover:text-root-green flex items-center gap-4 active:scale-95 transition-transform"
                            >
                                <link.icon className="w-8 h-8" />
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex flex-col gap-4 w-full px-12 mt-8">
                            <a href="https://github.com/Corazonpirate27/root.codex.2026" className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-white/5 border border-white/10 text-gray-300 uppercase tracking-widest text-sm active:bg-root-green/20">
                                <span>Download App</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 pt-20 overflow-x-hidden">
                {children}
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-white/5 py-8 mt-auto bg-black/80 backdrop-blur pb-20 md:pb-8">
                <div className="max-w-7xl mx-auto px-4 text-center text-[10px] uppercase tracking-widest text-gray-600">
                    Process: Running // System: Online // v3.0.0
                </div>
            </footer>
        </div>
    );
};

export default Layout;
