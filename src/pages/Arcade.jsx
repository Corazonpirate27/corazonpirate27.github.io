import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Trophy, Activity, RefreshCw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Hash } from 'lucide-react';

// STABLE 6 GAMES ONLY - Removing unstable experimental games
const games = [
    {
        id: 'snake', title: 'The Python Pit', color: 'text-green-500', border: 'border-green-500',
        desc: 'Snake | Level Up: Speed + Walls',
        image: '/matrix_snake_banner.png',
        lvl: '04'
    },
    {
        id: 'pong', title: 'Ping Protocol', color: 'text-blue-500', border: 'border-blue-500',
        desc: 'Pong | Level Up: AI Speed',
        image: '/matrix_pong_banner.png',
        lvl: '12'
    },
    {
        id: 'memory', title: 'RAM Audit', color: 'text-purple-500', border: 'border-purple-500',
        desc: 'Memory | Level Up: Grid Size',
        image: '/matrix_memory_banner.png',
        lvl: '08'
    },
    {
        id: 'breakout', title: 'Firewall Breaker', color: 'text-red-500', border: 'border-red-500',
        desc: 'Breakout | Level Up: Speed',
        image: '/matrix_arcade_breakout.png',
        lvl: '02'
    },
    {
        id: 'invaders', title: 'Botnet Defense', color: 'text-yellow-500', border: 'border-yellow-500',
        desc: 'Shooter | Level Up: Swarm Speed',
        image: '/matrix_arcade_invaders.png',
        lvl: '15'
    },
    {
        id: 'typer', title: 'DDoS Mitigator', color: 'text-cyan-500', border: 'border-cyan-500',
        desc: 'Typing | Level Up: Spawn Rate',
        image: '/matrix_arcade_typer.png',
        lvl: '20'
    },
];

const Arcade = () => {
    const [activeGame, setActiveGame] = useState(null);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Arcade Training Simulations</h2>
            <p className="text-gray-400 mb-12">Neural link established. Select simulation to begin training.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="bg-[#050505] border border-white/10 rounded-xl overflow-hidden hover:border-root-green/50 transition-all group flex flex-col"
                    >
                        {/* Image Header */}
                        <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
                            <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60"></div>

                            {/* LVL Badge */}
                            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur border border-root-green/30 px-2 py-1 rounded text-[10px] font-mono text-root-green font-bold tracking-widest">
                                LVL {game.lvl}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 font-serif tracking-wide group-hover:text-root-green transition-colors">{game.title}</h3>
                            <p className="text-xs text-gray-500 font-mono mb-6 leading-relaxed flex-1">{game.desc}</p>

                            {/* BOOT Button */}
                            <button
                                onClick={() => setActiveGame(game)}
                                className="w-full bg-[#00FF41] hover:bg-white text-black font-black uppercase tracking-widest py-3 rounded text-xs transition-colors shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                            >
                                Boot Simulation
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {activeGame && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-4"
                    >
                        <motion.div
                            layoutId={activeGame.id} // LayoutId might cause visual jumps if structure differs too much, removing safely if needed, but keeping for now.
                            className="w-full h-full md:h-auto md:max-w-5xl bg-black border-0 md:border md:border-root-green/20 rounded-none md:rounded-lg overflow-hidden relative flex flex-col md:max-h-[90vh] shadow-[0_0_50px_rgba(0,255,65,0.1)]"
                        >
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#050505] shrink-0">
                                <div>
                                    <h3 className="text-xl font-bold text-white font-serif flex items-center gap-3">
                                        <span className="text-root-green">{">>"}</span> {activeGame.title}
                                    </h3>
                                </div>
                                <button onClick={() => setActiveGame(null)} className="p-2 hover:text-white text-gray-500 hover:bg-white/10 rounded"><X /></button>
                            </div>
                            <div className="flex-1 bg-black relative flex flex-col items-center justify-center overflow-hidden">
                                <GameEngine gameId={activeGame.id} color={activeGame.color} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileControls = ({ onKey }) => {
    return (
        <div className="md:hidden pb-8 pt-4 w-full px-4 flex justify-between items-end shrink-0">
            {/* D-Pad */}
            <div className="grid grid-cols-3 gap-2">
                <div></div>
                <button onPointerDown={() => onKey('ArrowUp')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-root-green/50"><ChevronUp /></button>
                <div></div>
                <button onPointerDown={() => onKey('ArrowLeft')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-root-green/50"><ChevronLeft /></button>
                <button onPointerDown={() => onKey('ArrowDown')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-root-green/50"><ChevronDown /></button>
                <button onPointerDown={() => onKey('ArrowRight')} className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-root-green/50"><ChevronRight /></button>
            </div>

            {/* Action Buttons */}
            <button onPointerDown={() => onKey('Space')} className="w-20 h-20 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center text-red-500 font-bold active:bg-red-500 active:text-black">
                FIRE
            </button>
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

        // Dynamic Resizing Logic
        const updateCanvasSize = () => {
            const container = canvas.parentElement;
            if (container) {
                const rect = container.getBoundingClientRect();
                // Maintain 3:2 aspect ratio but fit width
                canvas.width = rect.width;
                canvas.height = rect.width * (2 / 3);
            }
        };
        updateCanvasSize();
        // Resize listener handled via simple re-renders or ResizeObserver is better, 
        // but for this game loop, we need to scale logic. 
        // SIMPLIFICATION: Keep internal logic at 600x400, scale visually via CSS (which we already do).
        // BUT user wanted "Optimization". 
        // The issue with CSS scaling is valid; coordinate mapping (mouse clicks) would break if we had them.
        // Since we use Keyboard/Touch Buttons, CSS scaling is actually PERFORMANT and SAFE.
        // So we will stick to fixed internal resolution for logic consistency, but ensure CSS handles the display.

        // Re-affirming logic resolution
        const width = 600; const height = 400;
        canvas.width = width; canvas.height = height; // Set internal buffer match logic

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
                        ctx.fillStyle = color.split('-')[1]; ctx.fillRect(b.x, b.y, 60, 15);
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
                e.preventDefault();
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
                if (e.code === 'ArrowLeft') { if (gameId === 'breakout') paddle.x -= 30; else pX -= 20; }
                if (e.code === 'ArrowRight') { if (gameId === 'breakout') paddle.x += 30; else pX += 20; }
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

    }, [gameId, gameState, color]);

    // --- MEMORY ENGINE ---
    useEffect(() => {
        if (gameId !== 'memory' || gameState !== 'PLAYING') return;
        const icons = ['⚡', '💀', '💻', '💾', '📡', '🕹️', '🛡️', '👾'];
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
            <div className="w-full h-full flex flex-col items-center justify-center bg-black p-4">
                {gameState === 'PLAYING' ? (
                    <div className="grid grid-cols-4 gap-4">
                        {memoryCards.map(c => (
                            <button key={c.id} onClick={() => handleCardClick(c.id)} className={`w-16 h-16 rounded text-3xl flex items-center justify-center transition-all ${c.flipped || c.solved ? 'bg-purple-900 rotate-y-180' : 'bg-gray-800'}`}>
                                {(c.flipped || c.solved) ? c.icon : '?'}
                            </button>
                        ))}
                    </div>
                ) : <Overlay gameState={gameState} score={score} onStart={() => setGameState('PLAYING')} />}
            </div>
        );
    }

    return (
        <div className="relative flex flex-col justify-center items-center w-full h-full">
            <div className="flex-1 flex items-center justify-center w-full px-2">
                <canvas ref={canvasRef} className="bg-black shadow-2xl rounded w-full max-w-[600px] aspect-[3/2] object-contain" style={{ imageRendering: 'pixelated' }} />
                {gameState !== 'PLAYING' && <Overlay gameState={gameState} score={score} onStart={() => setGameState('PLAYING')} />}
            </div>

            {gameState === 'PLAYING' && (
                <MobileControls onKey={triggerKey} />
            )}
        </div>
    );
};

const Overlay = ({ gameState, score, onStart }) => (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center flex-col gap-4 z-10 backdrop-blur-sm">
        <h2 className={`text-4xl font-bold font-serif ${gameState === 'GAMEOVER' ? 'text-red-500' : 'text-white'}`}>
            {gameState === 'GAMEOVER' ? 'SYSTEM FAILURE' : gameState === 'WIN' ? 'MISSION COMPLETE' : 'INITIALIZE'}
        </h2>
        {gameState !== 'INIT' && <p className="text-white text-xl font-mono">Score: {score}</p>}
        <button onClick={onStart} className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded hover:scale-105 transition-transform flex items-center gap-2">
            <Play className="w-4 h-4" /> START
        </button>
    </div>
);

export default Arcade;
