<script lang="ts">
	import CliffordAttractor from './CliffordAttractor.svelte';
	import { rand } from './random';

	let a = rand(-2, 2);
	let b = rand(-2, 2);
	let c = rand(-2, 2);
	let d = rand(-2, 2);

	let gradient = ['#000000', '#ffffff', '#ff00ff'];
</script>

<CliffordAttractor {a} {b} {c} {d} {gradient} interpMode="lch" />
