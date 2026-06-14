import React, { useEffect, useRef } from 'react';

const getMotionProfile = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const smallViewport = window.innerWidth < 768;

    if (reducedMotion) return { fps: 0, pixelRatio: 1, fieldScale: 0.86 };
    if (coarsePointer || smallViewport) return { fps: 14, pixelRatio: 1, fieldScale: 0.82 };
    return { fps: 30, pixelRatio: 1.1, fieldScale: 1 };
};

const FluidBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frameId;
        let resizeId;
        let lastFrame = 0;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let profile = getMotionProfile();
        let pixelRatio = Math.min(window.devicePixelRatio || 1, profile.pixelRatio);
        let time = 0;
        let isPaused = document.hidden;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            profile = getMotionProfile();
            pixelRatio = Math.min(window.devicePixelRatio || 1, profile.pixelRatio);
            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        };

        const scheduleResize = () => {
            window.clearTimeout(resizeId);
            resizeId = window.setTimeout(resize, 120);
        };

        const handleVisibilityChange = () => {
            isPaused = document.hidden;
            lastFrame = 0;
        };

        const drawField = (x, y, radius, colors) => {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            colors.forEach(([stop, color]) => gradient.addColorStop(stop, color));
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawSweep = (isDark) => {
            const sweep = ctx.createLinearGradient(0, 0, width, height);
            sweep.addColorStop(0, isDark ? 'rgba(20,184,166,0.12)' : 'rgba(16,185,129,0.24)');
            sweep.addColorStop(0.38, isDark ? 'rgba(255,255,255,0)' : 'rgba(56,189,248,0.08)');
            sweep.addColorStop(1, isDark ? 'rgba(56,189,248,0.12)' : 'rgba(14,165,233,0.2)');

            ctx.save();
            ctx.translate(Math.sin(time * 0.7) * width * 0.06, Math.cos(time * 0.5) * height * 0.05);
            ctx.fillStyle = sweep;
            ctx.fillRect(-width * 0.15, -height * 0.15, width * 1.3, height * 1.3);
            ctx.restore();
        };

        const drawRibbon = (offset, color, widthMultiplier = 1, isDark = false) => {
            const amplitude = height * 0.07 * profile.fieldScale;
            const baseY = height * offset;

            ctx.save();
            ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';
            ctx.lineWidth = Math.max(1.5, width * 0.0032 * widthMultiplier);
            ctx.shadowBlur = isDark ? 0 : 18;
            ctx.shadowColor = color;
            ctx.strokeStyle = color;
            ctx.beginPath();

            for (let x = -width * 0.08; x <= width * 1.08; x += width / 16) {
                const y = baseY
                    + Math.sin((x / width) * Math.PI * 2 + time * 2.1 + offset * 8) * amplitude
                    + Math.cos((x / width) * Math.PI * 3 + time * 1.3) * amplitude * 0.42;

                if (x === -width * 0.08) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
            ctx.restore();
        };

        // Floating education glyphs: math, science, and code symbols drifting upward.
        const GLYPHS = ['π', 'Σ', '∞', '√', 'ƒ(x)', '∆', 'λ', '</>', '{ }', '∫', '101', 'E=mc²', 'a²+b²', 'H₂O', '×÷', 'A+'];

        const drawGlyphs = (isDark) => {
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const count = width < 768 ? 9 : 16;
            for (let i = 0; i < count; i += 1) {
                const seed = i * 53.71;
                const speed = 0.018 + (i % 5) * 0.007;
                const baseX = (Math.sin(seed) * 0.5 + 0.5) * width;
                const x = baseX + Math.sin(time * 1.4 + i) * 26;
                const y = height - (((time * speed * height) + (Math.cos(seed) * 0.5 + 0.5) * height) % (height * 1.2)) + height * 0.1;
                const size = 13 + (i % 4) * 5;
                const fade = Math.sin((y / height) * Math.PI); // fade near top and bottom edges

                ctx.font = `${size}px "JetBrains Mono", monospace`;
                ctx.fillStyle = isDark
                    ? `rgba(94,234,212,${0.05 + fade * 0.09})`
                    : `rgba(5,150,105,${0.06 + fade * 0.1})`;
                ctx.fillText(GLYPHS[i % GLYPHS.length], x, y);
            }

            ctx.restore();
        };

        // Knowledge network: slow-moving nodes joined by lines when close,
        // like a constellation of connected ideas.
        const drawNetwork = (isDark) => {
            const count = width < 768 ? 10 : 18;
            const nodes = [];

            for (let i = 0; i < count; i += 1) {
                const seed = i * 41.37;
                nodes.push({
                    x: (Math.sin(seed) * 0.5 + 0.5) * width + Math.sin(time * 0.6 + i * 1.7) * width * 0.06,
                    y: (Math.cos(seed * 1.3) * 0.5 + 0.5) * height + Math.cos(time * 0.5 + i * 1.1) * height * 0.06,
                    pulse: Math.sin(time * 2.2 + i) * 0.5 + 0.5
                });
            }

            ctx.save();
            const linkDistance = Math.min(width, height) * 0.22;

            for (let i = 0; i < count; i += 1) {
                for (let j = i + 1; j < count; j += 1) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.hypot(dx, dy);
                    if (distance > linkDistance) continue;

                    const strength = 1 - distance / linkDistance;
                    ctx.strokeStyle = isDark
                        ? `rgba(45,212,191,${strength * 0.14})`
                        : `rgba(13,148,136,${strength * 0.18})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }

            for (const node of nodes) {
                ctx.beginPath();
                ctx.fillStyle = isDark
                    ? `rgba(94,234,212,${0.18 + node.pulse * 0.16})`
                    : `rgba(5,150,105,${0.22 + node.pulse * 0.18})`;
                ctx.arc(node.x, node.y, 1.6 + node.pulse * 1.6, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        };

        const drawParticles = (isDark) => {
            if (profile.fps < 12) return;

            ctx.save();
            ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';

            const count = width < 768 ? 12 : 24;
            for (let i = 0; i < count; i += 1) {
                const seed = i * 97.13;
                const x = ((Math.sin(seed) * 0.5 + 0.5) * width + Math.sin(time * 0.9 + i) * width * 0.045) % width;
                const y = ((Math.cos(seed) * 0.5 + 0.5) * height + Math.cos(time * 0.75 + i * 0.6) * height * 0.05) % height;
                const radius = (i % 3 === 0 ? 5 : 3) * profile.fieldScale;

                ctx.beginPath();
                ctx.fillStyle = isDark
                    ? (i % 2 ? 'rgba(45,212,191,0.16)' : 'rgba(96,165,250,0.14)')
                    : (i % 2 ? 'rgba(16,185,129,0.26)' : 'rgba(14,165,233,0.24)');
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        };

        const drawMicroTexture = (isDark) => {
            ctx.save();
            ctx.globalAlpha = isDark ? 0.08 : 0.06;
            ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';

            const gap = width < 768 ? 46 : 34;
            const drift = (time * 180) % gap;

            for (let y = -gap; y < height + gap; y += gap) {
                for (let x = -gap; x < width + gap; x += gap) {
                    const pulse = Math.sin((x + y) * 0.01 + time * 3);
                    if (pulse > 0.45) {
                        ctx.fillRect(x + drift * 0.18, y + drift * 0.12, 1, 1);
                    }
                }
            }

            ctx.restore();
        };

        const draw = (timestamp = 0) => {
            if (isPaused) {
                frameId = requestAnimationFrame(draw);
                return;
            }

            if (!profile.fps) {
                ctx.clearRect(0, 0, width, height);
                const isDark = document.documentElement.classList.contains('dark');
                ctx.fillStyle = isDark ? '#06111f' : '#f7f9fc';
                ctx.fillRect(0, 0, width, height);
                drawSweep(isDark);
                drawRibbon(0.34, isDark ? 'rgba(45,212,191,0.1)' : 'rgba(14,165,233,0.22)', 0.8, isDark);
                drawNetwork(isDark);
                return;
            }

            const minFrameTime = profile.fps ? 1000 / profile.fps : Infinity;

            if (timestamp - lastFrame < minFrameTime) {
                frameId = requestAnimationFrame(draw);
                return;
            }

            lastFrame = timestamp;
            time += profile.fps ? 0.006 * (30 / profile.fps) : 0;
            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.classList.contains('dark');
            const isArcadeOpen = document.body.classList.contains('arcade-open');
            ctx.fillStyle = isDark ? '#06111f' : '#f7f9fc';
            ctx.fillRect(0, 0, width, height);

            if (isArcadeOpen) {
                frameId = requestAnimationFrame(draw);
                return;
            }

            drawSweep(isDark);
            drawField(
                width * (0.18 + Math.sin(time) * 0.04),
                height * (0.16 + Math.cos(time * 0.8) * 0.04),
                Math.max(width, height) * 0.34 * profile.fieldScale,
                isDark
                    ? [[0, 'rgba(59,130,246,0.2)'], [0.54, 'rgba(59,130,246,0.08)'], [1, 'rgba(6,17,31,0)']]
                    : [[0, 'rgba(14,165,233,0.46)'], [0.5, 'rgba(125,211,252,0.22)'], [1, 'rgba(247,249,252,0)']]
            );
            drawField(
                width * (0.82 + Math.cos(time * 0.7) * 0.05),
                height * (0.2 + Math.sin(time * 0.9) * 0.04),
                Math.max(width, height) * 0.28 * profile.fieldScale,
                isDark
                    ? [[0, 'rgba(16,185,129,0.17)'], [0.58, 'rgba(16,185,129,0.07)'], [1, 'rgba(6,17,31,0)']]
                    : [[0, 'rgba(16,185,129,0.44)'], [0.58, 'rgba(110,231,183,0.2)'], [1, 'rgba(247,249,252,0)']]
            );
            drawField(
                width * (0.48 + Math.sin(time * 0.6) * 0.05),
                height * (0.85 + Math.cos(time * 0.7) * 0.03),
                Math.max(width, height) * 0.36 * profile.fieldScale,
                isDark
                    ? [[0, 'rgba(168,85,247,0.1)'], [0.62, 'rgba(168,85,247,0.04)'], [1, 'rgba(6,17,31,0)']]
                    : [[0, 'rgba(196,181,253,0.38)'], [0.62, 'rgba(221,214,254,0.18)'], [1, 'rgba(247,249,252,0)']]
            );

            drawRibbon(0.28, isDark ? 'rgba(45,212,191,0.16)' : 'rgba(14,165,233,0.28)', 1.1, isDark);
            drawRibbon(0.58, isDark ? 'rgba(52,211,153,0.12)' : 'rgba(16,185,129,0.24)', 0.9, isDark);
            drawRibbon(0.78, isDark ? 'rgba(147,197,253,0.1)' : 'rgba(99,102,241,0.18)', 0.68, isDark);
            drawNetwork(isDark);
            drawGlyphs(isDark);
            drawParticles(isDark);
            drawMicroTexture(isDark);

            if (profile.fps) {
                frameId = requestAnimationFrame(draw);
            }
        };

        resize();
        draw();
        window.addEventListener('resize', scheduleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            cancelAnimationFrame(frameId);
            window.clearTimeout(resizeId);
            window.removeEventListener('resize', scheduleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-100 saturate-[1.35] dark:saturate-100" aria-hidden="true" />;
};

export default FluidBackground;
