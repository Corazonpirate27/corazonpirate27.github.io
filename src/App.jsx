import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Curriculum from './pages/Curriculum';
import Intelligence from './pages/Intelligence';
import News from './pages/News';
import Arcade from './pages/Arcade';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

// Animated Route Wrapper
const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

export default function App() {
    const location = useLocation();

    return (
        <Layout>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                    <Route path="/curriculum" element={<AnimatedPage><Curriculum /></AnimatedPage>} />
                    <Route path="/intelligence" element={<AnimatedPage><Intelligence /></AnimatedPage>} />
                    <Route path="/news" element={<AnimatedPage><News /></AnimatedPage>} />
                    <Route path="/arcade" element={<AnimatedPage><Arcade /></AnimatedPage>} />
                </Routes>
            </AnimatePresence>
        </Layout>
    );
}
