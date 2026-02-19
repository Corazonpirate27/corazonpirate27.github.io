import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, RefreshCw, Hash, Clock, ThumbsUp, ChevronDown, Flame, Star, Zap, Code2, Rss } from 'lucide-react';

const CATEGORIES = {
    top: { name: 'Top Stories', endpoint: 'topstories', type: 'hn', icon: Flame },
    new: { name: 'New Stories', endpoint: 'newstories', type: 'hn', icon: Zap },
    best: { name: 'Best Stories', endpoint: 'beststories', type: 'hn', icon: Star },
    dev: { name: 'Dev Community', endpoint: 'https://dev.to/api/articles?per_page=30&top=7', type: 'dev', icon: Code2 }, // top=7 means top of the week
    tech: { name: 'Tech Feed', endpoint: 'https://dev.to/api/articles?tag=tech&per_page=30', type: 'dev', icon: Rss },
};

const News = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('top');
    const [page, setPage] = useState(1);
    const [allIds, setAllIds] = useState([]); // Store all IDs to implement pagination for HN
    const PAGE_SIZE = 30;

    // Fetch Logic
    const fetchData = async () => {
        setLoading(true);
        setStories([]); // Clear previous
        const config = CATEGORIES[category];

        try {
            if (config.type === 'hn') {
                // Hacker News Logic
                const res = await fetch(`https://hacker-news.firebaseio.com/v0/${config.endpoint}.json?print=pretty`);
                if (!res.ok) throw new Error('Failed to fetch HN IDs');
                const ids = await res.json();
                setAllIds(ids || []);
                setPage(1);

                if (ids && ids.length > 0) {
                    await fetchHNStories(ids.slice(0, PAGE_SIZE));
                } else {
                    setLoading(false);
                }
            } else if (config.type === 'dev') {
                // Dev.to Logic
                const res = await fetch(config.endpoint);
                if (!res.ok) throw new Error('Failed to fetch Dev.to articles');
                const articles = await res.json();
                // Map Dev.to format to common format
                const formatted = articles.map(a => ({
                    id: a.id,
                    title: a.title,
                    url: a.url,
                    score: a.public_reactions_count,
                    by: a.user.name,
                    time: new Date(a.published_at).getTime() / 1000, // seconds
                    domain: 'dev.to',
                    image: a.cover_image || a.social_image,
                    desc: a.description
                }));
                setStories(formatted);
                setAllIds([]); // No client-side pagination for Dev.to in this simple implementation
                setLoading(false);
            }
        } catch (error) {
            console.error("News Feed Error:", error);
            setLoading(false);
        }
    };

    const fetchHNStories = async (idsToFetch, append = false) => {
        try {
            // Robust fetching: handle individual failures
            const storyPromises = idsToFetch.map(id =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                    .then(r => {
                        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
                        return r.json();
                    })
                    .catch(e => null) // Return null on error so Promise.all doesn't reject
            );

            const results = await Promise.all(storyPromises);
            const newStories = results
                .filter(s => s && s.url && !s.deleted && !s.dead)
                .map(s => ({
                    id: s.id,
                    title: s.title,
                    url: s.url,
                    score: s.score,
                    by: s.by,
                    time: s.time,
                    domain: getHostname(s.url),
                    image: null, // HN doesn't provide images
                    desc: null
                }));

            setStories(prev => append ? [...prev, ...newStories] : newStories);
        } catch (error) {
             console.error("Error fetching HN stories batch:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (CATEGORIES[category].type === 'hn') {
            const nextIds = allIds.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
            if (nextIds.length === 0) return;
            setPage(prev => prev + 1);
            setLoading(true); // Show loading indicator while fetching more (maybe separate loading state for 'more'?)
            // Actually let's keep simple loading for now, or just append.
            // If we set loading=true, it might clear list if we use logic above.
            // Let's call fetchHNStories directly with append=true
            fetchHNStories(nextIds, true);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-4xl font-serif font-bold text-white mb-2">Tech News Intelligence</h2>
                    <p className="text-gray-400">Real-time data stream from global tech networks.</p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
                    {Object.entries(CATEGORIES).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setCategory(key)}
                            className={`flex items-center gap-2 px-4 py-2 border rounded transition-colors text-sm uppercase tracking-widest whitespace-nowrap
                                ${category === key
                                    ? 'bg-root-green text-black border-root-green font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                                    : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30 bg-white/5'}
                            `}
                        >
                            <config.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{config.name}</span>
                            <span className="sm:hidden">{config.name.split(' ')[0]}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => fetchData()}
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded hover:bg-white/5 hover:text-root-green transition-colors text-sm uppercase tracking-widest ml-auto md:ml-0 bg-white/5"
                        title="Refresh Feed"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {stories.map((story, i) => (
                        <motion.a
                            key={`${story.id}-${category}`}
                            href={story.url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: (i % PAGE_SIZE) * 0.03 }}
                            className="group block bg-[#0A0A0A] border border-white/10 rounded-xl hover:border-root-green/50 hover:bg-white/5 transition-all relative overflow-hidden flex flex-col h-full hover:-translate-y-1 hover:shadow-lg hover:shadow-root-green/10"
                        >
                            {/* Image for Dev.to */}
                            {story.image && (
                                <div className="h-40 w-full overflow-hidden border-b border-white/5 relative">
                                    <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
                                </div>
                            )}

                            <div className="p-6 flex flex-col flex-1">
                                <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity z-10">
                                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-root-green" />
                                </div>

                                <div className="flex gap-3 text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-mono">
                                    <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> {story.score || 0}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(story.time)}</span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 line-clamp-3 leading-snug group-hover:text-root-green transition-colors flex-1 font-serif">
                                    {story.title}
                                </h3>

                                {story.desc && (
                                    <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                        {story.desc}
                                    </p>
                                )}

                                <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-white/5">
                                    <span className="flex items-center gap-1 truncate max-w-[150px]">by {story.by}</span>
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] truncate max-w-[100px] font-mono text-gray-400 group-hover:text-root-green/80 group-hover:border-root-green/20 transition-colors">
                                        {story.domain}
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </AnimatePresence>

                {loading && [...Array(6)].map((_, i) => (
                     <div key={`skeleton-${i}`} className="h-64 bg-white/5 rounded-xl animate-pulse border border-white/5 flex flex-col">
                        <div className="h-32 bg-white/5 w-full" />
                        <div className="p-6 flex-1 space-y-4">
                             <div className="h-4 bg-white/10 w-3/4 rounded" />
                             <div className="h-4 bg-white/10 w-1/2 rounded" />
                        </div>
                     </div>
                ))}
            </div>

            {!loading && CATEGORIES[category].type === 'hn' && allIds.length > stories.length && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold uppercase tracking-widest text-white transition-colors flex items-center gap-2 hover:border-root-green/30"
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
