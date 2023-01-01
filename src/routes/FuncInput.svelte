<script lang="ts">
	import { funcs } from './funcs';

	export let value = funcs[0];
</script>

<label for="fn">Function:</label>
<select name="fn" id="fn" bind:value>
	{#each funcs as fn}
		<option value={fn}>{fn.name}</option>
	{/each}
</select>
