import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronUp, ExternalLink, RadioTower, RefreshCw, Trophy } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

const CATALOG_URL = '/courses.json';
const SYNC_INTERVAL_MS = 5 * 60 * 1000;
const CURRENT_YEAR = new Date().getFullYear();

// Reusable Course Card Component
const CourseCard = ({ course, index = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const { isDone, countDone, toggleResource } = useProgress();

    const total = course.links.length;
    const done = countDone(course.id, course.links);
    const percent = total ? Math.round((done / total) * 100) : 0;
    const complete = total > 0 && done === total;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-emerald-300 hover:bg-white hover:shadow-lift md:hover:-translate-y-1.5 dark:border-white/10 dark:bg-slate-950/90 dark:hover:border-emerald-300/50 dark:hover:shadow-glow"
        >
            {/* Image Header */}
            <div className="relative h-40 w-full overflow-hidden border-b border-slate-200 dark:border-white/10">
                <img src={course.image} alt={course.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-950"></div>
            </div>

            <div className="p-6">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {course.meta.role}
                    </span>
                    <span className="text-root-green">{course.icon}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] uppercase tracking-widest text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        {course.track}
                    </span>
                    {course.featured && (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                            {CURRENT_YEAR} Recommended
                        </span>
                    )}
                </div>

                <h3 className="mb-2 font-serif text-xl font-bold text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">{course.name}</h3>

                <div className="mb-4 flex flex-wrap gap-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-root-green"></span>{course.meta.time}</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-root-green"></span>{course.meta.salary}</span>
                </div>

                {/* Progress: persisted locally, no account needed */}
                <div className="mb-6 border-b border-slate-200 pb-6 dark:border-white/10">
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                        <span className={`flex items-center gap-1.5 ${complete ? 'text-emerald-600 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400'}`}>
                            {complete && <Trophy className="h-3 w-3" />}
                            {complete ? 'Track complete' : 'Your progress'}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">{done}/{total}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            initial={false}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-xs font-black uppercase tracking-widest text-white shadow-sm transition-all hover:from-slate-950 hover:to-slate-950 hover:shadow-glow dark:hover:from-white dark:hover:to-white dark:hover:text-slate-950"
                    >
                        {expanded ? 'CLOSE ROADMAP' : 'VIEW ROADMAP'}
                        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                                    {course.links.map((link, i) => {
                                        const checked = isDone(course.id, link.url);
                                        return (
                                            <div
                                                key={i}
                                                className={`group/link flex items-center gap-2 rounded-md border p-3 transition-all ${checked ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-300/40 dark:bg-emerald-400/10' : 'border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-300/40 dark:hover:bg-emerald-400/10'}`}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => toggleResource(course.id, link.url)}
                                                    aria-pressed={checked}
                                                    aria-label={checked ? `Mark ${link.title} as not done` : `Mark ${link.title} as done`}
                                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${checked ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-transparent hover:border-emerald-400 dark:border-white/20 dark:bg-white/5'}`}
                                                >
                                                    <Check className="h-3 w-3" />
                                                </button>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="min-w-0 flex-1"
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className={`truncate text-xs font-bold ${checked ? 'text-emerald-700 dark:text-emerald-200' : 'text-slate-700 group-hover/link:text-emerald-700 dark:text-slate-300 dark:group-hover/link:text-white'}`}>{link.title}</div>
                                                        <ExternalLink className="h-3 w-3 shrink-0 text-slate-400" />
                                                    </div>
                                                    <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-500">{link.tag}</div>
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

const SkeletonCard = () => (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
        <div className="h-40 w-full animate-pulse bg-slate-200/80 dark:bg-white/10" />
        <div className="space-y-4 p-6">
            <div className="h-4 w-2/5 animate-pulse rounded bg-slate-200/80 dark:bg-white/10" />
            <div className="h-6 w-4/5 animate-pulse rounded bg-slate-200/80 dark:bg-white/10" />
            <div className="h-10 w-full animate-pulse rounded bg-slate-200/80 dark:bg-white/10" />
        </div>
    </div>
);

const Curriculum = () => {
    const [catalog, setCatalog] = useState(null);
    const [syncState, setSyncState] = useState('loading'); // loading | live | error
    const [lastSynced, setLastSynced] = useState(null);
    const [activeTrack, setActiveTrack] = useState('All');
    const [search, setSearch] = useState('');
    const { countDone } = useProgress();

    useEffect(() => {
        let cancelled = false;
        let intervalId;

        const sync = async (silent = false) => {
            if (!silent) setSyncState((state) => (state === 'live' ? 'live' : 'loading'));
            try {
                const response = await fetch(`${CATALOG_URL}?t=${Date.now()}`, { cache: 'no-store' });
                if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
                const data = await response.json();
                if (cancelled || !Array.isArray(data.courses)) return;
                setCatalog(data);
                setSyncState('live');
                setLastSynced(new Date());
            } catch {
                if (!cancelled) setSyncState((state) => (state === 'live' ? 'live' : 'error'));
            }
        };

        const handleVisibility = () => {
            if (!document.hidden) sync(true);
        };

        sync();
        intervalId = window.setInterval(() => sync(true), SYNC_INTERVAL_MS);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            cancelled = true;
            window.clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    const courses = catalog?.courses || [];

    const tracks = useMemo(() => {
        const unique = [];
        for (const course of courses) {
            if (course.track && !unique.includes(course.track)) unique.push(course.track);
        }
        return ['All', ...unique];
    }, [courses]);

    const filteredCourses = courses.filter((course) => {
        const query = search.trim().toLowerCase();
        const matchesTrack = activeTrack === 'All' || course.track === activeTrack;
        const matchesSearch = !query
            || course.name.toLowerCase().includes(query)
            || course.track.toLowerCase().includes(query)
            || course.meta.role.toLowerCase().includes(query)
            || course.links.some((link) => link.title.toLowerCase().includes(query));
        return matchesTrack && matchesSearch;
    });

    const overall = useMemo(() => {
        let done = 0;
        let total = 0;
        for (const course of courses) {
            done += countDone(course.id, course.links);
            total += course.links.length;
        }
        return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
    }, [courses, countDone]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <div className="mb-10 space-y-6">
                <div className="max-w-3xl">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Course Roadmaps</p>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                            <RadioTower className="h-3 w-3" />
                            {syncState === 'live' && lastSynced
                                ? `Live catalog · synced ${lastSynced.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                                : syncState === 'error' ? 'Catalog offline' : 'Syncing catalog...'}
                        </span>
                    </div>
                    <h2 className="mb-4 font-serif text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">Course Module {CURRENT_YEAR}</h2>
                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
                        From Nursery to Grade 12 academics, Business, Agriculture, and modern tech careers — the catalog syncs automatically, so new courses appear the moment they are published.
                    </p>
                </div>

                {overall.done > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 backdrop-blur-xl dark:border-emerald-400/20 dark:bg-emerald-400/[0.07] sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-glow">
                                <Trophy className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="font-serif text-lg font-bold text-slate-950 dark:text-white">{overall.done} resources completed</p>
                                <p className="text-xs text-slate-600 dark:text-slate-300">{overall.percent}% across every track · progress saved on this device</p>
                            </div>
                        </div>
                        <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/70 dark:bg-white/10">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                                initial={false}
                                animate={{ width: `${overall.percent}%` }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>
                    </motion.div>
                )}

                <div className="grid gap-4 md:grid-cols-2 items-center">
                    <div className="relative rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search courses, tracks, roles, grades..."
                            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-300 dark:focus:ring-emerald-400/10"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tracks.map((track) => (
                            <button
                                key={track}
                                onClick={() => setActiveTrack(track)}
                                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-all ${activeTrack === track ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 bg-white/70 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'}`}
                            >
                                {track}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {syncState === 'loading' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
                </div>
            )}

            {syncState === 'error' && (
                <div className="mt-4 flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-white/90 p-12 text-center dark:border-white/10 dark:bg-slate-950/90">
                    <p className="text-slate-600 dark:text-slate-300">Could not reach the live course catalog. Check your connection and retry.</p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Retry sync
                    </button>
                </div>
            )}

            {syncState === 'live' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course, index) => (
                            <CourseCard key={course.id} course={course} index={index} />
                        ))}
                    </div>

                    {filteredCourses.length === 0 && (
                        <div className="mt-12 rounded-lg border border-slate-200 bg-white/90 p-12 text-center text-slate-500 dark:border-white/10 dark:bg-slate-950/90 dark:text-slate-400">
                            No matching tracks found. Try broadening your search or selecting a different learning path.
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Curriculum;
