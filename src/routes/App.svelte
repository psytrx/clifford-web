<script lang="ts">
	import CliffordAttractor from './CliffordAttractor.svelte';
	import FuncInput from './FuncInput.svelte';
	import { funcs } from './funcs';
	import GradientInput from './GradientInput.svelte';
	import GradientPreview from './GradientPreview.svelte';
	import InterpModeInput from './InterpModeInput.svelte';
	import { palettes } from './palettes';
	import ParameterInput from './ParameterInput.svelte';
	import { pickRand, rand } from './random';

	let a = rand(-2, 2);
	let b = rand(-2, 2);
	let c = rand(-2, 2);
	let d = rand(-2, 2);

	let gradient = pickRand(palettes);
	let interpMode: chroma.InterpolationMode = 'lab';
	let func = funcs[0];

	function handleOnRandomizeParams() {
		a = rand(-2, 2);
		b = rand(-2, 2);
		c = rand(-2, 2);
		d = rand(-2, 2);
	}

	function handleOnRandomizeGradient() {
		gradient = pickRand(palettes);
	}
</script>

<CliffordAttractor {a} {b} {c} {d} {gradient} {func} {interpMode} />

<ul>
	<li><button on:click|preventDefault={handleOnRandomizeParams}>Randomize Parameters</button></li>
	<li><button on:click|preventDefault={handleOnRandomizeGradient}>Randomize Gradient</button></li>
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

<style>
	ul {
		padding: 0;
		list-style: none;
		display: flex;
		gap: 0.25rem;
	}
</style>
