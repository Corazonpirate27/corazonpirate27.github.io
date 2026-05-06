import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Play, X } from 'lucide-react';

const games = [
    {
        id: 'snake', title: 'The Python Pit', color: '#22c55e',
        desc: 'Route the snake through a tighter grid as speed increases.',
        image: '/matrix_snake_banner.png',
        lvl: '04',
        controls: 'Arrow keys'
    },
    {
        id: 'pong', title: 'Ping Protocol', color: '#3b82f6',
        desc: 'Keep the packet alive while the opponent adapts.',
        image: '/matrix_pong_banner.png',
        lvl: '12',
        controls: 'Up / Down'
    },
    {
        id: 'memory', title: 'RAM Audit', color: '#a855f7',
        desc: 'Match memory blocks with fewer wasted clicks.',
        image: '/matrix_memory_banner.png',
        lvl: '08',
        controls: 'Tap cards'
    },
    {
        id: 'breakout', title: 'Firewall Breaker', color: '#ef4444',
        desc: 'Break the wall and keep the ball in bounds.',
        image: '/matrix_arcade_breakout.png',
        lvl: '02',
        controls: 'Left / Right'
    },
    {
        id: 'invaders', title: 'Botnet Defense', color: '#eab308',
        desc: 'Clear bot waves before they reach the perimeter.',
        image: '/matrix_arcade_invaders.png',
        lvl: '15',
        controls: 'Move + Fire'
    },
    {
        id: 'typer', title: 'DDoS Mitigator', color: '#06b6d4',
        desc: 'Type falling packets before they overload the stack.',
        image: '/matrix_arcade_typer.png',
        lvl: '20',
        controls: 'Keyboard'
    },
];

const Arcade = () => {
    const [activeGame, setActiveGame] = useState(null);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
            <div className="mb-8 border-b border-white/10 pb-8">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-root-green">Optimized Arcade</p>
                <h2 className="mb-3 font-serif text-3xl font-bold text-white md:text-5xl">Training Simulations</h2>
                <p className="max-w-2xl text-sm leading-6 text-gray-400 md:text-base">Stable canvas drills with cleaner controls, lighter cards, and mobile-friendly input.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="group flex overflow-hidden rounded-md border border-white/10 bg-[#080808]/95 transition-colors hover:border-root-green/50 hover:bg-white/[0.03]"
                    >
                        <div className="relative h-auto w-28 shrink-0 overflow-hidden border-r border-white/10 sm:w-36">
                            <img
                                src={game.image}
                                alt={game.title}
                                loading="lazy"
                                className="h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="flex min-h-44 flex-1 flex-col p-5">
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-serif text-xl font-bold text-white transition-colors group-hover:text-root-green">{game.title}</h3>
                                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-gray-500">{game.controls}</p>
                                </div>
                                <span className="rounded border border-root-green/25 bg-root-green/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-root-green">
                                    LVL {game.lvl}
                                </span>
                            </div>
                            <p className="mb-5 flex-1 text-sm leading-6 text-gray-400">{game.desc}</p>
                            <button
                                type="button"
                                onClick={() => setActiveGame(game)}
                                className="rounded-md bg-root-green px-4 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white"
                            >
                                Boot
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {activeGame && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-0 backdrop-blur-xl md:p-4"
                    >
                        <motion.div
                            className="relative flex h-full w-full flex-col overflow-hidden rounded-none border-0 bg-black md:h-auto md:max-h-[90vh] md:max-w-5xl md:rounded-md md:border md:border-root-green/20"
                        >
                            <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#050505] p-4">
                                <div>
                                    <h3 className="flex items-center gap-3 font-serif text-xl font-bold text-white">
                                        <span className="h-2 w-2 rounded-full bg-root-green" /> {activeGame.title}
                                    </h3>
                                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-gray-500">{activeGame.controls}</p>
                                </div>
                                <button type="button" onClick={() => setActiveGame(null)} className="rounded-md p-2 text-gray-500 hover:bg-white/10 hover:text-white" aria-label="Close simulation"><X className="h-5 w-5" /></button>
                            </div>
                            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-black">
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
                <button type="button" onPointerDown={() => onKey('ArrowUp')} className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 active:bg-root-green/50"><ChevronUp /></button>
                <div></div>
                <button type="button" onPointerDown={() => onKey('ArrowLeft')} className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 active:bg-root-green/50"><ChevronLeft /></button>
                <button type="button" onPointerDown={() => onKey('ArrowDown')} className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 active:bg-root-green/50"><ChevronDown /></button>
                <button type="button" onPointerDown={() => onKey('ArrowRight')} className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10 active:bg-root-green/50"><ChevronRight /></button>
            </div>

            {showFire && (
                <button type="button" onPointerDown={() => onKey('Space')} className="flex h-16 w-16 items-center justify-center rounded-md border border-red-500/50 bg-red-500/20 text-xs font-bold uppercase tracking-widest text-red-400 active:bg-red-500 active:text-black">
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

    // --- CANVAS ENGINE ---
    useEffect(() => {
        if (gameId === 'memory') return; // Memory is pure React

        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let frameId;

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
        let words = []; const wordList = ['ROOT', 'SUDO', 'VIM', 'NULL', 'BYTE', 'HASH', 'NODE', 'JAVA', 'REACT', 'VITE', 'CODE', 'DATA', 'LINK', 'Ping', 'Host'];

        const initBricks = () => { bricks = []; for (let c = 0; c < 8; c++) for (let r = 0; r < 4; r++) bricks.push({ x: c * 70 + 20, y: r * 20 + 30, s: 1 }); };
        const initInvaders = () => { invaders = []; for (let c = 0; c < 8; c++) for (let r = 0; r < 3; r++) invaders.push({ x: c * 50 + 50, y: r * 30 + 30, w: 20, h: 15, a: true }); };

        const reset = () => {
            pScore = 0; frames = 0; setScore(0); pLevel = 1; setLevel(1);
            if (gameId === 'snake') { snake = [{ x: 15, y: 10 }]; dx = 1; dy = 0; }
            if (gameId === 'pong') { ball = { x: 300, y: 200, dx: 3, dy: 3, r: 6 }; } // Slower Pong
            if (gameId === 'breakout') { paddle = { x: 250, w: 100 }; ball = { x: 300, y: 350, dx: 3, dy: -3, r: 6 }; initBricks(); } // Slower Breakout
            if (gameId === 'invaders') { pX = 280; bullets = []; initInvaders(); }
            if (gameId === 'typer') { words = []; }
        };

        const render = () => {
            if (gameState !== 'PLAYING') return;
            // Clear
            ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, width, height);
            frames++;

            // === SNAKE ===
            if (gameId === 'snake') {
                // Slower Snake: Move every 8 frames initially, gets faster
                const speed = Math.max(2, 10 - pLevel);
                if (frames % speed === 0) {
                    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
                    // Wall Wrap or Death? Let's do Death for 'Pit'
                    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 20 || snake.some(s => s.x === head.x && s.y === head.y)) { setGameState('GAMEOVER'); return; }
                    snake.unshift(head);
                    if (head.x === food.x && head.y === food.y) {
                        pScore += 10; setScore(pScore);
                        if (pScore % 50 === 0) { pLevel++; setLevel(pLevel); } // Level up every 50 pts
                        food = { x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 20) };
                    }
                    else snake.pop();
                }
                ctx.fillStyle = '#22c55e'; snake.forEach(s => ctx.fillRect(s.x * 20, s.y * 20, 18, 18));
                ctx.fillStyle = 'red'; ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
            }

            // === PONG ===
            if (gameId === 'pong') {
                ball.x += ball.dx; ball.y += ball.dy;
                if (ball.y < 0 || ball.y > height) ball.dy = -ball.dy;
                // Paddles
                if (ball.x < 20 && ball.y > p1.y && ball.y < p1.y + p1.h) ball.dx = Math.abs(ball.dx);
                if (ball.x > width - 20 && ball.y > p2.y && ball.y < p2.y + p2.h) ball.dx = -Math.abs(ball.dx);
                // Score
                if (ball.x < 0 || ball.x > width) { setGameState('GAMEOVER'); return; }
                // AI
                const targetY = ball.y - p2.h / 2;
                p2.y += (targetY - p2.y) * (0.05 + (pLevel * 0.01)); // AI gets smarter with level

                ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(10, p1.y, 10, p1.h); ctx.fillRect(width - 20, p2.y, 10, p2.h);
                if (frames % 200 === 0) { pScore += 10; setScore(pScore); pLevel = Math.min(10, Math.floor(pScore / 50) + 1); setLevel(pLevel); }
            }

            // === BREAKOUT ===
            if (gameId === 'breakout') {
                ball.x += ball.dx; ball.y += ball.dy;
                if (ball.x < 0 || ball.x > width) ball.dx = -ball.dx;
                if (ball.y < 0) ball.dy = -ball.dy;
                if (ball.y > height) { setGameState('GAMEOVER'); return; }
                if (ball.y > 375 && ball.x > paddle.x && ball.x < paddle.x + paddle.w) ball.dy = -Math.abs(ball.dy);

                bricks.forEach(b => {
                    if (b.s) {
                        if (ball.x > b.x && ball.x < b.x + 60 && ball.y > b.y && ball.y < b.y + 20) {
                            ball.dy = -ball.dy; b.s = 0; pScore += 10; setScore(pScore);
                            if (pScore % 80 === 0) { // Clear screen level up
                                pLevel++; setLevel(pLevel);
                                ball.dx *= 1.1; ball.dy *= 1.1; // Speed up
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
                ctx.fillStyle = '#00ff41'; ctx.fillRect(pX, 380, 30, 20);
                bullets.forEach((b, i) => { b.y -= 8; ctx.fillStyle = 'white'; ctx.fillRect(b.x, b.y, 2, 8); if (b.y < 0) bullets.splice(i, 1); });

                // Move invaders slower: every 60 frames -> 50 -> 40 based on level
                const moveRate = Math.max(20, 70 - (pLevel * 5));
                if (frames % moveRate === 0) {
                    let edge = false; invaders.forEach(t => { if (t.a) { t.x += 10 * invDir; if (t.x > width - 30 || t.x < 10) edge = true; } });
                    if (edge) { invDir *= -1; invaders.forEach(t => t.y += 20); }
                }

                invaders.forEach(t => {
                    if (t.a) {
                        ctx.fillStyle = '#eab308'; ctx.fillRect(t.x, t.y, 20, 15);
                        if (t.y > 350) setGameState('GAMEOVER');
                        bullets.forEach((b, bi) => {
                            if (b.x > t.x && b.x < t.x + 20 && b.y > t.y && b.y < t.y + 15) {
                                t.a = false; bullets.splice(bi, 1); pScore += 20; setScore(pScore);
                                if (invaders.every(i => !i.a)) { pLevel++; setLevel(pLevel); initInvaders(); }
                            }
                        });
                    }
                });
            }

            // === TYPER ===
            if (gameId === 'typer') {
                // Slower spawn: 100 frames initially
                const spawnRate = Math.max(30, 100 - (pLevel * 5));
                if (frames % spawnRate === 0) words.push({ t: wordList[Math.floor(Math.random() * wordList.length)], x: Math.random() * (width - 100), y: 0 });

                words.forEach(w => {
                    w.y += (0.5 + (pLevel * 0.1)); // Fall speed increases
                    ctx.fillStyle = '#06b6d4'; ctx.font = '20px monospace'; ctx.fillText(w.t, w.x, w.y);
                    if (w.y > height) setGameState('GAMEOVER');
                });
            }

            frameId = requestAnimationFrame(render);
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
            }
            if (gameId === 'typer') {
                const k = e.key.toUpperCase();
                const idx = words.findIndex(w => w.t.startsWith(k));
                if (idx !== -1) {
                    words[idx].t = words[idx].t.substring(1);
                    if (!words[idx].t) { words.splice(idx, 1); pScore += 10; setScore(pScore); }
                }
            }
        };

        window.addEventListener('keydown', handleKey);

        // Listen for dispatched events from Mobile Controls
        const handleDispatch = (e) => handleKey(e.detail);
        window.addEventListener('activeGameKey', handleDispatch);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('keydown', handleKey);
            window.removeEventListener('activeGameKey', handleDispatch);
        };

    }, [gameId, gameState]);

    // --- MEMORY ENGINE ---
    useEffect(() => {
        if (gameId !== 'memory' || gameState !== 'PLAYING') return;
        const icons = ['AI', 'JS', 'DB', 'UX', 'GO', 'PY', 'OS', 'UI'];
        const deck = [...icons, ...icons].sort(() => Math.random() - 0.5).map((poly, i) => ({ id: i, icon: poly, flipped: false, solved: false }));
        setMemoryCards(deck); setScore(0);
    }, [gameId, gameState]);

    const handleCardClick = (id) => {
        if (gameState !== 'PLAYING') return;
        const newD = [...memoryCards];
        const card = newD.find(c => c.id === id);
        if (card.flipped || card.solved) return;

        card.flipped = true; setMemoryCards(newD);

        const active = newD.filter(c => c.flipped && !c.solved);
        if (active.length === 2) {
            if (active[0].icon === active[1].icon) {
                active.forEach(c => c.solved = true); setScore(s => s + 20);
                if (newD.every(c => c.solved)) setGameState('WIN');
            } else {
                setTimeout(() => {
                    active.forEach(c => c.flipped = false);
                    setMemoryCards([...newD]);
                }, 600);
            }
        }
    };

    const triggerKey = (code, key) => {
        const event = new CustomEvent('activeGameKey', { detail: { code, key: key || code } });
        window.dispatchEvent(event);
    };

    if (gameId === 'memory') {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-black p-4">
                {gameState === 'PLAYING' ? (
                    <>
                    <div className="mb-4 flex w-full max-w-md justify-between font-mono text-[10px] uppercase tracking-widest text-gray-500">
                        <span>Score {score}</span>
                        <span>Level {level}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {memoryCards.map(c => (
                            <button key={c.id} type="button" onClick={() => handleCardClick(c.id)} className={`flex h-16 w-16 items-center justify-center rounded-md border text-lg font-bold transition-colors ${c.flipped || c.solved ? 'border-root-green/30 bg-root-green/15 text-root-green' : 'border-white/10 bg-white/[0.05] text-gray-500'}`}>
                                {(c.flipped || c.solved) ? c.icon : '?'}
                            </button>
                        ))}
                    </div>
                    </>
                ) : <Overlay gameState={gameState} score={score} onStart={() => setGameState('PLAYING')} />}
            </div>
        );
    }

    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center">
            <div className="flex w-full max-w-[600px] justify-between px-3 pt-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                <span>Score {score}</span>
                <span>Level {level}</span>
            </div>
            <div className="flex w-full flex-1 items-center justify-center px-2">
                <canvas ref={canvasRef} className="aspect-[3/2] w-full max-w-[600px] rounded-md border border-white/10 bg-black shadow-2xl" style={{ imageRendering: 'pixelated' }} />
                {gameState !== 'PLAYING' && <Overlay gameState={gameState} score={score} onStart={() => setGameState('PLAYING')} />}
            </div>

            {gameState === 'PLAYING' && (
                <MobileControls gameId={gameId} onKey={triggerKey} />
            )}
        </div>
    );
};

const Overlay = ({ gameState, score, onStart }) => (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/80 p-4 text-center backdrop-blur-sm">
        <h2 className={`font-serif text-3xl font-bold md:text-4xl ${gameState === 'GAMEOVER' ? 'text-red-500' : 'text-white'}`}>
            {gameState === 'GAMEOVER' ? 'SYSTEM FAILURE' : gameState === 'WIN' ? 'MISSION COMPLETE' : 'INITIALIZE'}
        </h2>
        {gameState !== 'INIT' && <p className="font-mono text-sm uppercase tracking-widest text-gray-400">Score {score}</p>}
        <button type="button" onClick={onStart} className="flex items-center gap-2 rounded-md bg-root-green px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-white">
            <Play className="h-4 w-4" /> Start
        </button>
    </div>
);

export default Arcade;
