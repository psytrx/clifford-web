<script lang="ts">
	import CliffordAttractor from './CliffordAttractor.svelte';
	import FuncInput from './FuncInput.svelte';
	import { funcs } from './funcs';
	import GradientPreview from './GradientPreview.svelte';
	import InterpModeInput from './InterpModeInput.svelte';
	import ParameterInput from './ParameterInput.svelte';
	import { rand } from './random';

	let a = rand(-2, 2);
	let b = rand(-2, 2);
	let c = rand(-2, 2);
	let d = rand(-2, 2);

	let gradient = ['#2c2318', '#fdffff', '#0bd1e9', '#0bd1e9'];
	let interpMode: chroma.InterpolationMode = 'lch';
	let func = funcs[0];

	function handleOnRandomize() {
		a = rand(-2, 2);
		b = rand(-2, 2);
		c = rand(-2, 2);
		d = rand(-2, 2);
	}
</script>

<CliffordAttractor {a} {b} {c} {d} {gradient} {func} {interpMode} />

<form>
	<fieldset>
		<h2>Gradient</h2>

		<InterpModeInput bind:value={interpMode} />
		<GradientPreview {gradient} {interpMode} fn={(x) => x} />
		<FuncInput bind:value={func} />
		<GradientPreview {gradient} {interpMode} fn={func.fn} />
	</fieldset>

	<fieldset>
		<h2>Parameters</h2>

		<ParameterInput name="a" bind:value={a} />
		<ParameterInput name="b" bind:value={b} />
		<ParameterInput name="c" bind:value={c} />
		<ParameterInput name="d" bind:value={d} />
		<button on:click|preventDefault={handleOnRandomize}>Randomize</button>
	</fieldset>
</form>
