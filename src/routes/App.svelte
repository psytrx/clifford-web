<script lang="ts">
	import { onMount } from 'svelte';
	import CliffordAttractor from './CliffordAttractor.svelte';
	import FuncInput from './FuncInput.svelte';
	import { funcs } from './funcs';
	import GradientInput from './GradientInput.svelte';
	import GradientPreview from './GradientPreview.svelte';
	import InterpModeInput from './InterpModeInput.svelte';
	import { palettes } from './palettes';
	import ParameterInput from './ParameterInput.svelte';
	import { pickRand, rand } from './random';

	const width = 1024;
	const height = width;

	let a = rand(-2, 2);
	let b = rand(-2, 2);
	let c = rand(-2, 2);
	let d = rand(-2, 2);

	let gradient = pickRand(palettes);
	let interpMode: chroma.InterpolationMode = 'lab';
	let func = funcs[0];

	let maxX = 0;
	let maxY = 0;

	$: consoleArgs =
		'clifford-go \\\n  ' +
		[
			`--width=${width}`,
			`--height=${height}`,
			`--a=${a}`,
			`--b=${b}`,
			`--c=${c}`,
			`--d=${d}`,
			`--gradient=${gradient.join(',')}`
		].join(' \\\n  ');

	function handleOnRandomizeParams() {
		a = rand(-2, 2);
		b = rand(-2, 2);
		c = rand(-2, 2);
		d = rand(-2, 2);
	}

	function handleOnRandomizeGradient() {
		gradient = pickRand(palettes);
	}

	let searchHandle: any;
	let histMax: number;
	let iterations: number;
	function handleOnFindStable() {
		handleOnRandomizeParams();
		const n = 250;
		searchHandle = setInterval(() => {
			if (histMax < iterations / n) {
				clearInterval(searchHandle);
				searchHandle = undefined;
			} else {
				handleOnRandomizeParams();
			}
		}, 100);
	}

	onMount(() => {
		return () => {
			clearInterval(searchHandle);
		};
	});
</script>

<div class="layered">
	<CliffordAttractor
		{width}
		{height}
		{a}
		{b}
		{c}
		{d}
		{gradient}
		{func}
		{interpMode}
		bind:maxX
		bind:maxY
		bind:histMax
		bind:iterations
	/>
	<div class="highlight">
		<CliffordAttractor
			width={width / 4}
			height={height / 4}
			{a}
			{b}
			{c}
			{d}
			{gradient}
			{func}
			{interpMode}
			zoom={128}
			offX={maxX}
			offY={maxY}
		/>
	</div>
</div>

<div>
	<ul>
		<li>
			<button on:click|preventDefault={handleOnFindStable} disabled={searchHandle}>
				Find stable attractor
			</button>
		</li>
		<li><button on:click|preventDefault={handleOnRandomizeParams}>Randomize parameters</button></li>
		<li><button on:click|preventDefault={handleOnRandomizeGradient}>Randomize gradient</button></li>
	</ul>

	<details>
		<summary>Gradient</summary>

		<GradientInput bind:value={gradient} {interpMode} />
		<InterpModeInput bind:value={interpMode} />
		<GradientPreview {gradient} {interpMode} fn={(x) => x} />
		<FuncInput bind:value={func} />
		<GradientPreview {gradient} {interpMode} fn={func.fn} />
	</details>

	<details>
		<summary>Parameters</summary>

		<ParameterInput name="a" bind:value={a} />
		<ParameterInput name="b" bind:value={b} />
		<ParameterInput name="c" bind:value={c} />
		<ParameterInput name="d" bind:value={d} />
	</details>

	<details>
		<summary>clifford-go Arguments</summary>
		<pre><code>$ {consoleArgs}</code></pre>
	</details>
</div>

<style>
	ul {
		padding: 0;
		list-style: none;
		display: flex;
		gap: 0.25rem;
	}

	.layered {
		position: relative;
	}

	.highlight {
		position: absolute;
		right: -1rem;
		bottom: -1rem;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
	}
</style>
