import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Cpu, Database, ExternalLink, Key, RefreshCw, Save, Send, Settings, User, X } from 'lucide-react';

const PROVIDER = {
    name: 'Groq AI API',
    url: 'https://api.groq.com/openai/v1',
    defaultModel: 'llama-3.3-70b-versatile',
    icon: 'G'
};

const STORAGE_KEY = 'root_ai_config_v2';

const sanitizeInput = (text) => text.replace(/<[^>]*>?/gm, '').trim();

const Intelligence = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: 'ROOT.AI initialized on the Groq AI API. Add your Groq API key to begin.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [storageMode, setStorageMode] = useState('local');
    const [apiKey, setApiKey] = useState('');
    const scrollRef = useRef(null);

    const templates = [
        'Build a 2026 AI career learning path focused on practical skills, certifications, and portfolio projects.',
        'Outline a cybersecurity operations roadmap for a beginner aiming to land a security engineer role in 2026.',
        'Recommend a cloud and DevOps study plan with free resources and project-based learning.'
    ];

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        try {
            const parsed = JSON.parse(saved);
            if (parsed.apiKey) setApiKey(parsed.apiKey);
            if (parsed.storageMode) setStorageMode(parsed.storageMode);
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const saveConfig = () => {
        const payload = JSON.stringify({ apiKey, storageMode });
        const activeStorage = storageMode === 'local' ? localStorage : sessionStorage;
        const inactiveStorage = storageMode === 'local' ? sessionStorage : localStorage;

        activeStorage.setItem(STORAGE_KEY, payload);
        inactiveStorage.removeItem(STORAGE_KEY);
        setShowSettings(false);
        setMessages((prev) => [...prev, { role: 'system', content: `System updated. Active provider: ${PROVIDER.name}` }]);
    };

    const handleSend = async (event) => {
        event.preventDefault();
        const cleanInput = sanitizeInput(input);
        if (!cleanInput || isLoading) return;

        if (!apiKey.trim()) {
            setShowSettings(true);
            setMessages((prev) => [...prev, { role: 'system', content: 'Missing Groq API key. Open settings and add your key.' }]);
            return;
        }

        const userMessage = { role: 'user', content: cleanInput };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const apiMessages = [
                { role: 'system', content: 'You are ROOT, a concise 2026 tech learning counselor. Recommend practical resources, portfolio projects, and career next steps.' },
                ...messages.filter((message) => message.role !== 'system'),
                userMessage
            ];

            const response = await fetch(`${PROVIDER.url}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey.trim()}`
                },
                body: JSON.stringify({
                    model: PROVIDER.defaultModel,
                    messages: apiMessages,
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error?.message || `${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content || 'No response received.';
            setMessages((prev) => [...prev, { role: 'assistant', content }]);
        } catch (error) {
            setMessages((prev) => [...prev, { role: 'system', content: `Connection failure: ${error.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col px-4 py-8">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Groq Intelligence</p>
                    <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-slate-950 dark:text-white md:text-3xl">
                        <Cpu className="text-emerald-600 dark:text-emerald-300" />
                        Intelligence Hub
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 rounded border border-slate-200 bg-white/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 md:text-xs">
                            {PROVIDER.icon} {PROVIDER.name}
                        </span>
                        <span className="hidden font-mono text-[10px] text-slate-500 dark:text-slate-500 sm:inline">// free key required</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShowSettings(true)}
                        className="rounded-lg border border-slate-200 bg-white/70 p-3 text-slate-600 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-emerald-300"
                        aria-label="Open settings"
                    >
                        <Settings className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="relative flex min-h-[520px] flex-1 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
                <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />

                <div ref={scrollRef} className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
                    {messages.map((message, index) => (
                        <motion.div
                            key={`${message.role}-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                                message.role === 'user'
                                    ? 'border-slate-200 bg-slate-100 dark:border-white/20 dark:bg-white/10'
                                    : message.role === 'assistant'
                                      ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-400/10'
                                      : 'border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10'
                            }`}
                            >
                                {message.role === 'user' ? <User className="h-4 w-4 text-slate-600 dark:text-white" /> :
                                    message.role === 'assistant' ? <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-300" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                            </div>
                            <div className={`max-w-[85%] whitespace-pre-wrap rounded-md p-3 text-sm leading-relaxed md:max-w-2xl ${
                                message.role === 'user'
                                    ? 'bg-slate-100 text-slate-800 dark:bg-white/5 dark:text-gray-200'
                                    : message.role === 'assistant'
                                      ? 'border border-emerald-200 bg-emerald-50 text-slate-800 dark:border-emerald-400/10 dark:bg-emerald-400/5 dark:text-gray-100'
                                      : 'font-mono text-red-600 dark:text-red-400'
                            }`}
                            >
                                {message.content}
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded border border-emerald-200 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                                <RefreshCw className="h-4 w-4 animate-spin text-emerald-600 dark:text-emerald-300" />
                            </div>
                            <div className="flex items-center text-xs text-slate-500 dark:text-gray-500">Decrypting response...</div>
                        </div>
                    )}
                </div>

                <div className="border-t border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-900/90">
                    <div className="mb-3 flex flex-wrap gap-2">
                        {templates.map((template, index) => (
                            <button
                                key={template}
                                type="button"
                                onClick={() => setInput(template)}
                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px] uppercase tracking-widest text-slate-500 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:text-emerald-300"
                            >
                                Prompt {index + 1}
                            </button>
                        ))}
                    </div>
                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={`Message ${PROVIDER.name}...`}
                            className="w-full rounded-lg border border-slate-200 bg-white py-4 pl-4 pr-12 font-mono text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-950 dark:text-white dark:placeholder:text-gray-600 dark:focus:border-emerald-300 dark:focus:ring-emerald-400/10"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 transition-colors hover:text-emerald-600 disabled:opacity-50 dark:text-gray-400 dark:hover:text-emerald-300"
                            aria-label="Send message"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </div>

            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="custom-scrollbar max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl shadow-root-green/10"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-white">
                                    <Database className="h-5 w-5 text-root-green" />
                                    Provider Configuration
                                </h3>
                                <button type="button" onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-white" aria-label="Close settings">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-lg border border-root-green/20 bg-root-green/5 p-4">
                                    <div className="mb-1 text-xs font-bold uppercase tracking-widest text-root-green">{PROVIDER.name}</div>
                                    <div className="font-mono text-[10px] text-gray-500">OpenAI-compatible endpoint // {PROVIDER.url}</div>
                                </div>

                                <div className="rounded-md border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-gray-300">
                                    <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-root-green">Free Groq API Key</div>
                                    <ol className="list-decimal space-y-2 pl-5">
                                        <li>Open GroqCloud and sign in with a free account.</li>
                                        <li>Go to API Keys and choose Create API Key.</li>
                                        <li>Copy the key once, paste it below, then save.</li>
                                        <li>Keep the key private. If it leaks, delete it in GroqCloud and create a new one.</li>
                                    </ol>
                                    <a
                                        href="https://console.groq.com/keys"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 rounded-md border border-root-green/30 bg-root-green/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-root-green transition-colors hover:bg-root-green hover:text-black"
                                    >
                                        Open Groq Keys
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500">
                                        <Key className="h-3 w-3" />
                                        Groq API Key
                                    </label>
                                    <input
                                        type="password"
                                        value={apiKey}
                                        onChange={(event) => setApiKey(event.target.value)}
                                        placeholder="Enter Groq API key..."
                                        className="w-full rounded border border-white/10 bg-black p-3 font-mono text-xs text-gray-300 outline-none focus:border-root-green"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500">Key Storage</label>
                                    <div className="flex overflow-hidden rounded border border-white/10 bg-black">
                                        <button
                                            type="button"
                                            onClick={() => setStorageMode('local')}
                                            className={`flex-1 py-3 text-xs font-bold uppercase ${storageMode === 'local' ? 'bg-root-green text-black' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            Device
                                        </button>
                                        <div className="w-px bg-white/10" />
                                        <button
                                            type="button"
                                            onClick={() => setStorageMode('session')}
                                            className={`flex-1 py-3 text-xs font-bold uppercase ${storageMode === 'session' ? 'bg-root-green text-black' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            Session
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={saveConfig}
                                    className="flex w-full items-center justify-center gap-2 rounded bg-root-green py-4 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-root-green/20 transition-colors hover:bg-white"
                                >
                                    <Save className="h-4 w-4" />
                                    Save & Connect
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Intelligence;
