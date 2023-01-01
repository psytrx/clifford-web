<script lang="ts">
	import type chroma from 'chroma-js';

	export let value: chroma.InterpolationMode = 'lch';

	export let modes: chroma.InterpolationMode[] = [
		'rgb',
		'hsl',
		'hsv',
		'hsi',
		'lab',
		'lch',
		'hcl',
		'lrgb'
	];
</script>

<label for="interp">Interpolation Mode:</label>
<select name="interp" id="interp" bind:value>
	{#each modes as m}
		<option value={m}>{m}</option>
	{/each}
</select>
