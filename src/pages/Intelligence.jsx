import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Cpu, Database, ExternalLink, Key, RefreshCw, Save, Send, Settings, User, X, Paperclip, FileText } from 'lucide-react';

const PROVIDER = {
    name: 'Groq AI API',
    url: 'https://api.groq.com/openai/v1',
    defaultModel: 'llama-3.3-70b-versatile',
    icon: 'G'
};

const STORAGE_KEY = 'root_ai_config_v2';

const sanitizeInput = (text) => text.replace(/<[^>]*>?/gm, '').trim();

// Dynamically load PDF.js
const loadPdfJs = async () => {
    if (window.pdfjsLib) return window.pdfjsLib;
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve(window.pdfjsLib);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

const Intelligence = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: 'ROOT AI learning guide is ready. Add your Groq API key to begin.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [storageMode, setStorageMode] = useState('local');
    const [apiKey, setApiKey] = useState('');
    const scrollRef = useRef(null);
    const fileInputRef = useRef(null);

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
        setMessages((prev) => [...prev, { role: 'system', content: `Settings saved. Active provider: ${PROVIDER.name}` }]);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setMessages(prev => [...prev, { role: 'system', content: 'Only PDF files are supported.' }]);
            return;
        }

        setIsUploading(true);
        try {
            const pdfjs = await loadPdfJs();
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument(arrayBuffer).promise;
            
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                fullText += textContent.items.map(s => s.str).join(' ') + '\\n';
            }

            // Truncate if too long (Groq context limits roughly 8k tokens)
            const MAX_CHARS = 25000; 
            const isTruncated = fullText.length > MAX_CHARS;
            const textToProcess = isTruncated ? fullText.substring(0, MAX_CHARS) + '\\n\\n...[Document Truncated due to length]' : fullText;

            setMessages(prev => [...prev, { 
                role: 'user', 
                content: `I have uploaded a document named "${file.name}".\\n\\nDocument Content:\\n${textToProcess}\\n\\nPlease read this document and await my instructions.` 
            }]);
            
            // Automatically get a brief summary from Groq
            setTimeout(() => {
                setInput('Can you give me a brief summary of the document I just uploaded?');
            }, 500);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'system', content: `Failed to read PDF: ${error.message}` }]);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
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
                { role: 'system', content: 'You are ROOT, a concise 2026 tech learning counselor. You can analyze documents the user uploads.' },
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
        <div className="mx-auto flex h-[calc(100vh-64px)] max-w-5xl flex-col px-4 py-8">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">AI Study Guide</p>
                    <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-slate-950 dark:text-white md:text-3xl">
                        <Cpu className="text-emerald-600 dark:text-emerald-300" />
                        Learning Assistant
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-2 rounded border border-slate-200 bg-white/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 md:text-xs">
                            {PROVIDER.icon} {PROVIDER.name}
                        </span>
                        <span className="hidden font-mono text-[10px] text-slate-500 dark:text-slate-500 sm:inline">free key required</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShowSettings(true)}
                        className="rounded-lg border border-slate-200 bg-white/70 p-3 text-slate-600 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-emerald-300 dark:hover:text-emerald-300"
                        aria-label="Open settings"
                    >
                        <Settings className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/75">
                <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-70" />

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
                                      : 'border-red-500/20 bg-red-500/10'
                            }`}
                            >
                                {message.role === 'user' ? <User className="h-4 w-4 text-slate-600 dark:text-white" /> :
                                    message.role === 'assistant' ? <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-300" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                            </div>
                            <div className={`max-w-[85%] whitespace-pre-wrap rounded-md p-3 text-sm leading-relaxed md:max-w-2xl ${
                                message.role === 'user'
                                    ? 'bg-slate-100 text-slate-800 dark:bg-white/5 dark:text-slate-200'
                                    : message.role === 'assistant'
                                      ? 'border border-emerald-200 bg-emerald-50 text-slate-800 dark:border-emerald-400/10 dark:bg-emerald-400/10 dark:text-slate-100'
                                      : 'font-mono text-red-600 dark:text-red-400'
                            }`}
                            >
                                {message.content}
                            </div>
                        </motion.div>
                    ))}

                    {(isLoading || isUploading) && (
                        <div className="flex gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded border border-emerald-200 bg-emerald-50 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                                <RefreshCw className="h-4 w-4 animate-spin text-emerald-600 dark:text-emerald-300" />
                            </div>
                            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                                {isUploading ? 'Extracting document text...' : 'Thinking through your request...'}
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-t border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/45">
                    <div className="mb-3 flex flex-wrap gap-2">
                        {templates.map((template, index) => (
                            <button
                                key={template}
                                type="button"
                                onClick={() => setInput(template)}
                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px] uppercase tracking-widest text-slate-500 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-emerald-300 dark:hover:text-emerald-300"
                            >
                                Prompt {index + 1}
                            </button>
                        ))}
                    </div>
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input 
                            type="file" 
                            accept=".pdf" 
                            className="hidden" 
                            ref={fileInputRef} 
                            onChange={handleFileUpload} 
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading || isUploading}
                            className="absolute left-3 z-10 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-white/10 dark:hover:text-emerald-300"
                            title="Upload PDF Document"
                        >
                            <Paperclip className="h-4 w-4" />
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={`Message ${PROVIDER.name}...`}
                            className="w-full rounded-lg border border-slate-200 bg-white py-4 pl-14 pr-12 font-mono text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || isUploading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 transition-colors hover:text-emerald-700 disabled:opacity-50 dark:hover:text-emerald-300"
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
                            className="custom-scrollbar max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-white/70 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-slate-950 dark:text-white">
                                    <Database className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                                    Provider Configuration
                                </h3>
                                <button type="button" onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-slate-950 dark:hover:text-white" aria-label="Close settings">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                                    <div className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">{PROVIDER.name}</div>
                                    <div className="font-mono text-[10px] text-slate-500 dark:text-slate-400">OpenAI-compatible endpoint: {PROVIDER.url}</div>
                                </div>

                                <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                                    <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Free Groq API Key</div>
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
                                        className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 transition-colors hover:bg-emerald-500 hover:text-white dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300"
                                    >
                                        Open Groq Keys
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                        <Key className="h-3 w-3" />
                                        Groq API Key
                                    </label>
                                    <input
                                        type="password"
                                        value={apiKey}
                                        onChange={(event) => setApiKey(event.target.value)}
                                        placeholder="Enter Groq API key..."
                                        className="w-full rounded border border-slate-200 bg-white p-3 font-mono text-xs text-slate-800 outline-none focus:border-emerald-400 dark:border-white/10 dark:bg-slate-950 dark:text-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Key Storage</label>
                                    <div className="flex overflow-hidden rounded border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
                                        <button
                                            type="button"
                                            onClick={() => setStorageMode('local')}
                                            className={`flex-1 py-3 text-xs font-bold uppercase ${storageMode === 'local' ? 'bg-emerald-500 text-white dark:bg-emerald-300 dark:text-slate-950' : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'}`}
                                        >
                                            Device
                                        </button>
                                        <div className="w-px bg-slate-200 dark:bg-white/10" />
                                        <button
                                            type="button"
                                            onClick={() => setStorageMode('session')}
                                            className={`flex-1 py-3 text-xs font-bold uppercase ${storageMode === 'session' ? 'bg-emerald-500 text-white dark:bg-emerald-300 dark:text-slate-950' : 'text-slate-500 hover:text-slate-950 dark:hover:text-white'}`}
                                        >
                                            Session
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={saveConfig}
                                    className="flex w-full items-center justify-center gap-2 rounded bg-emerald-500 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950"
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
