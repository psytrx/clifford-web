<script lang="ts">
	import chroma from 'chroma-js';
	import { onMount } from 'svelte';

	export let gradient: string[];
	export let interpMode: chroma.InterpolationMode;
	export let width = 1024;
	export let height = 32;

	export let fn: (x: number) => number;

	$: scale = chroma.scale(gradient).mode(interpMode);
	$: width, height, scale, fn, redraw();

	let canvas: HTMLCanvasElement;

	function redraw() {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Could not get context 2D');

		for (let x = 0; x < width; x++) {
			const f = fn(x / width);
			const color = scale(f);
			ctx.fillStyle = color.css();
			ctx.fillRect(x, 0, 1, height);
		}
	}

	onMount(() => {
		redraw();
	});
</script>

<canvas bind:this={canvas} {width} {height} />

<style>
	canvas {
		width: 100%;
		border: 1px solid var(--b-line);
		border-radius: 0.25rem;
	}
</style>
