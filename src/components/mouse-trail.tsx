import { useEffect } from 'react';

//  Make them scatter on hero section and them combine then on mouse move
export const MouseTrail = () => {
	useEffect(() => {
		const coords = { x: 0, y: 0 };
		const circles = document.querySelectorAll<
			HTMLElement & { x: number; y: number }
		>('.circle');
		const inputs = document.querySelectorAll('input');
		const textarea = document.querySelectorAll('textarea');
		const fields = [...textarea, ...inputs];

		const handleMouseOver = () => {
			circles.forEach((circle) => {
				circle.classList.add('circle-thin');
			});
		};

		const handleMouseOut = () => {
			circles.forEach((circle) => {
				circle.classList.remove('circle-thin');
			});
		};

		fields.forEach((input) => {
			input.addEventListener('mouseover', () => {
				handleMouseOver();
			});
			input.addEventListener('mouseout', handleMouseOut);
		});

		circles.forEach(function (circle) {
			circle.x = 0;
			circle.y = 0;
		});

		const handleMouseMove = (e: MouseEvent) => {
			circles.forEach((circle) => {
				circle.classList.remove('circle-hidden');
			});
			coords.x = e.clientX;
			coords.y = e.clientY;
		};

		window.addEventListener('mousemove', handleMouseMove);

		let rafId: number;

		function animateCircles() {
			let x = coords.x;
			let y = coords.y;

			circles.forEach(function (circle, index) {
				circle.style.left = x - 12 + 'px';
				circle.style.top = y - 12 + 'px';
				circle.style.scale = ((circles.length - index) /
					circles.length) as unknown as string;
				circle.x = x;
				circle.y = y;
				const nextCircle = circles[index + 1] || circles[0];
				x += (nextCircle.x - x) * 0.35;
				y += (nextCircle.y - y) * 0.35;
			});

			rafId = requestAnimationFrame(animateCircles);
		}

		animateCircles();

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('mousemove', handleMouseMove);
			fields.forEach((input) => {
				input.removeEventListener('mouseover', handleMouseOver);
				input.removeEventListener('mouseout', handleMouseOut);
			});
		};
	}, []);

	return Array.from({ length: 40 }).map((_, i) => (
		<div
			key={i}
			className='circle circle-hidden'
		></div>
	));
};
