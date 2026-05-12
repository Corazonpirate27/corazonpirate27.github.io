import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Curriculum from './pages/Curriculum';
import Intelligence from './pages/Intelligence';
import News from './pages/News';
import Arcade from './pages/Arcade';
import Playground from './pages/Playground';
import CyberTerminal from './pages/CyberTerminal';

export default function App() {
    const location = useLocation();

    return (
        <Layout>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/intelligence" element={<Intelligence />} />
                <Route path="/news" element={<News />} />
                <Route path="/arcade" element={<Arcade />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/terminal" element={<CyberTerminal />} />
            </Routes>
        </Layout>
    );
}
