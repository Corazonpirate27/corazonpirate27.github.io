import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootLines = [
    "INIT ROOT_KERNEL v2.0.26...",
    "LOADING MEMORY BANKS... 640K OK",
    "ESTABLISHING SECURE NEURAL LINK... CONNECTED",
    "DECRYPTING OBSIDIAN PULSE ARCHIVES... SUCCESS",
    "MOUNTING /dev/hda1... OK",
    "STARTING DAEMONS: SSHD CYBER_ENV WASM_VM",
    "INITIALIZING GRAPHICS ENGINE... THREE.JS LOADED",
    "BYPASSING MAINFRAME FIREWALLS... ",
    "ACCESS GRANTED. WELCOME TO ROOT ACADEMY."
];

export default function BootSequence({ onComplete }) {
    const [lines, setLines] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < bootLines.length) {
                setLines(prev => [...prev, bootLines[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(onComplete, 500); // Wait for fade out animation
                }, 600);
            }
        }, 120);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex flex-col justify-end overflow-hidden bg-slate-950 p-6 font-mono text-xs text-emerald-500 md:p-12 md:text-sm"
        >
            {/* Retro CRT Scanline Effect */}
            <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
            
            <div className="mb-8">
                {lines.map((line, index) => (
                    <div key={index} className="mb-1 opacity-80">
                        {'> '} {line}
                    </div>
                ))}
                {lines.length < bootLines.length && (
                    <div className="ml-1 inline-block h-4 w-2 animate-pulse bg-emerald-500"></div>
                )}
            </div>
        </motion.div>
    );
}
