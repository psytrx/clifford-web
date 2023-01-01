<script lang="ts">
	import { onMount } from 'svelte';
	import { rand } from './random';
	import chroma from 'chroma-js';
	import { phi } from './const';
	import type { funcs } from './funcs';

	export let a: number;
	export let b: number;
	export let c: number;
	export let d: number;

	export let width = 1024;
	export let height = width;

	export let zoom = 1;

	$: sizeScale = (zoom * width) / (2 * Math.max(1 + Math.abs(c), 1 + Math.abs(d))) / phi;

	export let gradient: string[];
	export let func: typeof funcs[0];

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let handle: any;

	export let targetFps = 60;
	let stepsPerTick = 128;
	export let iterations = 0;

	export let interpMode: chroma.InterpolationMode;

	let x: number;
	let y: number;
	export let maxX = 0;
	export let maxY = 0;

	$: a, b, c, d, width, height, func, gradient, scale, zoom, reset();
	$: scale = chroma.scale(gradient).mode(interpMode);

	$: hist = new Uint32Array(width * height);
	export let histMax = 0;

	onMount(() => {
		let _ctx = canvas.getContext('2d');
		if (!_ctx) throw new Error('Could not get context 2D');
		ctx = _ctx;

		reset();

		let lastT = 0;
		function tick(t: DOMHighResTimeStamp) {
			const dt = t - lastT;
			lastT = t;
			onTick(dt);
			handle = requestAnimationFrame(tick);
		}
		handle = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(handle);
		};
	});

	function advance() {
		const nx = Math.sin(a * y) + c * Math.cos(a * x);
		const ny = Math.sin(b * x) + d * Math.cos(b * y);

		x = nx;
		y = ny;

		const px = Math.floor(width / 2 + x * sizeScale);
		const py = Math.floor(height / 2 + y * sizeScale);
		if (px < 0 || px >= width || py < 0 || py >= height) {
			return null;
		}

		const idx = px + width * py;

		hist[idx] = (hist[idx] || 0) + 1;
		if (hist[idx] > histMax) {
			histMax = hist[idx];
			maxX = x;
			maxY = y;
		}

		const f = hist[idx] / histMax;

		return [px, py, f];
	}

	function reset() {
		if (!ctx) return;

		ctx.fillStyle = scale(0).css();
		ctx.fillRect(0, 0, width, height);

		x = rand(-2, 2);
		y = rand(-2, 2);
		for (let i = 0; i < 128; i++) {
			advance();
		}

		hist = new Uint32Array(width * height);
		histMax = 0;
		iterations = 0;
	}

	function updateStepsPerTick(dt: number) {
		const threshold = 0.5;
		if (dt < (1 - threshold) * (1000 / targetFps)) {
			stepsPerTick *= 2;
		} else if (stepsPerTick > 2 && dt > (1 + threshold) * (1000 / targetFps)) {
			stepsPerTick /= 2;
		}
	}

	function onTick(dt: number) {
		updateStepsPerTick(dt);

		for (let i = 0; i < stepsPerTick; i++) {
			const ok = advance();
			if (!ok) continue;

			if (Math.random() < 0.0001) {
				// console.log(ok);
			}

			const [px, py, f] = ok;
			ctx.fillStyle = scale(func.fn(f)).css();
			ctx.fillRect(px, py, 1, 1);
		}
		iterations = iterations + stepsPerTick;
	}
</script>

<figure>
	<canvas bind:this={canvas} {width} {height} />
	<!-- <figcaption>{maxX}/{maxY}</figcaption> -->
</figure>

<style>
	figure {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	canvas {
		width: 100%;
		max-width: 100vw;
		border: 1px solid var(--b-line);
		border-radius: 0.25rem;
	}
</style>
