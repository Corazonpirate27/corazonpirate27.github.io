import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import avatarImage from '../assets/ai-avatar.png';

const AIAvatar = ({ isSpeaking, isThinking }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Calculate mouse position relative to center of screen
            // Range: -1 to 1
            const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Parallax strength
    const moveX = mousePosition.x * 15; // Max 15px movement
    const moveY = mousePosition.y * 15;

    return (
        <div className="relative w-32 h-32 flex items-center justify-center perspective-1000 group">

            {/* Outer Glow / Halo */}
            <motion.div
                animate={{
                    opacity: isSpeaking ? [0.6, 1, 0.6] : 0.4,
                    scale: isSpeaking ? [1, 1.1, 1] : 1,
                }}
                transition={{
                    duration: isSpeaking ? 0.5 : 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-root-green/20 blur-xl"
            />

            {/* Avatar Container with 3D Rotation based on mouse */}
            <motion.div
                className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    rotateY: mousePosition.x * 20, // Rotate towards mouse
                    rotateX: -mousePosition.y * 20,
                    scale: isThinking ? [1, 1.05, 1] : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20, // Smooth damping
                    scale: {
                        duration: 0.5,
                        repeat: isThinking ? Infinity : 0,
                    }
                }}
            >
                {/* The Image Itself - Scale slightly up to avoid edges showing during parallax */}
                <div className="w-full h-full relative">
                    <motion.img
                        src={avatarImage}
                        alt="AI Avatar"
                        className="w-full h-full object-cover"
                        animate={{
                            x: -moveX, // Move image opposite to frame for depth effect (or same for "looking" effect)
                            y: -moveY,
                            filter: isSpeaking ? "brightness(1.2) contrast(1.1)" : "brightness(1) contrast(1)"
                        }}
                        transition={{
                            type: "tween",
                            ease: "linear",
                            duration: 0.1
                        }}
                    />

                    {/* Digital Glitch/Scanline Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-root-green/20 to-transparent opacity-30 mix-blend-overlay pointer-events-none" />

                    {/* Scanning Line Animation */}
                    {isThinking && (
                        <motion.div
                            className="absolute inset-0 w-full h-1 bg-root-green/50 shadow-[0_0_10px_#22c55e]"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </div>
            </motion.div>

            {/* Speaking Visualizer Rings */}
            {isSpeaking && (
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute inset-0 rounded-full border border-root-green/50"
                        animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute inset-0 rounded-full border border-root-green/30"
                        animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                </div>
            )}
        </div>
    );
};

export default AIAvatar;
