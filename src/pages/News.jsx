import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, RefreshCw, Hash, Clock, ThumbsUp } from 'lucide-react';

const News = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const CACHE_KEY = 'root_academy_news_cache';
    const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

    const fetchNews = async (forceRefresh = false) => {
        setLoading(true);
        try {
            if (!forceRefresh) {
                const cached = sessionStorage.getItem(CACHE_KEY);
                if (cached) {
                    const { data, timestamp } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_TIME) {
                        setStories(data);
                        setLoading(false);
                        return;
                    }
                }
            }

            // Hacker News Top Stories
            const idsRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
            const ids = await idsRes.json();
            const top30 = ids.slice(0, 30);

            const storyPromises = top30.map(id =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
            );

            const results = await Promise.all(storyPromises);
            // Filter: Must have URL and Score > 50 (Verified Interest)
            const validStories = results.filter(s => s && s.url && s.score > 50);

            setStories(validStories);
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({
                data: validStories,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error("News Feed Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-serif font-bold text-white mb-2">Tech News Intelligence</h2>
                    <p className="text-gray-400">Real-time data stream from the Hacker News Network.</p>
                </div>
                <button
                    onClick={() => fetchNews(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded hover:bg-white/5 hover:text-root-green transition-colors text-sm uppercase tracking-widest"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-40 bg-white/5 rounded-xl animate-pulse border border-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story, i) => (
                        <motion.a
                            key={story.id}
                            href={story.url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group block bg-[#0A0A0A] border border-white/10 p-6 rounded-xl hover:border-root-green/50 hover:bg-white/5 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-root-green" />
                            </div>

                            <div className="flex gap-2 text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-mono">
                                <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> Rank {i + 1}</span>
                                <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {story.score}</span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-root-green transition-colors">
                                {story.title}
                            </h3>

                            <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(story.time * 1000).toLocaleDateString()}
                                </div>
                                <span className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px]">
                                    {new URL(story.url).hostname.replace('www.', '')}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;
