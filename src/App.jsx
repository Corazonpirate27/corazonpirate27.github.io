import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import BootSequence from './components/BootSequence';

const Home = lazy(() => import('./pages/Home'));
const Curriculum = lazy(() => import('./pages/Curriculum'));
const Intelligence = lazy(() => import('./pages/Intelligence'));
const News = lazy(() => import('./pages/News'));
const Arcade = lazy(() => import('./pages/Arcade'));
const Playground = lazy(() => import('./pages/Playground'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));

const RouteFallback = () => (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
        <div className="h-10 w-10 animate-pulse rounded-md border border-emerald-300 bg-emerald-400/20" aria-label="Loading page" />
    </div>
);

export default function App() {
    const location = useLocation();
    const [booted, setBooted] = useState(false);

    useEffect(() => {
        // Only run the boot sequence once per browser session
        const hasBooted = sessionStorage.getItem('root_booted');
        if (hasBooted) {
            setBooted(true);
        }
    }, []);

    const handleBootComplete = useCallback(() => {
        sessionStorage.setItem('root_booted', 'true');
        setBooted(true);
    }, []);

    return (
        <>
            {!booted && <BootSequence onComplete={handleBootComplete} />}
            {booted && (
                <Layout>
                    <Suspense fallback={<RouteFallback />}>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/curriculum" element={<Curriculum />} />
                            <Route path="/intelligence" element={<Intelligence />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/arcade" element={<Arcade />} />
                            <Route path="/playground" element={<Playground />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </Suspense>
                </Layout>
            )}
        </>
    );
}
