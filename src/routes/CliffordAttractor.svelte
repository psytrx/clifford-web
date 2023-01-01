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

	$: sizeScale = width / (2 * Math.max(1 + Math.abs(c), 1 + Math.abs(d))) / phi;

	export let gradient: string[];
	export let func: typeof funcs[0];

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let handle: any;

	export let targetFps = 60;
	let stepsPerTick = 128;

	export let interpMode: chroma.InterpolationMode;

	let x: number;
	let y: number;

	$: a, b, c, d, gradient, func, reset();
	$: scale = chroma.scale(gradient).mode(interpMode);

	$: hist = new Uint32Array(width * height);
	let histMax = 0;

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
		const idx = px + width * py;

		hist[idx] = (hist[idx] || 0) + 1;
		histMax = Math.max(histMax, hist[idx]);

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
			const [px, py, f] = advance();
			ctx.fillStyle = scale(func.fn(f)).css();
			ctx.fillRect(px, py, 1, 1);
		}
	}
</script>

<figure>
	<canvas bind:this={canvas} {width} {height} />
</figure>

<style>
	figure {
		display: flex;
		justify-content: center;
	}

	canvas {
		width: 100%;
		max-width: 75vh;
		border: 1px solid var(--b-line);
		border-radius: 0.25rem;
	}
</style>
