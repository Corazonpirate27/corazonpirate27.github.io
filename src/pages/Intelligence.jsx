import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Settings, User, Cpu, AlertTriangle, Save, RefreshCw, Key, Database, ChevronDown, Volume2, VolumeX, PlayCircle, StopCircle, Mic, Globe, Cloud, Trash2, Download, X } from 'lucide-react';
import AIAvatar from '../components/AIAvatar';

const PROVIDERS = {
    groq: {
        name: 'Groq (Llama 3.3)',
        url: 'https://api.groq.com/openai/v1',
        models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'gemma2-9b-it'],
        defaultModel: 'llama-3.3-70b-versatile',
        icon: '⚡'
    },
    gemini: {
        name: 'Google Gemini',
        url: 'https://generativelanguage.googleapis.com/v1beta/openai',
        models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash-exp'],
        defaultModel: 'gemini-1.5-flash',
        icon: '✨'
    },
    openai: {
        name: 'OpenAI (GPT-4)',
        url: 'https://api.openai.com/v1',
        models: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'],
        defaultModel: 'gpt-4o',
        icon: '🧠'
    },
    deepseek: {
        name: 'DeepSeek',
        url: 'https://api.deepseek.com',
        models: ['deepseek-chat', 'deepseek-coder'],
        defaultModel: 'deepseek-chat',
        icon: '🐋'
    }
};

const sanitizeInput = (text) => {
    return text.replace(/<[^>]*>?/gm, '');
};

const Intelligence = () => {
    // Top Level State
    const [messages, setMessages] = useState([
        { role: 'system', content: 'ROOT.AI initialized. Select your provider and configure API access to begin.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isReadingAll, setIsReadingAll] = useState(false);
    const [storageMode, setStorageMode] = useState('local');

    // Voice State
    const [availableVoices, setAvailableVoices] = useState([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState('');

    // Configuration
    const [activeProvider, setActiveProvider] = useState('groq');
    const [apiKeys, setApiKeys] = useState({
        groq: '',
        gemini: '',
        openai: '',
        deepseek: ''
    });
    // Store custom configs if needed (like selected model per provider)
    const [providerConfigs, setProviderConfigs] = useState({
        groq: { model: 'llama-3.3-70b-versatile' },
        gemini: { model: 'gemini-1.5-flash' },
        openai: { model: 'gpt-4o' },
        deepseek: { model: 'deepseek-chat' }
    });

    const scrollRef = useRef(null);

    // Load Config
    useEffect(() => {
        const saved = localStorage.getItem('root_ai_config_v2');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.apiKeys) setApiKeys(parsed.apiKeys);
                if (parsed.activeProvider && PROVIDERS[parsed.activeProvider]) setActiveProvider(parsed.activeProvider);
                if (parsed.selectedVoiceURI) setSelectedVoiceURI(parsed.selectedVoiceURI);

                // Validate Models
                if (parsed.providerConfigs) {
                    const validatedConfigs = { ...parsed.providerConfigs };
                    Object.keys(validatedConfigs).forEach(provider => {
                        const savedModel = validatedConfigs[provider]?.model;
                        if (PROVIDERS[provider] && !PROVIDERS[provider].models.includes(savedModel)) {
                            validatedConfigs[provider].model = PROVIDERS[provider].defaultModel;
                        }
                    });
                    setProviderConfigs(validatedConfigs);
                }
            } catch (e) {
                console.error("Failed to load config", e);
            }
        } else {
            // Migration from v1
            const old = localStorage.getItem('root_ai_config');
            if (old) {
                try {
                    const p = JSON.parse(old);
                    if (p.apiKey) setApiKeys(prev => ({ ...prev, groq: p.apiKey }));
                } catch (e) { console.error("Migration failed", e); }
            }
        }
    }, []);

    // Load Voices
    useEffect(() => {
        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            if (allVoices.length > 0) {
                // Filter for specific high-quality voices only
                const targetNames = ["Google US English", "Microsoft Zira", "Samantha"];
                const filtered = allVoices.filter(v => targetNames.some(name => v.name.includes(name)));

                // If we found our targets, use them. Otherwise fallback to top 3 female/English voices
                const finalVoices = filtered.length > 0 ? filtered : allVoices.filter(v => v.lang.startsWith('en') && v.name.includes('Female')).slice(0, 3);

                // If still nothing, just take first 3 English
                const displayVoices = finalVoices.length > 0 ? finalVoices : allVoices.filter(v => v.lang.startsWith('en')).slice(0, 3);

                setAvailableVoices(displayVoices);

                // Auto-select best if not set
                if (!selectedVoiceURI && displayVoices.length > 0) {
                    setSelectedVoiceURI(displayVoices[0].voiceURI);
                }
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, [selectedVoiceURI]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            const scroll = scrollRef.current;
            scroll.scrollTop = scroll.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSpeak = (text) => {
        if (!soundEnabled || !window.speechSynthesis) return;

        // Cancel previous
        if (!isReadingAll) window.speechSynthesis.cancel();

        // Split text into sentences to avoid browser 15s timeout limiting (stuttering)
        // Match periods, questions, exclamations, but keep them.
        const sentences = text.match(/[^.?!]+[.?!]+[\])'"]*|[^.?!]+$/g) || [text];

        sentences.forEach((sentence, index) => {
            const cleanText = sentence.replace(/[*#]/g, '').trim();
            if (!cleanText) return;

            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI)
                || availableVoices[0];
            if (voice) utterance.voice = voice;

            // Events
            if (index === 0) utterance.onstart = () => setIsSpeaking(true);
            if (index === sentences.length - 1) {
                utterance.onend = () => {
                    if (!isReadingAll) setIsSpeaking(false);
                };
            }

            utterance.onerror = (e) => {
                console.error("Speech Error:", e);
                setIsSpeaking(false);
            };

            window.speechSynthesis.speak(utterance);
        });
    };

    const handleReadConversation = async () => {
        if (!soundEnabled || !window.speechSynthesis) return;

        if (isReadingAll) {
            window.speechSynthesis.cancel();
            setIsReadingAll(false);
            setIsSpeaking(false);
            return;
        }

        setIsReadingAll(true);
        window.speechSynthesis.cancel(); // Stop any pending

        const visibleMessages = messages.filter(m => m.role !== 'system');

        for (const msg of visibleMessages) {
            if (!window.speechSynthesis) break;

            const textToRead = `${msg.role === 'user' ? 'User' : 'Root'} says: ${msg.content}`;
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;

            const voice = availableVoices.find(v => v.voiceURI === selectedVoiceURI);
            if (voice) utterance.voice = voice;

            window.speechSynthesis.speak(utterance);
        }

        // We use a dummy utterance to detect end of queue
        const endUtterance = new SpeechSynthesisUtterance("");
        endUtterance.onend = () => {
            setIsReadingAll(false);
            setIsSpeaking(false);
        };
        window.speechSynthesis.speak(endUtterance);
    };

    const saveConfig = () => {
        const payload = { apiKeys, activeProvider, providerConfigs, selectedVoiceURI };
        if (storageMode === 'local') {
            localStorage.setItem('root_ai_config_v2', JSON.stringify(payload));
        } else {
             localStorage.removeItem('root_ai_config_v2'); // Clear if switching to session
        }
        setShowSettings(false);
        setMessages(prev => [...prev, { role: 'system', content: `System updated. Active Provider: ${PROVIDERS[activeProvider].name}` }]);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        // Stop current speech when user sends new message
        if (isSpeaking || isReadingAll) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setIsReadingAll(false);
        }

        const currentKey = apiKeys[activeProvider];
        if (!currentKey) {
            setShowSettings(true);
            setMessages(prev => [...prev, { role: 'system', content: `ERROR: Missing API Key for ${PROVIDERS[activeProvider].name}. Please configure.` }]);
            return;
        }

        const cleanInput = sanitizeInput(input);
        const userMsg = { role: 'user', content: cleanInput };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const provider = PROVIDERS[activeProvider];
            const model = providerConfigs[activeProvider]?.model || provider.defaultModel;

            // Standard OpenAI Compatible Construction
            const apiMessages = [
                { role: "system", content: "You are ROOT, an elite tech career counselor. Be concise, cyberpunk-themed, and code-savvy." },
                ...messages.filter(m => m.role !== 'system'),
                userMsg
            ];

            const res = await fetch(`${provider.url}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: apiMessages,
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(`API Error ${res.status}: ${errData.error?.message || res.statusText}`);
            }

            const data = await res.json();
            const text = data.choices?.[0]?.message?.content || "No signal received.";

            setMessages(prev => [...prev, { role: 'assistant', content: text }]);
            handleSpeak(text);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'system', content: `Connection Failure: ${err.message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        if (window.confirm("Purge all neural data?")) {
            setMessages([{ role: 'system', content: 'ROOT.AI initialized. Select your provider and configure API access to begin.' }]);
        }
    };

    const downloadChat = () => {
        const text = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `root-ai-log-${new Date().toISOString()}.txt`;
        a.click();
    };


    return (
        <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white flex items-center gap-3">
                        <Cpu className="text-root-green" />
                        Intelligence Hub
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] md:text-xs text-gray-500 font-mono uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded flex items-center gap-2">
                            {PROVIDERS[activeProvider].icon} {PROVIDERS[activeProvider].name}
                        </span>
                        <span className="text-[10px] text-gray-600 font-mono hidden sm:inline">
                            // {providerConfigs[activeProvider]?.model || PROVIDERS[activeProvider].defaultModel}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* AVATAR DISPLAY */}
                    <div className="mr-4 w-16 h-16 md:w-20 md:h-20">
                        <AIAvatar isSpeaking={isSpeaking} isThinking={isLoading} />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                if (soundEnabled && isSpeaking) {
                                    window.speechSynthesis.cancel();
                                    setIsSpeaking(false);
                                }
                                setSoundEnabled(!soundEnabled);
                            }}
                            className={`p-2 md:p-3 rounded-lg border transition-colors ${soundEnabled ? 'border-root-green text-root-green bg-root-green/10' : 'border-white/10 text-gray-500 hover:text-white'}`}
                            title="Toggle Sound"
                        >
                            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>

                        <button
                            onClick={handleReadConversation}
                            className={`p-2 md:p-3 rounded-lg border transition-colors flex items-center gap-2
                                 ${isReadingAll ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-white/10 text-gray-500 hover:text-white'}
                            `}
                            title="Read Conversation"
                        >
                            {isReadingAll ? <StopCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                        </button>

                         <button
                            onClick={clearChat}
                            className="p-2 md:p-3 rounded-lg border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors bg-white/5"
                            title="Clear Chat"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>

                         <button
                            onClick={downloadChat}
                            className="p-2 md:p-3 rounded-lg border border-white/10 hover:border-root-green hover:text-root-green transition-colors bg-white/5"
                            title="Download Chat Log"
                        >
                            <Download className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setShowSettings(true)}
                            className="p-2 md:p-3 rounded-lg border border-white/10 hover:border-root-green hover:text-root-green transition-colors bg-white/5"
                            title="Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-black/40 border border-white/10 rounded-xl overflow-hidden flex flex-col relative">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-root-green/50 to-transparent opacity-50" />

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={i}
                            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border 
                                ${msg.role === 'user' ? 'bg-white/10 border-white/20' : msg.role === 'assistant' ? 'bg-root-green/10 border-root-green/20' : 'bg-red-500/10 border-red-500/20'}
                            `}>
                                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> :
                                    msg.role === 'assistant' ? <Cpu className="w-4 h-4 text-root-green" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                            </div>

                            {/* Bubble */}
                            <div className={`p-3 rounded-xl max-w-[85%] md:max-w-2xl text-sm leading-relaxed whitespace-pre-wrap
                                ${msg.role === 'user' ? 'bg-white/5 text-gray-200' :
                                    msg.role === 'assistant' ? 'bg-root-green/5 text-gray-100 border border-root-green/10' : 'text-red-400 font-mono'}
                            `}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded bg-root-green/10 border border-root-green/20 flex items-center justify-center">
                                <RefreshCw className="w-4 h-4 text-root-green animate-spin" />
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">Decrypting response...</div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-black/60 border-t border-white/10 relative z-50">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Message ${PROVIDERS[activeProvider].name}...`}
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-4 pr-12 text-white focus:border-root-green focus:outline-none focus:ring-1 focus:ring-root-green/50 transition-all font-mono text-sm placeholder-gray-600"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-root-green transition-colors disabled:opacity-50"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 w-full max-w-lg shadow-2xl shadow-root-green/10 max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                                    <Database className="w-5 h-5 text-root-green" />
                                    Provider Configuration
                                </h3>
                                <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-white"><X /></button>
                            </div>

                            <div className="space-y-8">

                                {/* Active Provider Selection */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">Active Neural Network</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(PROVIDERS).map(([key, p]) => (
                                            <button
                                                key={key}
                                                onClick={() => setActiveProvider(key)}
                                                className={`p-3 rounded border text-left flex items-center gap-2 transition-all
                                                    ${activeProvider === key
                                                        ? 'bg-root-green/20 border-root-green text-white shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                                                        : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10 hover:border-white/20'}
                                                `}
                                            >
                                                <span className="text-lg">{p.icon}</span>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold uppercase">{key}</span>
                                                </div>
                                                {activeProvider === key && <div className="ml-auto w-2 h-2 rounded-full bg-root-green animate-pulse" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* API Keys Section */}
                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    <h4 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                                        <Key className="w-3 h-3" /> API Credentials
                                    </h4>

                                    {Object.entries(PROVIDERS).map(([key, p]) => (
                                        <div key={key} className="space-y-1">
                                            <div className="flex justify-between">
                                                <label className="text-[10px] uppercase tracking-widest text-gray-500">{p.name} Key</label>
                                                {activeProvider === key && <span className="text-[10px] text-root-green">Active</span>}
                                            </div>
                                            <input
                                                type="password"
                                                value={apiKeys[key]}
                                                onChange={e => setApiKeys({ ...apiKeys, [key]: e.target.value })}
                                                placeholder={`Enter ${key} API Key...`}
                                                className={`w-full bg-black border rounded p-2 text-xs font-mono transition-colors
                                                    ${activeProvider === key ? 'border-root-green/50 text-white' : 'border-white/10 text-gray-500 focus:border-white/30'}
                                                `}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Voice Selection */}
                                <div className="space-y-2 pt-4 border-t border-white/10">
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                        <Mic className="w-3 h-3" /> AI Voice Personality
                                    </label>
                                    <select
                                        value={selectedVoiceURI}
                                        onChange={(e) => setSelectedVoiceURI(e.target.value)}
                                        className="w-full bg-black border border-white/10 rounded p-2 text-xs font-mono text-gray-300 focus:border-root-green outline-none"
                                    >
                                        <option value="">Auto-Select Best Female Voice</option>
                                        {availableVoices.map(v => (
                                            <option key={v.voiceURI} value={v.voiceURI}>
                                                {v.name} ({v.lang})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Model Config (Optional) */}
                                <div className="space-y-2 pt-4 border-t border-white/10">
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500">Target Model (Optional)</label>
                                    <select
                                        value={providerConfigs[activeProvider]?.model || PROVIDERS[activeProvider].defaultModel}
                                        onChange={(e) => setProviderConfigs({ ...providerConfigs, [activeProvider]: { model: e.target.value } })}
                                        className="w-full bg-black border border-white/10 rounded p-2 text-xs font-mono text-gray-300 focus:border-root-green outline-none"
                                    >
                                        {PROVIDERS[activeProvider].models.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Storage config */}
                                <div className="space-y-2 pt-4 border-t border-white/10">
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500">Security Level</label>
                                    <div className="flex bg-black border border-white/10 rounded overflow-hidden">
                                        <button
                                            onClick={() => setStorageMode('local')}
                                            className={`flex-1 py-3 text-xs font-bold uppercase ${storageMode === 'local' ? 'bg-root-green text-black' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            Persistent (Device)
                                        </button>
                                        <div className="w-px bg-white/10" />
                                        <button
                                            onClick={() => setStorageMode('session')}
                                            className={`flex-1 py-3 text-xs font-bold uppercase ${storageMode === 'session' ? 'bg-root-green text-black' : 'text-gray-500 hover:text-white'}`}
                                        >
                                            Session (One-Time)
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-600">
                                        {storageMode === 'local' ? 'Keys saved to this browser forever.' : 'Keys deleted when you close this tab.'}
                                    </p>
                                </div>

                                <button
                                    onClick={saveConfig}
                                    className="w-full bg-root-green text-black font-bold uppercase tracking-widest text-xs py-4 rounded hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-root-green/20"
                                >
                                    <Save className="w-4 h-4" />
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
