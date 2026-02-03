import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Gamepad2, Globe, Cpu } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">

            {/* Hero Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-root-green/20 bg-root-green/5 text-root-green text-[10px] uppercase tracking-widest"
            >
                <span className="w-2 h-2 rounded-full bg-root-green animate-pulse"></span>
                System V3.0 Online
            </motion.div>

            {/* Main Title */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-sans font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
            >
                MASTER THE <br />
                <span className="text-root-green">DIGITAL REALM</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-xl mb-10 text-lg leading-relaxed"
            >
                An elite open-source academy for the next generation of engineers.
                Learn full-stack development, cybersecurity, and AI strategy through immersive simulations.
            </motion.p>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
                <Link
                    to="/curriculum"
                    className="w-full sm:w-auto group bg-root-green text-black px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                    <Terminal className="w-4 h-4" />
                    Initialize Learning
                </Link>

                <Link
                    to="/arcade"
                    className="w-full sm:w-auto group border border-white/20 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:border-root-green hover:text-root-green transition-all flex items-center justify-center gap-2"
                >
                    <Gamepad2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Enter Arcade
                </Link>

                <Link
                    to="/intelligence"
                    className="w-full sm:w-auto group border border-white/10 bg-white/5 text-gray-300 px-8 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-root-green hover:text-black transition-all flex items-center justify-center gap-2 animate-bounce hover:animate-none"
                >
                    <Cpu className="w-4 h-4" />
                    Chat with Intelligence
                </Link>
            </motion.div>

        </div>
    );
};

export default Home;
