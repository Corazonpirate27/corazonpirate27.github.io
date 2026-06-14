import { useCallback, useEffect, useState } from 'react';

// Shared, cross-component progress store backed by localStorage.
// A completed resource is keyed as `${courseId}::${url}` so it stays stable
// even when the catalog re-orders or adds links. No account required.
const STORAGE_KEY = 'root_progress_v1';

const read = () => {
    if (typeof window === 'undefined') return {};
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        return {};
    }
};

// Simple subscriber set so every card re-renders when progress changes,
// including changes coming from other browser tabs.
const listeners = new Set();
let state = read();

const persist = () => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        /* storage full or blocked — keep working in-memory */
    }
};

const emit = () => {
    for (const listener of listeners) listener(state);
};

export const toggleResource = (courseId, url) => {
    const key = `${courseId}::${url}`;
    const next = { ...state };
    if (next[key]) {
        delete next[key];
    } else {
        next[key] = Date.now();
    }
    state = next;
    persist();
    emit();
};

export const useProgress = () => {
    const [snapshot, setSnapshot] = useState(state);

    useEffect(() => {
        const listener = (value) => setSnapshot(value);
        listeners.add(listener);

        const onStorage = (event) => {
            if (event.key === STORAGE_KEY) {
                state = read();
                emit();
            }
        };
        window.addEventListener('storage', onStorage);

        return () => {
            listeners.delete(listener);
            window.removeEventListener('storage', onStorage);
        };
    }, []);

    const isDone = useCallback((courseId, url) => Boolean(snapshot[`${courseId}::${url}`]), [snapshot]);

    const countDone = useCallback(
        (courseId, links) => links.reduce((total, link) => total + (snapshot[`${courseId}::${link.url}`] ? 1 : 0), 0),
        [snapshot]
    );

    return { isDone, countDone, toggleResource };
};
