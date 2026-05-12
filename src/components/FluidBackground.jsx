import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frameId;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        let time = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
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
            sweep.addColorStop(0, isDark ? 'rgba(20,184,166,0.12)' : 'rgba(16,185,129,0.14)');
            sweep.addColorStop(0.42, 'rgba(255,255,255,0)');
            sweep.addColorStop(1, isDark ? 'rgba(56,189,248,0.12)' : 'rgba(14,165,233,0.12)');

            ctx.save();
            ctx.translate(Math.sin(time * 0.7) * width * 0.06, Math.cos(time * 0.5) * height * 0.05);
            ctx.fillStyle = sweep;
            ctx.fillRect(-width * 0.15, -height * 0.15, width * 1.3, height * 1.3);
            ctx.restore();
        };

        const draw = () => {
            time += 0.006;
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
                Math.max(width, height) * 0.34,
                isDark
                    ? [[0, 'rgba(59,130,246,0.2)'], [0.54, 'rgba(59,130,246,0.08)'], [1, 'rgba(6,17,31,0)']]
                    : [[0, 'rgba(125,211,252,0.36)'], [0.55, 'rgba(125,211,252,0.14)'], [1, 'rgba(247,249,252,0)']]
            );
            drawField(
                width * (0.82 + Math.cos(time * 0.7) * 0.05),
                height * (0.2 + Math.sin(time * 0.9) * 0.04),
                Math.max(width, height) * 0.28,
                isDark
                    ? [[0, 'rgba(16,185,129,0.17)'], [0.58, 'rgba(16,185,129,0.07)'], [1, 'rgba(6,17,31,0)']]
                    : [[0, 'rgba(167,243,208,0.42)'], [0.58, 'rgba(167,243,208,0.14)'], [1, 'rgba(247,249,252,0)']]
            );
            drawField(
                width * (0.48 + Math.sin(time * 0.6) * 0.05),
                height * (0.85 + Math.cos(time * 0.7) * 0.03),
                Math.max(width, height) * 0.36,
                isDark
                    ? [[0, 'rgba(168,85,247,0.1)'], [0.62, 'rgba(168,85,247,0.04)'], [1, 'rgba(6,17,31,0)']]
                    : [[0, 'rgba(221,214,254,0.36)'], [0.62, 'rgba(221,214,254,0.12)'], [1, 'rgba(247,249,252,0)']]
            );

            frameId = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener('resize', resize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
};

export default FluidBackground;
