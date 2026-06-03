import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, GitFork, RefreshCw, Star, ThumbsUp } from 'lucide-react';

const feeds = [
    { id: 'all', label: 'All Feeds' },
    { id: 'hackernews', label: 'Hacker News' },
    { id: 'devto', label: 'DEV.to' },
    { id: 'github', label: 'GitHub OSS' }
];

const formatDate = (value) => new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
});

const getHostname = (url, fallback = 'source') => {
    try {
        return new URL(url).hostname.replace('www.', '');
    } catch {
        return fallback;
    }
};

const normalizeHackerNews = (item) => ({
    id: `hn-${item.id}`,
    title: item.title,
    url: item.url,
    source: 'Hacker News',
    metric: item.score || 0,
    metricLabel: 'points',
    date: formatDate(item.time * 1000),
    hostname: item.url ? getHostname(item.url, 'news') : 'news',
    author: item.by || 'unknown',
    badge: 'Open API'
});

const normalizeDevTo = (item) => ({
    id: `dev-${item.id || item.slug}`,
    title: item.title,
    url: item.url,
    source: 'DEV.to',
    metric: item.positive_reactions_count || item.public_reactions_count || 0,
    metricLabel: 'reactions',
    date: formatDate(item.published_at),
    hostname: getHostname(item.url, 'dev.to'),
    author: item.user?.name || item.user?.username || 'Dev Community',
    badge: 'Open API'
});

const normalizeGithubRepo = (item) => ({
    id: `gh-${item.id}`,
    title: item.full_name,
    url: item.html_url,
    source: 'GitHub',
    metric: item.stargazers_count || 0,
    metricLabel: 'stars',
    date: formatDate(item.updated_at),
    hostname: item.language || 'repository',
    author: item.owner?.login || 'open-source',
    badge: 'Open Source',
    description: item.description
});

const fetchHackerNews = async () => {
    const idsResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    if (!idsResponse.ok) throw new Error('Hacker News feed failed');
    const ids = await idsResponse.json();
    const items = await Promise.all(
        ids.slice(0, 24).map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then((response) => response.json())
        )
    );

    return items
        .filter((item) => item?.url && item.title)
        .slice(0, 12)
        .map(normalizeHackerNews);
};

const fetchDevTo = async () => {
    const response = await fetch('https://dev.to/api/articles?tag=opensource&per_page=12');
    if (!response.ok) throw new Error('DEV.to feed failed');
    const items = await response.json();
    return items.map(normalizeDevTo);
};

const fetchGithub = async () => {
    const since = new Date();
    since.setDate(since.getDate() - 14);
    const query = encodeURIComponent(`topic:ai topic:developer-tools stars:>500 pushed:>${since.toISOString().slice(0, 10)}`);
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=updated&order=desc&per_page=12`);
    if (!response.ok) throw new Error('GitHub feed failed');
    const data = await response.json();
    return (data.items || []).map(normalizeGithubRepo);
};

const fetchers = {
    hackernews: fetchHackerNews,
    devto: fetchDevTo,
    github: fetchGithub
};

const News = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState('all');
    const [error, setError] = useState('');

    const sourceDescription = useMemo(() => {
        if (source === 'all') return 'Aggregated from public, no-key open APIs.';
        if (source === 'github') return 'Recently updated open-source repositories.';
        if (source === 'devto') return 'Open-source engineering articles from DEV.';
        return 'Top technology links from Hacker News.';
    }, [source]);

    const fetchNews = async (selectedSource = source) => {
        setSource(selectedSource);
        setLoading(true);
        setError('');

        try {
            if (selectedSource === 'all') {
                const results = await Promise.allSettled(Object.values(fetchers).map((fetcher) => fetcher()));
                const fulfilled = results
                    .filter((result) => result.status === 'fulfilled')
                    .flatMap((result) => result.value);

                if (!fulfilled.length) throw new Error('All open feeds failed');

                setStories(fulfilled.sort((a, b) => b.metric - a.metric).slice(0, 24));
                if (results.some((result) => result.status === 'rejected')) {
                    setError('Some feeds were unavailable, so ROOT loaded the feeds that responded.');
                }
            } else {
                setStories(await fetchers[selectedSource]());
            }
        } catch (err) {
            setStories([]);
            setError(err.message || 'Unable to load this feed. Try another source or refresh.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews('all');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <section className="mb-8 flex flex-col gap-5 border-b border-slate-200 pb-8 dark:border-white/10 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Open Source API Desk</p>
                    <h2 className="mb-3 font-serif text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">Tech News</h2>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">{sourceDescription}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {feeds.map((feed) => (
                        <button
                            key={feed.id}
                            type="button"
                            onClick={() => fetchNews(feed.id)}
                            className={`rounded-md border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                                source === feed.id
                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                    : 'border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                            }`}
                        >
                            {feed.label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => fetchNews(source)}
                        className="rounded-md border border-slate-200 bg-white/70 px-4 py-2 text-xs uppercase tracking-widest text-slate-600 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                    >
                        <RefreshCw className={`mr-2 inline-block h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </section>

            {error && (
                <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="h-44 animate-pulse rounded-md border border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.04]" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {stories.map((story, index) => (
                        <motion.a
                            key={story.id}
                            href={story.url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(index * 0.03, 0.24) }}
                            className="group relative flex min-h-52 flex-col rounded-lg border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-xl transition-colors hover:border-emerald-300 hover:bg-white dark:border-white/10 dark:bg-slate-950/90 dark:hover:border-emerald-300/50"
                        >
                            <div className="mb-4 flex flex-wrap items-center gap-2 pr-8">
                                <span className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] uppercase tracking-widest text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                                    {story.source}
                                </span>
                                <span className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] uppercase tracking-widest text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                    {story.badge}
                                </span>
                            </div>

                            <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                                {story.title}
                            </h3>

                            {story.description && (
                                <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{story.description}</p>
                            )}

                            <div className="mt-auto grid gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5" />
                                    {story.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <GitFork className="h-3.5 w-3.5" />
                                    <span className="font-mono">@{story.author}</span>
                                    <span className="truncate rounded border border-slate-200 bg-slate-50 px-2 py-1 dark:border-white/10 dark:bg-white/5">{story.hostname}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                                    {story.source === 'GitHub' ? <Star className="h-3.5 w-3.5" /> : <ThumbsUp className="h-3.5 w-3.5" />}
                                    {story.metric.toLocaleString()} {story.metricLabel}
                                </div>
                            </div>

                            <ExternalLink className="absolute right-5 top-5 h-5 w-5 text-slate-400 transition-colors group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-300" />
                        </motion.a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default News;
