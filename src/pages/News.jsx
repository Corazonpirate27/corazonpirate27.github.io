import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, RefreshCw, Hash, Clock, ThumbsUp, ChevronDown, Flame, Star, Zap } from 'lucide-react';

const CATEGORIES = {
    top: { name: 'Top Stories', endpoint: 'topstories', icon: Flame },
    new: { name: 'New Stories', endpoint: 'newstories', icon: Zap },
    best: { name: 'Best Stories', endpoint: 'beststories', icon: Star },
};

const News = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('top');
    const [page, setPage] = useState(1);
    const [allIds, setAllIds] = useState([]); // Store all IDs to implement pagination
    const PAGE_SIZE = 30;

    const fetchIds = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://hacker-news.firebaseio.com/v0/${CATEGORIES[category].endpoint}.json?print=pretty`);
            if (!res.ok) throw new Error('Failed to fetch IDs');
            const ids = await res.json();
            setAllIds(ids || []);
            setPage(1);
            // Fetch first page
            if (ids && ids.length > 0) {
                await fetchStories(ids.slice(0, PAGE_SIZE), true);
            } else {
                setStories([]);
                setLoading(false);
            }
        } catch (error) {
            console.error("News Feed Error:", error);
            setLoading(false);
        }
    };

    const fetchStories = async (idsToFetch, reset = false) => {
        try {
            const storyPromises = idsToFetch.map(id =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(r => r.json())
            );
            const results = await Promise.all(storyPromises);
            const newStories = results.filter(s => s && s.url && !s.deleted && !s.dead);

            setStories(prev => reset ? newStories : [...prev, ...newStories]);
        } catch (error) {
             console.error("Error fetching stories:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        const nextIds = allIds.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
        if (nextIds.length === 0) return;
        setPage(prev => prev + 1);
        setLoading(true); // Show loading indicator while fetching more
        fetchStories(nextIds, false);
    };

    useEffect(() => {
        fetchIds();
    }, [category]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-4xl font-serif font-bold text-white mb-2">Tech News Intelligence</h2>
                    <p className="text-gray-400">Real-time data stream from the Hacker News Network.</p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {Object.entries(CATEGORIES).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setCategory(key)}
                            className={`flex items-center gap-2 px-4 py-2 border rounded transition-colors text-sm uppercase tracking-widest whitespace-nowrap
                                ${category === key
                                    ? 'bg-root-green text-black border-root-green font-bold'
                                    : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30'}
                            `}
                        >
                            <config.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{config.name}</span>
                            <span className="sm:hidden">{config.name.split(' ')[0]}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => fetchIds()}
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded hover:bg-white/5 hover:text-root-green transition-colors text-sm uppercase tracking-widest ml-auto md:ml-0"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story, i) => (
                    <motion.a
                        key={`${story.id}-${i}`} // Use unique key
                        href={story.url}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (i % PAGE_SIZE) * 0.05 }}
                        className="group block bg-[#0A0A0A] border border-white/10 p-6 rounded-xl hover:border-root-green/50 hover:bg-white/5 transition-all relative overflow-hidden flex flex-col h-full"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-root-green" />
                        </div>

                        <div className="flex gap-2 text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-mono">
                            <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> {story.score} pts</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(story.time)}</span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-4 line-clamp-3 leading-snug group-hover:text-root-green transition-colors flex-1">
                            {story.title}
                        </h3>

                        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-white/5">
                            <span className="flex items-center gap-1">by {story.by}</span>
                            <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] truncate max-w-[120px]">
                                {getHostname(story.url)}
                            </span>
                        </div>
                    </motion.a>
                ))}

                {loading && [...Array(6)].map((_, i) => (
                     <div key={`skeleton-${i}`} className="h-48 bg-white/5 rounded-xl animate-pulse border border-white/5"></div>
                ))}
            </div>

            {!loading && allIds.length > stories.length && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold uppercase tracking-widest text-white transition-colors flex items-center gap-2"
                    >
                        Load More <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

const timeAgo = (time) => {
    const seconds = Math.floor((new Date() - time * 1000) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
};

const getHostname = (url) => {
    try {
        return new URL(url).hostname.replace('www.', '');
    } catch (e) {
        return 'unknown';
    }
};

export default News;
