import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Play, X } from 'lucide-react';

const games = [
    {
        id: 'reaction', title: 'Reaction Flash', color: '#f97316',
        desc: 'Wait for the signal, then tap fast without jumping early.',
        image: '/arcade/reaction-flash.webp',
        lvl: '01',
        controls: 'Tap / Click'
    },
    {
        id: 'priority', title: 'Priority Sort', color: '#f59e0b',
        desc: 'Choose the most urgent task first to train calm prioritization.',
        image: '/arcade/priority-sort.webp',
        lvl: '02',
        controls: 'Pick lowest'
    },
    {
        id: 'oddone', title: 'Odd One Out', color: '#84cc16',
        desc: 'Spot the one item that breaks the group pattern.',
        image: '/arcade/odd-one-out.webp',
        lvl: '03',
        controls: 'Find odd'
    },
    {
        id: 'snake', title: 'Logic Trail', color: '#22c55e',
        desc: 'Guide a moving trail through a tighter grid as focus and planning improve.',
        image: '/arcade/logic-trail.webp',
        lvl: '04',
        controls: 'Arrow keys'
    },
    {
        id: 'focusgrid', title: 'Focus Grid', color: '#22c55e',
        desc: 'Find numbers in order while resisting visual noise and rushing.',
        image: '/arcade/focus-grid.webp',
        lvl: '05',
        controls: 'Tap order'
    },
    {
        id: 'memory', title: 'Memory Match', color: '#a855f7',
        desc: 'Match learning cards with fewer clicks and stronger recall.',
        image: '/arcade/memory-match.webp',
        lvl: '06',
        controls: 'Tap cards'
    },
    {
        id: 'equation', title: 'Math Burst', color: '#14b8a6',
        desc: 'Solve quick arithmetic prompts before the round timer drains.',
        image: '/arcade/math-burst.webp',
        lvl: '07',
        controls: 'Tap answer'
    },
    {
        id: 'pairsum', title: 'Pair Sum', color: '#10b981',
        desc: 'Pick two numbers that make the target total.',
        image: '/arcade/pair-sum.webp',
        lvl: '08',
        controls: 'Pick pair'
    },
    {
        id: 'pong', title: 'Focus Rally', color: '#3b82f6',
        desc: 'Practice timing, attention, and quick directional control.',
        image: '/arcade/focus-rally.webp',
        lvl: '09',
        controls: 'Up / Down'
    },
    {
        id: 'logicgate', title: 'Logic Gate', color: '#6366f1',
        desc: 'Judge changing rules using number and color conditions.',
        image: '/arcade/logic-gate.webp',
        lvl: '10',
        controls: 'Yes / No'
    },
    {
        id: 'wordvault', title: 'Word Vault', color: '#0ea5e9',
        desc: 'Hold a short word list in mind, then judge recall under pressure.',
        image: '/arcade/word-vault.webp',
        lvl: '11',
        controls: 'Recall check'
    },
    {
        id: 'color', title: 'Color Signal', color: '#ec4899',
        desc: 'Match meaning, not instinct, as color words try to distract you.',
        image: '/arcade/color-signal.webp',
        lvl: '12',
        controls: 'Tap color'
    },
    {
        id: 'breakout', title: 'Concept Builder', color: '#ef4444',
        desc: 'Break big ideas into smaller blocks while keeping momentum.',
        image: '/arcade/concept-builder.webp',
        lvl: '13',
        controls: 'Left / Right'
    },
    {
        id: 'sequence', title: 'Sequence Stack', color: '#8b5cf6',
        desc: 'Memorize and repeat growing number patterns with clean focus.',
        image: '/arcade/sequence-stack.webp',
        lvl: '14',
        controls: 'Tap sequence'
    },
    {
        id: 'numberspan', title: 'Number Span', color: '#7c3aed',
        desc: 'Remember a number chain and replay it backward.',
        image: '/arcade/number-span.webp',
        lvl: '15',
        controls: 'Reverse tap'
    },
    {
        id: 'invaders', title: 'Pattern Guard', color: '#eab308',
        desc: 'Practice scanning and quick response as patterns move down the board.',
        image: '/arcade/pattern-guard.webp',
        lvl: '16',
        controls: 'Move + Fire'
    },
    {
        id: 'typer', title: 'Typing Sprint', color: '#06b6d4',
        desc: 'Build typing speed by clearing falling words before they reach the bottom.',
        image: '/arcade/typing-sprint.webp',
        lvl: '17',
        controls: 'Keyboard'
    },
    {
        id: 'switchshift', title: 'Switch Shift', color: '#d946ef',
        desc: 'Follow changing rules to practice mental flexibility and control.',
        image: '/arcade/switch-shift.webp',
        lvl: '18',
        controls: 'Rule switch'
    },
    {
        id: 'patternecho', title: 'Pattern Echo', color: '#06b6d4',
        desc: 'Watch a color chain, then replay it from memory as it grows.',
        image: '/arcade/pattern-echo.webp',
        lvl: '19',
        controls: 'Repeat color'
    },
    {
        id: 'nback', title: 'N-Back Tap', color: '#0f766e',
        desc: 'Compare the current symbol with the previous one under time pressure.',
        image: '/arcade/n-back-tap.webp',
        lvl: '20',
        controls: 'Match check'
    },
    {
        id: 'wordlink', title: 'Word Link', color: '#2563eb',
        desc: 'Pick the word that belongs with the active concept.',
        image: '/arcade/word-link.webp',
        lvl: '21',
        controls: 'Choose word'
    },
    {
        id: 'targettap', title: 'Target Tap', color: '#16a34a',
        desc: 'Find the requested target fast as the grid gets busier.',
        image: '/arcade/target-tap.webp',
        lvl: '22',
        controls: 'Tap target'
    },
    {
        id: 'sortsprint', title: 'Sort Sprint', color: '#ea580c',
        desc: 'Tap numbers from smallest to largest before the timer runs out.',
        image: '/arcade/sort-sprint.webp',
        lvl: '23',
        controls: 'Sort tap'
    },
    {
        id: 'shapecount', title: 'Shape Count', color: '#9333ea',
        desc: 'Count the requested shape while distractions increase.',
        image: '/arcade/shape-count.webp',
        lvl: '24',
        controls: 'Count answer'
    },
];

const getDifficulty = (level) => {
    const numericLevel = Number(level);
    if (numericLevel <= 4) return 'Easy';
    if (numericLevel <= 9) return 'Moderate';
    if (numericLevel <= 14) return 'Hard';
    return 'Expert';
};

const getPace = (level) => {
    if (level <= 2) return 'Slow';
    if (level <= 5) return 'Steady';
    if (level <= 9) return 'Fast';
    if (level <= 14) return 'Rush';
    return 'Max';
};

const clampLevel = (level) => Math.min(20, Math.max(1, level));

const WORD_BANK = [
    'focus', 'plan', 'read', 'calm', 'build', 'logic', 'study', 'draft', 'solve', 'learn', 'review', 'create',
    'memory', 'recall', 'reason', 'system', 'method', 'design', 'pattern', 'signal', 'matrix', 'vector', 'cipher', 'syntax',
    'branch', 'commit', 'kernel', 'module', 'object', 'script', 'canvas', 'motion', 'cursor', 'layout', 'server', 'client',
    'energy', 'balance', 'habit', 'vision', 'strategy', 'practice', 'concept', 'process', 'insight', 'analysis', 'growth', 'clarity',
    'number', 'formula', 'angle', 'radius', 'factor', 'series', 'graph', 'proof', 'domain', 'range', 'ratio', 'limit',
    'planet', 'orbit', 'rocket', 'signal', 'meteor', 'comet', 'nebula', 'galaxy', 'fusion', 'plasma', 'quantum', 'gravity',
    'forest', 'river', 'summit', 'valley', 'harbor', 'island', 'desert', 'meadow', 'thunder', 'breeze', 'winter', 'summer',
    'artist', 'canvas', 'rhythm', 'melody', 'studio', 'poetry', 'novel', 'theory', 'lesson', 'mentor', 'school', 'library',
    'anchor', 'beacon', 'bridge', 'engine', 'compass', 'ladder', 'window', 'button', 'pencil', 'camera', 'silver', 'garden',
];

const WORD_GROUPS = [
    { prompt: 'Focus', answer: 'attention', options: ['attention', 'banana', 'river', 'window'] },
    { prompt: 'Math', answer: 'number', options: ['number', 'cloud', 'paper', 'music'] },
    { prompt: 'Plan', answer: 'schedule', options: ['schedule', 'circle', 'forest', 'silver'] },
    { prompt: 'Memory', answer: 'recall', options: ['recall', 'pencil', 'planet', 'button'] },
    { prompt: 'Logic', answer: 'reason', options: ['reason', 'carpet', 'camera', 'garden'] },
    { prompt: 'Code', answer: 'syntax', options: ['syntax', 'ocean', 'marble', 'violin'] },
    { prompt: 'Space', answer: 'orbit', options: ['orbit', 'ladder', 'coffee', 'needle'] },
    { prompt: 'Music', answer: 'rhythm', options: ['rhythm', 'valley', 'engine', 'mirror'] },
    { prompt: 'Design', answer: 'layout', options: ['layout', 'meteor', 'branch', 'pepper'] },
    { prompt: 'Science', answer: 'theory', options: ['theory', 'button', 'harbor', 'fabric'] },
    { prompt: 'Health', answer: 'balance', options: ['balance', 'syntax', 'rocket', 'garden'] },
    { prompt: 'Learning', answer: 'practice', options: ['practice', 'silver', 'planet', 'camera'] },
    { prompt: 'Strategy', answer: 'method', options: ['method', 'meadow', 'plasma', 'needle'] },
    { prompt: 'Geometry', answer: 'angle', options: ['angle', 'studio', 'winter', 'anchor'] },
    { prompt: 'Algebra', answer: 'factor', options: ['factor', 'breeze', 'poetry', 'button'] },
    { prompt: 'Writing', answer: 'draft', options: ['draft', 'orbit', 'valley', 'silver'] },
    { prompt: 'Reading', answer: 'novel', options: ['novel', 'kernel', 'desert', 'ladder'] },
    { prompt: 'Navigation', answer: 'compass', options: ['compass', 'series', 'syntax', 'planet'] },
    { prompt: 'Web', answer: 'client', options: ['client', 'thunder', 'meadow', 'radius'] },
    { prompt: 'Server', answer: 'module', options: ['module', 'forest', 'melody', 'window'] },
    { prompt: 'Astronomy', answer: 'galaxy', options: ['galaxy', 'bridge', 'lesson', 'ratio'] },
    { prompt: 'Physics', answer: 'gravity', options: ['gravity', 'harbor', 'object', 'summer'] },
    { prompt: 'Creativity', answer: 'artist', options: ['artist', 'domain', 'engine', 'winter'] },
    { prompt: 'Data', answer: 'vector', options: ['vector', 'river', 'camera', 'garden'] },
    { prompt: 'Security', answer: 'cipher', options: ['cipher', 'studio', 'summit', 'lesson'] },
    { prompt: 'Interface', answer: 'cursor', options: ['cursor', 'plasma', 'breeze', 'novel'] },
    { prompt: 'Growth', answer: 'habit', options: ['habit', 'comet', 'syntax', 'bridge'] },
    { prompt: 'Clarity', answer: 'insight', options: ['insight', 'rocket', 'pencil', 'ratio'] },
    { prompt: 'Research', answer: 'analysis', options: ['analysis', 'harbor', 'fabric', 'orbit'] },
    { prompt: 'Commit', answer: 'branch', options: ['branch', 'forest', 'camera', 'melody'] },
    { prompt: 'Equation', answer: 'formula', options: ['formula', 'garden', 'anchor', 'studio'] },
    { prompt: 'Library', answer: 'lesson', options: ['lesson', 'meteor', 'radius', 'engine'] },
];

const playArcadeSound = (type = 'tap') => {
    if (typeof window === 'undefined') return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audio = window.__arcadeAudioContext || new AudioContext();
    window.__arcadeAudioContext = audio;
    if (audio.state === 'suspended') audio.resume?.();

    const now = audio.currentTime;
    const gain = audio.createGain();
    const osc = audio.createOscillator();
    const tones = {
        tap: [360, 0.045, 'sine', 0.025],
        start: [260, 0.08, 'triangle', 0.04],
        correct: [620, 0.1, 'sine', 0.045],
        level: [880, 0.14, 'triangle', 0.055],
        fail: [140, 0.18, 'sawtooth', 0.04],
        fire: [520, 0.055, 'square', 0.025],
    };
    const [frequency, duration, wave, volume] = tones[type] || tones.tap;

    osc.type = wave;
    osc.frequency.setValueAtTime(frequency, now);
    if (type === 'level') osc.frequency.exponentialRampToValueAtTime(frequency * 1.45, now + duration);
    if (type === 'fail') osc.frequency.exponentialRampToValueAtTime(Math.max(60, frequency * 0.55), now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
};

const Arcade = () => {
    const [activeGame, setActiveGame] = useState(null);
    const orderedGames = [...games].sort((a, b) => Number(a.lvl) - Number(b.lvl));

    useEffect(() => {
        document.body.classList.toggle('arcade-open', Boolean(activeGame));

        return () => {
            document.body.classList.remove('arcade-open');
        };
    }, [activeGame]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <div className="mb-8 border-b border-slate-200 pb-8 dark:border-white/10">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-300">Practice Lab</p>
                <h2 className="mb-3 font-serif text-3xl font-bold text-slate-950 dark:text-white md:text-5xl">Learning Games</h2>
                <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">Short practice drills arranged from easy warmups to expert focus challenges.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orderedGames.map((game) => (
                    <div
                        key={game.id}
                        className="group flex overflow-hidden rounded-lg border border-white/70 bg-white/75 shadow-sm backdrop-blur-xl transition-colors hover:border-emerald-300 hover:bg-emerald-50/70 dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-emerald-300/40 dark:hover:bg-emerald-400/10"
                    >
                        <div className="relative h-auto w-28 shrink-0 overflow-hidden border-r border-slate-200 dark:border-white/10 sm:w-36">
                            <img
                                src={game.image}
                                alt={game.title}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="flex min-h-44 flex-1 flex-col p-5">
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-serif text-xl font-bold text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">{game.title}</h3>
                                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{getDifficulty(game.lvl)} // {game.controls}</p>
                                </div>
                                <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                    LVL {game.lvl}
                                </span>
                            </div>
                            <p className="mb-5 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{game.desc}</p>
                            <button
                                type="button"
                                onClick={() => setActiveGame(game)}
                                className="rounded-md bg-emerald-500 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950"
                            >
                                Play
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {activeGame && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-md md:p-6"
                    >
                        <motion.div
                            className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-white/20 dark:bg-slate-950 md:h-auto md:max-h-[86vh] md:max-w-5xl"
                        >
                            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-900">
                                <div>
                                    <h3 className="flex items-center gap-3 font-serif text-xl font-bold text-slate-950 dark:text-white">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" /> {activeGame.title}
                                    </h3>
                                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{activeGame.controls}</p>
                                </div>
                                <button type="button" onClick={() => setActiveGame(null)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Close simulation"><X className="h-5 w-5" /></button>
                            </div>
                            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
                                <GameEngine gameId={activeGame.id} color={activeGame.color} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileControls = ({ gameId, onKey }) => {
    const showFire = gameId === 'invaders';

    return (
        <div className="flex w-full shrink-0 items-end justify-between px-4 pb-6 pt-3 md:hidden">
            <div className="grid grid-cols-3 gap-2">
                <div></div>
                <button type="button" onPointerDown={() => onKey('ArrowUp')} className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-200 active:bg-emerald-300 dark:bg-white/10"><ChevronUp /></button>
                <div></div>
                <button type="button" onPointerDown={() => onKey('ArrowLeft')} className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-200 active:bg-emerald-300 dark:bg-white/10"><ChevronLeft /></button>
                <button type="button" onPointerDown={() => onKey('ArrowDown')} className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-200 active:bg-emerald-300 dark:bg-white/10"><ChevronDown /></button>
                <button type="button" onPointerDown={() => onKey('ArrowRight')} className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-200 active:bg-emerald-300 dark:bg-white/10"><ChevronRight /></button>
            </div>

            {showFire && (
                <button type="button" onPointerDown={() => onKey('Space')} className="flex h-16 w-16 items-center justify-center rounded-md border border-emerald-500/50 bg-emerald-500/20 text-xs font-bold uppercase tracking-widest text-emerald-700 active:bg-emerald-500 active:text-white dark:text-emerald-300">
                    Fire
                </button>
            )}
        </div>
    );
};

const GameEngine = ({ gameId, color }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('INIT');
    const [level, setLevel] = useState(1);
    const [memoryCards, setMemoryCards] = useState([]);
    const quickGames = ['reaction', 'equation', 'color', 'sequence', 'wordvault', 'focusgrid', 'priority', 'switchshift', 'oddone', 'pairsum', 'logicgate', 'numberspan', 'patternecho', 'nback', 'wordlink', 'targettap', 'sortsprint', 'shapecount'];

    // --- CANVAS ENGINE ---
    useEffect(() => {
        if (gameId === 'memory' || quickGames.includes(gameId)) return;

        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let frameId;
        let lastPaint = 0;
        const frameInterval = 1000 / 45;

        const width = 600; const height = 400;
        canvas.width = width;
        canvas.height = height;

        let frames = 0, pScore = 0, pLevel = 1;

        // ENTITY STATE
        // Slower initial speeds
        let snake = [{ x: 15, y: 10 }], food = { x: 20, y: 10 }, dx = 0, dy = 0;
        let ball = { x: width / 2, y: height / 2, dx: 0, dy: 0, r: 6 }, p1 = { y: 160, h: 80 }, p2 = { y: 160, h: 80 };
        let paddle = { x: 250, w: 100 }, bricks = [];
        let invaders = [], bullets = [], pX = 280, invDir = 1;
        let words = []; const wordList = WORD_BANK.map((word) => word.toUpperCase());

        const initBricks = () => { bricks = []; for (let c = 0; c < 8; c++) for (let r = 0; r < 4; r++) bricks.push({ x: c * 70 + 20, y: r * 20 + 30, s: 1 }); };
        const initInvaders = () => { invaders = []; for (let c = 0; c < 8; c++) for (let r = 0; r < 3; r++) invaders.push({ x: c * 50 + 50, y: r * 30 + 30, w: 20, h: 15, a: true }); };
        const applyLevel = (nextLevel) => {
            pLevel = clampLevel(nextLevel);
            setLevel(pLevel);
            playArcadeSound('level');

            if (gameId === 'pong' && ball.dx !== 0) {
                const speed = Math.min(8.4, 2.2 + pLevel * 0.34);
                ball.dx = Math.sign(ball.dx) * speed;
                ball.dy = Math.sign(ball.dy || 1) * speed;
            }
            if (gameId === 'breakout') {
                const speed = Math.min(8.2, 2.2 + pLevel * 0.3);
                ball.dx = Math.sign(ball.dx || 1) * speed;
                ball.dy = -Math.abs(speed);
                paddle.w = Math.max(42, 116 - pLevel * 5);
            }
            if (gameId === 'invaders') {
                invaders.forEach((target) => {
                    target.y = Math.min(target.y + 3, 320);
                });
            }
        };

        const reset = () => {
            pScore = 0; frames = 0; setScore(0); pLevel = 1; setLevel(1);
            playArcadeSound('start');
            if (gameId === 'snake') { snake = [{ x: 15, y: 10 }]; dx = 1; dy = 0; }
            if (gameId === 'pong') { ball = { x: 300, y: 200, dx: 2.2, dy: 2.2, r: 6 }; }
            if (gameId === 'breakout') { paddle = { x: 250, w: 110 }; ball = { x: 300, y: 350, dx: 2.2, dy: -2.2, r: 6 }; initBricks(); }
            if (gameId === 'invaders') { pX = 280; bullets = []; initInvaders(); }
            if (gameId === 'typer') { words = []; }
        };

        const render = (timestamp = 0) => {
            frameId = requestAnimationFrame(render);
            if (gameState !== 'PLAYING') return;
            if (timestamp - lastPaint < frameInterval) return;
            lastPaint = timestamp;

            // Clear
            ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, width, height);
            frames++;

            // === SNAKE ===
            if (gameId === 'snake') {
                // Slower Snake: Move every 8 frames initially, gets faster
                const speed = Math.max(2, 13 - pLevel);
                if (frames % speed === 0) {
                    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
                    // Wall Wrap or Death? Let's do Death for 'Pit'
                    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 20 || snake.some(s => s.x === head.x && s.y === head.y)) { playArcadeSound('fail'); setGameState('GAMEOVER'); return; }
                    snake.unshift(head);
                    if (head.x === food.x && head.y === food.y) {
                        pScore += 10; setScore(pScore);
                        playArcadeSound('correct');
                        if (pScore % 20 === 0) applyLevel(pLevel + 1);
                        food = { x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 20) };
                    }
                    else snake.pop();
                }
                ctx.fillStyle = '#22c55e'; snake.forEach(s => ctx.fillRect(s.x * 20, s.y * 20, 18, 18));
                ctx.fillStyle = '#f97316'; ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
            }

            // === PONG ===
            if (gameId === 'pong') {
                ball.x += ball.dx; ball.y += ball.dy;
                if (ball.y < 0 || ball.y > height) ball.dy = -ball.dy;
                // Paddles
                if (ball.x < 20 && ball.y > p1.y && ball.y < p1.y + p1.h) { ball.dx = Math.abs(ball.dx); playArcadeSound('tap'); }
                if (ball.x > width - 20 && ball.y > p2.y && ball.y < p2.y + p2.h) ball.dx = -Math.abs(ball.dx);
                // Score
                if (ball.x < 0 || ball.x > width) { playArcadeSound('fail'); setGameState('GAMEOVER'); return; }
                // AI
                const targetY = ball.y - p2.h / 2;
                p2.y += (targetY - p2.y) * (0.05 + (pLevel * 0.01)); // AI gets smarter with level

                ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(10, p1.y, 10, p1.h); ctx.fillRect(width - 20, p2.y, 10, p2.h);
                if (frames % 200 === 0) {
                    pScore += 10; setScore(pScore);
                    const nextLevel = Math.floor(pScore / 20) + 1;
                    if (nextLevel > pLevel) applyLevel(nextLevel);
                }
            }

            // === BREAKOUT ===
            if (gameId === 'breakout') {
                ball.x += ball.dx; ball.y += ball.dy;
                if (ball.x < 0 || ball.x > width) ball.dx = -ball.dx;
                if (ball.y < 0) ball.dy = -ball.dy;
                if (ball.y > height) { playArcadeSound('fail'); setGameState('GAMEOVER'); return; }
                if (ball.y > 375 && ball.x > paddle.x && ball.x < paddle.x + paddle.w) { ball.dy = -Math.abs(ball.dy); playArcadeSound('tap'); }

                bricks.forEach(b => {
                    if (b.s) {
                        if (ball.x > b.x && ball.x < b.x + 60 && ball.y > b.y && ball.y < b.y + 20) {
                            ball.dy = -ball.dy; b.s = 0; pScore += 10; setScore(pScore); playArcadeSound('correct');
                            if (pScore % 40 === 0) {
                                applyLevel(pLevel + 1);
                                initBricks();
                            }
                        }
                        ctx.fillStyle = color; ctx.fillRect(b.x, b.y, 60, 15);
                    }
                });
                ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#3b82f6'; ctx.fillRect(paddle.x, 380, paddle.w, 10);
            }

            // === INVADERS ===
            if (gameId === 'invaders') {
                ctx.fillStyle = '#22c55e'; ctx.fillRect(pX, 380, 30, 20);
                bullets.forEach((b, i) => { b.y -= 8; ctx.fillStyle = 'white'; ctx.fillRect(b.x, b.y, 2, 8); if (b.y < 0) bullets.splice(i, 1); });

                // Move invaders slower: every 60 frames -> 50 -> 40 based on level
                const moveRate = Math.max(18, 90 - (pLevel * 6));
                if (frames % moveRate === 0) {
                    let edge = false; invaders.forEach(t => { if (t.a) { t.x += 10 * invDir; if (t.x > width - 30 || t.x < 10) edge = true; } });
                    if (edge) { invDir *= -1; invaders.forEach(t => t.y += 20); }
                }

                invaders.forEach(t => {
                    if (t.a) {
                        ctx.fillStyle = '#eab308'; ctx.fillRect(t.x, t.y, 20, 15);
                        if (t.y > 350) { playArcadeSound('fail'); setGameState('GAMEOVER'); }
                        bullets.forEach((b, bi) => {
                            if (b.x > t.x && b.x < t.x + 20 && b.y > t.y && b.y < t.y + 15) {
                                t.a = false; bullets.splice(bi, 1); pScore += 20; setScore(pScore); playArcadeSound('correct');
                                if (invaders.every(i => !i.a)) { applyLevel(pLevel + 1); initInvaders(); }
                            }
                        });
                    }
                });
            }

            // === TYPER ===
            if (gameId === 'typer') {
                // Slower spawn: 100 frames initially
                const spawnRate = Math.max(12, 128 - (pLevel * 6));
                if (frames % spawnRate === 0) words.push({ t: wordList[Math.floor(Math.random() * wordList.length)], x: Math.random() * (width - 100), y: 0 });

                words.forEach(w => {
                    w.y += (0.35 + (pLevel * 0.16));
                    ctx.fillStyle = '#06b6d4'; ctx.font = '20px monospace'; ctx.fillText(w.t, w.x, w.y);
                    if (w.y > height) { playArcadeSound('fail'); setGameState('GAMEOVER'); }
                });
            }

        };

        if (gameState === 'PLAYING') { reset(); render(); }

        const handleKey = (e) => {
            // Prevent scrolling
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].indexOf(e.code) > -1) {
                e.preventDefault?.();
            }

            if (gameId === 'snake') {
                if (e.code === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
                if (e.code === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
                if (e.code === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
                if (e.code === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
            }
            if (gameId === 'pong') {
                if (e.code === 'ArrowUp') p1.y = Math.max(0, p1.y - 30);
                if (e.code === 'ArrowDown') p1.y = Math.min(height - 80, p1.y + 30);
            }
            if (gameId === 'breakout' || gameId === 'invaders') {
                if (e.code === 'ArrowLeft') { if (gameId === 'breakout') paddle.x = Math.max(0, paddle.x - 30); else pX = Math.max(0, pX - 20); }
                if (e.code === 'ArrowRight') { if (gameId === 'breakout') paddle.x = Math.min(width - paddle.w, paddle.x + 30); else pX = Math.min(width - 30, pX + 20); }
            }
            if (gameId === 'invaders' && e.code === 'Space') {
                bullets.push({ x: pX + 14, y: 380 });
                playArcadeSound('fire');
            }
            if (gameId === 'typer') {
                const k = e.key.toUpperCase();
                const idx = words.findIndex(w => w.t.startsWith(k));
                if (idx !== -1) {
                    words[idx].t = words[idx].t.substring(1);
                    if (!words[idx].t) {
                        words.splice(idx, 1); pScore += 10; setScore(pScore);
                        playArcadeSound('correct');
                        if (pScore % 20 === 0) applyLevel(pLevel + 1);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKey);

        // Listen for dispatched events from Mobile Controls
        const handleDispatch = (e) => handleKey(e.detail);
        const handleLevelShift = () => applyLevel(pLevel + 1);
        window.addEventListener('activeGameKey', handleDispatch);
        window.addEventListener('activeGameLevelUp', handleLevelShift);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('activeGameKey', handleDispatch);
            window.removeEventListener('activeGameLevelUp', handleLevelShift);
        };

    }, [gameId, gameState]);

    // --- MEMORY ENGINE ---
    const buildMemoryDeck = (nextLevel = level) => {
        const icons = ['AI', 'JS', 'DB', 'UX', 'GO', 'PY', 'OS', 'UI'];
        const pairCount = Math.min(4 + Math.floor(nextLevel / 2), icons.length);
        return [...icons.slice(0, pairCount), ...icons.slice(0, pairCount)]
            .sort(() => Math.random() - 0.5)
            .map((poly, i) => ({ id: i, icon: poly, flipped: false, solved: false }));
    };

    const startMemoryGame = () => {
        playArcadeSound('start');
        setScore(0);
        setLevel(1);
        setMemoryCards(buildMemoryDeck(1));
        setGameState('PLAYING');
    };

    const shiftMemoryLevel = () => {
        const next = clampLevel(level + 1);
        playArcadeSound('level');
        setLevel(next);
        setMemoryCards(buildMemoryDeck(next));
    };

    const handleCardClick = (id) => {
        if (gameState !== 'PLAYING') return;
        const newD = [...memoryCards];
        const card = newD.find(c => c.id === id);
        if (card.flipped || card.solved) return;

        card.flipped = true; setMemoryCards(newD);

        const active = newD.filter(c => c.flipped && !c.solved);
        if (active.length === 2) {
            if (active[0].icon === active[1].icon) {
                active.forEach(c => c.solved = true); setScore(s => s + 20); playArcadeSound('correct');
                if (newD.every(c => c.solved)) {
                    setTimeout(() => {
                        const next = clampLevel(level + 1);
                        playArcadeSound('level');
                        setLevel(next);
                        setMemoryCards(buildMemoryDeck(next));
                    }, 500);
                }
            } else {
                playArcadeSound('fail');
                setTimeout(() => {
                    active.forEach(c => c.flipped = false);
                    setMemoryCards([...newD]);
                }, 600);
            }
        }
    };

    const triggerKey = (code, key) => {
        playArcadeSound(code === 'Space' ? 'fire' : 'tap');
        const event = new CustomEvent('activeGameKey', { detail: { code, key: key || code } });
        window.dispatchEvent(event);
    };

    const triggerLevelUp = () => {
        playArcadeSound('level');
        window.dispatchEvent(new CustomEvent('activeGameLevelUp'));
    };

    if (gameId === 'memory') {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
                {gameState === 'PLAYING' ? (
                    <>
                    <div className="mb-4 flex w-full max-w-md justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <span>Score {score}</span>
                        <span>Level {level}</span>
                        <span>Pace {getPace(level)}</span>
                        <button type="button" onClick={shiftMemoryLevel} className="rounded border border-emerald-200 px-2 py-1 text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-400/20 dark:text-emerald-300 dark:hover:bg-emerald-400/10">
                            Level +
                        </button>
                    </div>
                    <div className={`grid gap-3 ${memoryCards.length > 12 ? 'grid-cols-4' : 'grid-cols-4'}`}>
                        {memoryCards.map(c => (
                            <button key={c.id} type="button" onClick={() => handleCardClick(c.id)} className={`flex h-16 w-16 items-center justify-center rounded-md border text-lg font-bold transition-colors ${c.flipped || c.solved ? 'border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-300' : 'border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400'}`}>
                                {(c.flipped || c.solved) ? c.icon : '?'}
                            </button>
                        ))}
                    </div>
                    </>
                ) : <Overlay gameState={gameState} score={score} onStart={startMemoryGame} />}
            </div>
        );
    }

    if (quickGames.includes(gameId)) {
        return <QuickGame gameId={gameId} color={color} />;
    }

    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center">
            <div className="flex w-full max-w-[600px] justify-between px-3 pt-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span>Score {score}</span>
                <span>Level {level}</span>
                <span>Pace {getPace(level)}</span>
                {gameState === 'PLAYING' && (
                    <button type="button" onClick={triggerLevelUp} className="rounded border border-emerald-200 px-2 py-1 text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-400/20 dark:text-emerald-300 dark:hover:bg-emerald-400/10">
                        Level +
                    </button>
                )}
            </div>
            <div className="flex w-full flex-1 items-center justify-center px-2">
                <canvas ref={canvasRef} className="aspect-[3/2] w-full max-w-[600px] rounded-md border border-slate-200 bg-slate-950 shadow-2xl dark:border-white/10" style={{ imageRendering: 'pixelated' }} />
                {gameState !== 'PLAYING' && <Overlay gameState={gameState} score={score} onStart={() => setGameState('PLAYING')} />}
            </div>

            {gameState === 'PLAYING' && (
                <MobileControls gameId={gameId} onKey={triggerKey} />
            )}
        </div>
    );
};

const QuickGame = ({ gameId, color }) => {
    const [gameState, setGameState] = useState('INIT');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [round, setRound] = useState(null);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);
    const startedAtRef = useRef(0);
    const sequenceRef = useRef([]);
    const inputRef = useRef([]);
    const wordBank = WORD_BANK;
    const colorChoices = [
        { name: 'Red', value: '#ef4444' },
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Green', value: '#22c55e' },
        { name: 'Purple', value: '#a855f7' },
    ];
    const shapeChoices = ['◆', '●', '▲', '■'];

    const clearTimers = () => {
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
    };

    const roundSeconds = (base, nextLevel = level, min = 2) => Math.max(min, base - Math.floor((nextLevel - 1) / 2));
    const memorySeconds = (base, nextLevel = level, min = 1.4) => Math.max(min, base - Math.floor((nextLevel - 1) / 3));

    const makeEquation = (nextLevel = level) => {
        const max = 8 + nextLevel * 4;
        const a = Math.ceil(Math.random() * max);
        const b = Math.ceil(Math.random() * max);
        const op = Math.random() > 0.45 ? '+' : '-';
        const answer = op === '+' ? a + b : Math.max(a, b) - Math.min(a, b);
        const prompt = op === '+' ? `${a} + ${b}` : `${Math.max(a, b)} - ${Math.min(a, b)}`;
        const options = new Set([answer]);
        while (options.size < 4) options.add(Math.max(0, answer + Math.floor(Math.random() * 13) - 6));
        return { prompt, answer, options: [...options].sort(() => Math.random() - 0.5), time: roundSeconds(10, nextLevel, 4) };
    };

    const makeColorRound = (nextLevel = level) => {
        const colors = [
            { name: 'Red', value: '#ef4444' },
            { name: 'Blue', value: '#3b82f6' },
            { name: 'Green', value: '#22c55e' },
            { name: 'Yellow', value: '#eab308' },
            { name: 'Purple', value: '#a855f7' },
            { name: 'Cyan', value: '#06b6d4' },
        ];
        const text = colors[Math.floor(Math.random() * colors.length)];
        const ink = colors[Math.floor(Math.random() * colors.length)];
        return { prompt: text.name, answer: ink.name, ink: ink.value, options: colors.slice(0, Math.min(4 + Math.floor(nextLevel / 3), colors.length)).sort(() => Math.random() - 0.5), time: roundSeconds(9, nextLevel, 3) };
    };

    const makeSequence = (nextLevel = level) => {
        const length = Math.min(3 + nextLevel, 12);
        sequenceRef.current = Array.from({ length }, () => Math.ceil(Math.random() * 6));
        inputRef.current = [];
        return { showing: true, sequence: sequenceRef.current, time: memorySeconds(5 + Math.ceil(length * 0.35), nextLevel, 2) };
    };

    const makeWordVault = (nextLevel = level) => {
        const count = Math.min(3 + Math.floor(nextLevel / 2), 11);
        const words = [...wordBank].sort(() => Math.random() - 0.5).slice(0, count);
        const askKnown = Math.random() > 0.35;
        const outsiders = wordBank.filter((word) => !words.includes(word));
        const target = askKnown ? words[Math.floor(Math.random() * words.length)] : outsiders[Math.floor(Math.random() * outsiders.length)];
        return { showing: true, words, target, answer: askKnown, time: memorySeconds(5 + Math.ceil(count * 0.45), nextLevel, 1.6) };
    };

    const makeFocusGrid = (nextLevel = level) => {
        const size = Math.min(9 + nextLevel, 30);
        const cells = Array.from({ length: size }, (_, index) => index + 1).sort(() => Math.random() - 0.5);
        return { cells, next: 1, size, time: roundSeconds(18, nextLevel, 7) };
    };

    const makePriority = (nextLevel = level) => {
        const tasks = ['Read', 'Revise', 'Plan', 'Solve', 'Draft', 'Review', 'Build', 'Practice'];
        const values = Array.from({ length: 9 + nextLevel }, (_, index) => index + 1).sort(() => Math.random() - 0.5);
        const options = tasks
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((label, index) => ({ label, value: values[index] }))
            .sort(() => Math.random() - 0.5);
        const answer = options.reduce((best, item) => item.value < best.value ? item : best, options[0]);
        return { options, answer: answer.label, time: roundSeconds(12, nextLevel, 4) };
    };

    const makeSwitchShift = (nextLevel = level) => {
        const rule = Math.random() > 0.5 ? 'largest number' : 'green item';
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        const options = colorChoices.map((colorItem, index) => ({ ...colorItem, number: numbers[index] }));
        const answer = rule === 'largest number'
            ? options.reduce((best, item) => item.number > best.number ? item : best, options[0]).name
            : 'Green';
        return { rule, options, answer, time: roundSeconds(9, nextLevel, 3) };
    };

    const makeOddOne = (nextLevel = level) => {
        const symbols = ['◆', '●', '▲', '■'];
        const baseSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const oddSymbol = symbols.find((symbol) => symbol !== baseSymbol);
        const oddIndex = Math.floor(Math.random() * 4);
        return {
            options: Array.from({ length: 4 }, (_, index) => ({
                id: index,
                symbol: index === oddIndex ? oddSymbol : baseSymbol,
            })),
            answer: oddIndex,
            time: roundSeconds(11, nextLevel, 4),
        };
    };

    const makePairSum = (nextLevel = level) => {
        const target = 8 + nextLevel * 2 + Math.ceil(Math.random() * 10);
        const first = Math.max(2, Math.floor(target / 2) - 1);
        const pair = [first, target - first];
        const extras = new Set(pair);
        while (extras.size < Math.min(8, 5 + Math.floor(nextLevel / 4))) extras.add(Math.ceil(Math.random() * (target + 6)));
        return { target, selected: [], options: [...extras].sort(() => Math.random() - 0.5), answer: pair.sort((a, b) => a - b).join('-'), time: roundSeconds(14, nextLevel, 5) };
    };

    const makeLogicGate = (nextLevel = level) => {
        const number = Math.ceil(Math.random() * 9);
        const colorItem = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        const rules = [
            { label: 'green and even', check: (item) => item.color === 'Green' && item.number % 2 === 0 },
            { label: 'red or above 5', check: (item) => item.color === 'Red' || item.number > 5 },
            { label: 'blue and below 6', check: (item) => item.color === 'Blue' && item.number < 6 },
            { label: 'purple or odd', check: (item) => item.color === 'Purple' || item.number % 2 === 1 },
        ];
        const rule = rules[Math.floor(Math.random() * rules.length)];
        const item = { color: colorItem.name, value: colorItem.value, number };
        return { item, rule: rule.label, answer: rule.check(item), time: roundSeconds(10, nextLevel, 3) };
    };

    const makeNumberSpan = (nextLevel = level) => {
        const length = Math.min(3 + Math.floor(nextLevel / 2), 12);
        sequenceRef.current = Array.from({ length }, () => Math.ceil(Math.random() * 9));
        inputRef.current = [];
        return { showing: true, sequence: sequenceRef.current, time: memorySeconds(5 + Math.ceil(length * 0.42), nextLevel, 2) };
    };

    const makePatternEcho = (nextLevel = level) => {
        const length = Math.min(3 + Math.floor(nextLevel / 2), 12);
        sequenceRef.current = Array.from({ length }, () => colorChoices[Math.floor(Math.random() * colorChoices.length)].name);
        inputRef.current = [];
        return { showing: true, sequence: sequenceRef.current, time: memorySeconds(5 + Math.ceil(length * 0.4), nextLevel, 2) };
    };

    const makeNBack = (nextLevel = level) => {
        const symbols = ['AI', 'JS', 'UX', 'DB', 'PY', 'GO'];
        const previous = symbols[Math.floor(Math.random() * symbols.length)];
        const shouldMatch = Math.random() > 0.5;
        const current = shouldMatch ? previous : symbols.filter((symbol) => symbol !== previous)[Math.floor(Math.random() * (symbols.length - 1))];
        return { previous, current, answer: shouldMatch, time: roundSeconds(9, nextLevel, 3) };
    };

    const makeWordLink = (nextLevel = level) => {
        const groups = WORD_GROUPS;
        const group = groups[Math.floor(Math.random() * groups.length)];
        return { ...group, options: group.options.sort(() => Math.random() - 0.5), time: roundSeconds(10, nextLevel, 3) };
    };

    const makeTargetTap = (nextLevel = level) => {
        const size = Math.min(9 + nextLevel, 36);
        const target = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        const targetIndex = Math.floor(Math.random() * size);
        return {
            target,
            cells: Array.from({ length: size }, (_, index) => ({
                id: index,
                color: index === targetIndex ? target : colorChoices.filter((item) => item.name !== target.name)[Math.floor(Math.random() * (colorChoices.length - 1))],
            })),
            answer: targetIndex,
            time: roundSeconds(12, nextLevel, 4),
        };
    };

    const makeSortSprint = (nextLevel = level) => {
        const count = Math.min(4 + Math.floor(nextLevel / 2), 12);
        const values = new Set();
        while (values.size < count) values.add(Math.ceil(Math.random() * (18 + nextLevel * 2)));
        const sorted = [...values].sort((a, b) => a - b);
        return { values: [...sorted].sort(() => Math.random() - 0.5), next: sorted[0], remaining: sorted, time: roundSeconds(15, nextLevel, 5) };
    };

    const makeShapeCount = (nextLevel = level) => {
        const size = Math.min(8 + nextLevel, 32);
        const target = shapeChoices[Math.floor(Math.random() * shapeChoices.length)];
        const cells = Array.from({ length: size }, () => shapeChoices[Math.floor(Math.random() * shapeChoices.length)]);
        const answer = cells.filter((shape) => shape === target).length;
        const options = new Set([answer]);
        while (options.size < 4) options.add(Math.max(0, answer + Math.floor(Math.random() * 5) - 2));
        return { target, cells, answer, options: [...options].sort(() => Math.random() - 0.5), time: roundSeconds(14, nextLevel, 5) };
    };

    const startReaction = (nextLevel = level) => {
        const maxWait = Math.max(650, 2200 - nextLevel * 130);
        const minWait = Math.max(450, 1100 - nextLevel * 70);
        setRound({ status: 'wait', message: 'Wait for green' });
        timeoutRef.current = setTimeout(() => {
            startedAtRef.current = performance.now();
            setRound({ status: 'go', message: 'Tap now' });
        }, minWait + Math.random() * (maxWait - minWait));
    };

    const createRound = (targetLevel) => {
        if (gameId === 'equation') return makeEquation(targetLevel);
        if (gameId === 'color') return makeColorRound(targetLevel);
        if (gameId === 'sequence') return makeSequence(targetLevel);
        if (gameId === 'wordvault') return makeWordVault(targetLevel);
        if (gameId === 'focusgrid') return makeFocusGrid(targetLevel);
        if (gameId === 'priority') return makePriority(targetLevel);
        if (gameId === 'switchshift') return makeSwitchShift(targetLevel);
        if (gameId === 'oddone') return makeOddOne(targetLevel);
        if (gameId === 'pairsum') return makePairSum(targetLevel);
        if (gameId === 'logicgate') return makeLogicGate(targetLevel);
        if (gameId === 'numberspan') return makeNumberSpan(targetLevel);
        if (gameId === 'patternecho') return makePatternEcho(targetLevel);
        if (gameId === 'nback') return makeNBack(targetLevel);
        if (gameId === 'wordlink') return makeWordLink(targetLevel);
        if (gameId === 'targettap') return makeTargetTap(targetLevel);
        if (gameId === 'sortsprint') return makeSortSprint(targetLevel);
        if (gameId === 'shapecount') return makeShapeCount(targetLevel);
        return null;
    };

    const startGame = () => {
        clearTimers();
        playArcadeSound('start');
        setScore(0);
        setLevel(1);
        setGameState('PLAYING');

        if (gameId === 'reaction') startReaction();
        else setRound(createRound(1));
    };

    useEffect(() => {
        if (gameState !== 'PLAYING' || !round) return undefined;

        if (round.time && !round.showing && gameId !== 'reaction') {
            intervalRef.current = setInterval(() => {
                setRound((current) => {
                    if (!current) return current;
                    if (current.time <= 1) {
                        clearTimers();
                        playArcadeSound('fail');
                        setGameState('GAMEOVER');
                        return current;
                    }
                    return { ...current, time: current.time - 1 };
                });
            }, 1000);
        }

        if (round.showing && ['sequence', 'wordvault', 'numberspan', 'patternecho'].includes(gameId)) {
            timeoutRef.current = setTimeout(() => {
                setRound((current) => current ? { ...current, showing: false } : current);
            }, round.time * 1000);
        }

        return clearTimers;
    }, [gameId, gameState, round?.prompt, round?.showing, round?.time]);

    useEffect(() => clearTimers, []);

    const failRound = () => {
        playArcadeSound('fail');
        setGameState('GAMEOVER');
    };

    const nextLevel = (points = 0, amount = 1) => {
        const next = clampLevel(level + amount);
        setScore((current) => current + points);
        setLevel(next);
        playArcadeSound(points > 0 ? 'correct' : 'level');
        return next;
    };

    const shiftQuickLevel = () => {
        const next = nextLevel(0);
        clearTimers();
        if (gameId === 'reaction') startReaction(next);
        else setRound(createRound(next));
    };

    const answerEquation = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(10);
        clearTimers();
        setRound(makeEquation(next));
    };

    const answerColor = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(12);
        clearTimers();
        setRound(makeColorRound(next));
    };

    const answerSequence = (value) => {
        inputRef.current = [...inputRef.current, value];
        const index = inputRef.current.length - 1;
        if (sequenceRef.current[index] !== value) {
            failRound();
            return;
        }
        if (inputRef.current.length === sequenceRef.current.length) {
            const next = nextLevel(15);
            setRound(makeSequence(next));
        } else {
            setRound((current) => current ? { ...current, entered: inputRef.current.length } : current);
        }
    };

    const answerWordVault = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(14);
        setRound(makeWordVault(next));
    };

    const answerFocusGrid = (value) => {
        if (value !== round.next) {
            failRound();
            return;
        }
        if (value === round.size) {
            const next = nextLevel(18);
            setRound(makeFocusGrid(next));
            return;
        }
        setRound((current) => current ? { ...current, next: current.next + 1 } : current);
    };

    const answerPriority = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(12);
        setRound(makePriority(next));
    };

    const answerSwitchShift = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(16);
        setRound(makeSwitchShift(next));
    };

    const answerOddOne = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(8);
        setRound(makeOddOne(next));
    };

    const answerPairSum = (value) => {
        const selected = round.selected.includes(value)
            ? round.selected.filter((item) => item !== value)
            : [...round.selected, value].slice(-2);

        if (selected.length < 2) {
            setRound((current) => current ? { ...current, selected } : current);
            return;
        }

        if (selected.sort((a, b) => a - b).join('-') !== round.answer) {
            failRound();
            return;
        }

        const next = nextLevel(13);
        setRound(makePairSum(next));
    };

    const answerLogicGate = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(14);
        setRound(makeLogicGate(next));
    };

    const answerNumberSpan = (value) => {
        inputRef.current = [...inputRef.current, value];
        const reversed = [...sequenceRef.current].reverse();
        const index = inputRef.current.length - 1;
        if (reversed[index] !== value) {
            failRound();
            return;
        }
        if (inputRef.current.length === reversed.length) {
            const next = nextLevel(18);
            setRound(makeNumberSpan(next));
        } else {
            setRound((current) => current ? { ...current, entered: inputRef.current.length } : current);
        }
    };

    const answerPatternEcho = (value) => {
        inputRef.current = [...inputRef.current, value];
        const index = inputRef.current.length - 1;
        if (sequenceRef.current[index] !== value) {
            failRound();
            return;
        }
        if (inputRef.current.length === sequenceRef.current.length) {
            const next = nextLevel(16);
            setRound(makePatternEcho(next));
        } else {
            setRound((current) => current ? { ...current, entered: inputRef.current.length } : current);
        }
    };

    const answerNBack = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(12);
        setRound(makeNBack(next));
    };

    const answerWordLink = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(12);
        setRound(makeWordLink(next));
    };

    const answerTargetTap = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(14);
        setRound(makeTargetTap(next));
    };

    const answerSortSprint = (value) => {
        if (value !== round.next) {
            failRound();
            return;
        }
        const remaining = round.remaining.slice(1);
        if (remaining.length === 0) {
            const next = nextLevel(16);
            setRound(makeSortSprint(next));
            return;
        }
        setRound((current) => current ? { ...current, next: remaining[0], remaining } : current);
    };

    const answerShapeCount = (value) => {
        if (value !== round.answer) {
            failRound();
            return;
        }
        const next = nextLevel(14);
        setRound(makeShapeCount(next));
    };

    const tapReaction = () => {
        if (round?.status === 'wait') {
            clearTimers();
            failRound();
            return;
        }
        if (round?.status !== 'go') return;

        const reaction = Math.round(performance.now() - startedAtRef.current);
        const points = Math.max(5, Math.round(35 - reaction / 20));
        const next = nextLevel(points);
        clearTimers();
        setRound({ status: 'result', message: `${reaction} ms`, reaction });
        timeoutRef.current = setTimeout(() => startReaction(next), Math.max(320, 850 - next * 45));
    };

    const isOverlayVisible = gameState !== 'PLAYING';

    return (
        <div className="relative flex h-full min-h-[420px] w-full flex-col items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
            <div className="mb-5 flex w-full max-w-xl justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span>Score {score}</span>
                <span>Level {level}</span>
                <span>Pace {getPace(level)}</span>
                {round?.time && !round.showing && <span>{round.time}s</span>}
                {gameState === 'PLAYING' && (
                    <button type="button" onClick={shiftQuickLevel} className="rounded border border-emerald-200 px-2 py-1 text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-400/20 dark:text-emerald-300 dark:hover:bg-emerald-400/10">
                        Level +
                    </button>
                )}
            </div>

            <div className="flex w-full max-w-xl flex-1 flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
                {gameId === 'reaction' && (
                    <button
                        type="button"
                        onClick={tapReaction}
                        className="flex aspect-square w-52 max-w-full flex-col items-center justify-center rounded-full border text-center transition-colors"
                        style={{ borderColor: color, backgroundColor: round?.status === 'go' ? color : 'rgba(148,163,184,0.14)' }}
                    >
                        <span className="font-serif text-3xl font-bold text-slate-950 dark:text-white">{round?.message || 'Ready?'}</span>
                        <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-300">No early taps</span>
                    </button>
                )}

                {gameId === 'equation' && round && (
                    <>
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{round.time}s left</div>
                        <div className="mb-6 font-serif text-5xl font-bold text-slate-950 dark:text-white">{round.prompt}</div>
                        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
                            {round.options.map((option) => (
                                <button key={option} type="button" onClick={() => answerEquation(option)} className="rounded-md border border-slate-200 bg-slate-50 py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {gameId === 'color' && round && (
                    <>
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{round.time}s left - choose ink color</div>
                        <div className="mb-6 font-serif text-5xl font-bold" style={{ color: round.ink }}>{round.prompt}</div>
                        <div className="grid w-full max-w-md grid-cols-2 gap-3">
                            {round.options.map((option) => (
                                <button key={option.name} type="button" onClick={() => answerColor(option.name)} className="rounded-md border border-slate-200 bg-white py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 dark:border-white/10 dark:bg-white/5 dark:text-white">
                                    {option.name}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {gameId === 'sequence' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            {round.showing ? 'Memorize' : `Entered ${round.entered || 0}/${sequenceRef.current.length}`}
                        </div>
                        {round.showing ? (
                            <div className="flex flex-wrap justify-center gap-2">
                                {round.sequence.map((value, index) => (
                                    <span key={`${value}-${index}`} className="flex h-12 w-12 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 font-bold text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                                        {value}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6].map((value) => (
                                    <button key={value} type="button" onClick={() => answerSequence(value)} className="flex h-14 w-14 items-center justify-center rounded-md border border-slate-200 bg-white font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                                        {value}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {gameId === 'wordvault' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            {round.showing ? 'Memorize these words' : 'Was this word in the vault?'}
                        </div>
                        {round.showing ? (
                            <div className="flex max-w-md flex-wrap justify-center gap-2">
                                {round.words.map((word) => (
                                    <span key={word} className="rounded-md border border-sky-200 bg-sky-50 px-4 py-3 font-bold uppercase tracking-widest text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
                                        {word}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 font-serif text-5xl font-bold capitalize text-slate-950 dark:text-white">{round.target}</div>
                                <div className="grid w-full max-w-sm grid-cols-2 gap-3">
                                    <button type="button" onClick={() => answerWordVault(true)} className="rounded-md border border-slate-200 bg-white py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">Yes</button>
                                    <button type="button" onClick={() => answerWordVault(false)} className="rounded-md border border-slate-200 bg-white py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">No</button>
                                </div>
                            </>
                        )}
                    </>
                )}

                {gameId === 'focusgrid' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Find {round.next}
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {round.cells.map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => answerFocusGrid(value)}
                                    className={`flex h-12 w-12 items-center justify-center rounded-md border font-bold transition-colors ${
                                        value < round.next
                                            ? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300'
                                            : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white'
                                    }`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {gameId === 'priority' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Pick the lowest urgency number
                        </div>
                        <div className="grid w-full max-w-md gap-3">
                            {round.options.map((task) => (
                                <button key={`${task.label}-${task.value}`} type="button" onClick={() => answerPriority(task.label)} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3 text-left transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5">
                                    <span className="font-bold text-slate-800 dark:text-white">{task.label}</span>
                                    <span className="rounded border border-amber-200 bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-300">{task.value}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {gameId === 'switchshift' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Rule: {round.rule}
                        </div>
                        <div className="grid w-full max-w-md grid-cols-2 gap-3">
                            {round.options.map((option) => (
                                <button key={option.name} type="button" onClick={() => answerSwitchShift(option.name)} className="rounded-md border border-slate-200 bg-white p-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5">
                                    <span className="mx-auto mb-2 block h-8 w-8 rounded-full" style={{ backgroundColor: option.value }} />
                                    <span className="block font-serif text-3xl font-bold text-slate-950 dark:text-white">{option.number}</span>
                                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {gameId === 'oddone' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Find the different shape
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {round.options.map((option) => (
                                <button key={option.id} type="button" onClick={() => answerOddOne(option.id)} className="flex h-24 w-24 items-center justify-center rounded-md border border-slate-200 bg-white text-5xl text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                                    {option.symbol}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {gameId === 'pairsum' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Make {round.target}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {round.options.map((value) => {
                                const selected = round.selected.includes(value);
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => answerPairSum(value)}
                                        className={`flex h-14 w-14 items-center justify-center rounded-md border font-bold transition-colors ${
                                            selected
                                                ? 'border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-300'
                                                : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white'
                                        }`}
                                    >
                                        {value}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}

                {gameId === 'logicgate' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Rule: {round.rule}
                        </div>
                        <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 px-8 py-6 dark:border-white/10 dark:bg-white/5">
                            <span className="mx-auto mb-3 block h-10 w-10 rounded-full" style={{ backgroundColor: round.item.value }} />
                            <div className="font-serif text-5xl font-bold text-slate-950 dark:text-white">{round.item.number}</div>
                            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{round.item.color}</div>
                        </div>
                        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
                            <button type="button" onClick={() => answerLogicGate(true)} className="rounded-md border border-slate-200 bg-white py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">Yes</button>
                            <button type="button" onClick={() => answerLogicGate(false)} className="rounded-md border border-slate-200 bg-white py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">No</button>
                        </div>
                    </>
                )}

                {gameId === 'numberspan' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            {round.showing ? 'Memorize' : `Reverse ${round.entered || 0}/${sequenceRef.current.length}`}
                        </div>
                        {round.showing ? (
                            <div className="flex flex-wrap justify-center gap-2">
                                {round.sequence.map((value, index) => (
                                    <span key={`${value}-${index}`} className="flex h-12 w-12 items-center justify-center rounded-md border border-violet-200 bg-violet-50 font-bold text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
                                        {value}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                                    <button key={value} type="button" onClick={() => answerNumberSpan(value)} className="flex h-14 w-14 items-center justify-center rounded-md border border-slate-200 bg-white font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                                        {value}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {gameId === 'patternecho' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            {round.showing ? 'Memorize colors' : `Echo ${round.entered || 0}/${sequenceRef.current.length}`}
                        </div>
                        {round.showing ? (
                            <div className="flex flex-wrap justify-center gap-2">
                                {round.sequence.map((name, index) => {
                                    const item = colorChoices.find((choice) => choice.name === name);
                                    return <span key={`${name}-${index}`} className="h-12 w-12 rounded-md border border-slate-200 dark:border-white/10" style={{ backgroundColor: item.value }} />;
                                })}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                {colorChoices.map((choice) => (
                                    <button key={choice.name} type="button" onClick={() => answerPatternEcho(choice.name)} className="flex h-16 w-28 items-center justify-center rounded-md border border-slate-200 font-bold text-white shadow-sm transition-transform active:scale-95 dark:border-white/10" style={{ backgroundColor: choice.value }}>
                                        {choice.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {gameId === 'nback' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Does current match previous?
                        </div>
                        <div className="mb-6 grid grid-cols-2 gap-3">
                            <div className="rounded-md border border-slate-200 bg-slate-50 px-7 py-5 dark:border-white/10 dark:bg-white/5">
                                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Previous</div>
                                <div className="mt-2 font-serif text-4xl font-bold text-slate-950 dark:text-white">{round.previous}</div>
                            </div>
                            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-7 py-5 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                                <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-700 dark:text-emerald-300">Current</div>
                                <div className="mt-2 font-serif text-4xl font-bold text-slate-950 dark:text-white">{round.current}</div>
                            </div>
                        </div>
                        <div className="grid w-full max-w-sm grid-cols-2 gap-3">
                            <button type="button" onClick={() => answerNBack(true)} className="rounded-md border border-slate-200 bg-white py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">Match</button>
                            <button type="button" onClick={() => answerNBack(false)} className="rounded-md border border-slate-200 bg-white py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">Different</button>
                        </div>
                    </>
                )}

                {gameId === 'wordlink' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Related to
                        </div>
                        <div className="mb-6 font-serif text-5xl font-bold text-slate-950 dark:text-white">{round.prompt}</div>
                        <div className="grid w-full max-w-md grid-cols-2 gap-3">
                            {round.options.map((option) => (
                                <button key={option} type="button" onClick={() => answerWordLink(option)} className="rounded-md border border-slate-200 bg-white py-4 font-bold capitalize text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {gameId === 'targettap' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Tap {round.target.name}
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            {round.cells.map((cell) => (
                                <button key={cell.id} type="button" onClick={() => answerTargetTap(cell.id)} className="h-10 w-10 rounded-md border border-slate-200 transition-transform active:scale-90 dark:border-white/10" style={{ backgroundColor: cell.color.value }} aria-label={cell.color.name} />
                            ))}
                        </div>
                    </>
                )}

                {gameId === 'sortsprint' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Next smallest: {round.next}
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {round.values.map((value) => {
                                const done = !round.remaining.includes(value);
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        disabled={done}
                                        onClick={() => answerSortSprint(value)}
                                        className={`flex h-14 w-14 items-center justify-center rounded-md border font-bold transition-colors ${
                                            done
                                                ? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300'
                                                : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white'
                                        }`}
                                    >
                                        {value}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}

                {gameId === 'shapecount' && round && (
                    <>
                        <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Count {round.target}
                        </div>
                        <div className="mb-6 grid grid-cols-5 gap-2">
                            {round.cells.map((shape, index) => (
                                <span key={`${shape}-${index}`} className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-2xl text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white">
                                    {shape}
                                </span>
                            ))}
                        </div>
                        <div className="grid w-full max-w-sm grid-cols-4 gap-3">
                            {round.options.map((option) => (
                                <button key={option} type="button" onClick={() => answerShapeCount(option)} className="rounded-md border border-slate-200 bg-white py-4 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5 dark:text-white">
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {isOverlayVisible && <Overlay gameState={gameState} score={score} onStart={startGame} />}
        </div>
    );
};

const Overlay = ({ gameState, score, onStart }) => (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/80 p-4 text-center backdrop-blur-sm">
        <h2 className={`font-serif text-3xl font-bold md:text-4xl ${gameState === 'GAMEOVER' ? 'text-red-500' : 'text-white'}`}>
            {gameState === 'GAMEOVER' ? 'Try Again' : gameState === 'WIN' ? 'Nice Work' : 'Ready?'}
        </h2>
        {gameState !== 'INIT' && <p className="font-mono text-sm uppercase tracking-widest text-slate-300">Score {score}</p>}
        <button type="button" onClick={onStart} className="flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-slate-950">
            <Play className="h-4 w-4" /> Start
        </button>
    </div>
);

export default Arcade;
