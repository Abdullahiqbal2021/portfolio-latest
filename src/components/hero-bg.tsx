import { useEffect, useRef } from 'react';

const COUNT = 30;
const MAX_DIST = 300;

const COLORS: [number, number, number][] = [
	[31, 195, 255],
	[31, 195, 255],
	[31, 195, 255],
	[255, 255, 255],
	[0, 237, 100],
];

interface Dot {
	x: number;
	y: number;
	vx: number;
	vy: number;
	r: number;
	color: [number, number, number];
}

export const HeroBg = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animId: number;
		let dots: Dot[] = [];

		const resize = () => {
			const p = canvas.parentElement;
			canvas.width = p ? p.clientWidth : window.innerWidth;
			canvas.height = p
				? p.clientHeight || window.innerHeight
				: window.innerHeight;
		};

		const spawn = () => {
			resize();
			dots = Array.from({ length: COUNT }, () => ({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.45,
				vy: (Math.random() - 0.5) * 0.45,
				r: Math.random() * 1.6 + 0.6,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
			}));
		};

		const frame = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (const d of dots) {
				d.x += d.vx;
				d.y += d.vy;
				if (d.x <= 0 || d.x >= canvas.width) d.vx *= -1;
				if (d.y <= 0 || d.y >= canvas.height) d.vy *= -1;
			}

			for (let i = 0; i < dots.length; i++) {
				for (let j = i + 1; j < dots.length; j++) {
					const dx = dots[i].x - dots[j].x;
					const dy = dots[i].y - dots[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < MAX_DIST) {
						const a = (1 - dist / MAX_DIST) * 0.38;
						const [r, g, b] = dots[i].color;
						ctx.beginPath();
						ctx.moveTo(dots[i].x, dots[i].y);
						ctx.lineTo(dots[j].x, dots[j].y);
						ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
						ctx.lineWidth = 0.7;
						ctx.stroke();
					}
				}
			}

			for (const d of dots) {
				const [r, g, b] = d.color;
				const glow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 7);
				glow.addColorStop(0, `rgba(${r},${g},${b},0.3)`);
				glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
				ctx.beginPath();
				ctx.arc(d.x, d.y, d.r * 7, 0, Math.PI * 2);
				ctx.fillStyle = glow;
				ctx.fill();

				ctx.beginPath();
				ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${r},${g},${b},0.95)`;
				ctx.fill();
			}

			animId = requestAnimationFrame(frame);
		};

		spawn();
		frame();
		window.addEventListener('resize', spawn);
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', spawn);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className='hero-canvas'
		/>
	);
};
