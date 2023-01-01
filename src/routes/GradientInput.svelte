<script lang="ts">
	import chroma from 'chroma-js';

	export let value: string[];
	export let interpMode: chroma.InterpolationMode;

	$: scale = chroma.scale(value).mode(interpMode);

	function insertNewAt(i: number) {
		const newColor = scale(i / value.length);
		value.splice(i, 0, newColor.hex());
		value = value;
	}

	function removeAt(i: number) {
		value.splice(i, 1);
		value = value;
	}
</script>

<label for="gradient">Gradient:</label>
<ul>
	{#each value as c, i}
		{#if i === 0}
			<li>
				<button on:click|preventDefault={() => insertNewAt(0)}>+</button>
			</li>
		{/if}

		<li class="grow">
			<input type="color" name="color-{i}" id="color-{i}" bind:value={c} />
			<button on:click|preventDefault={() => removeAt(i)}>-</button>
		</li>

		<li>
			<button on:click|preventDefault={() => insertNewAt(i + 1)}>+</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		justify-content: space-between;
	}

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	li.grow {
		width: 100%;
	}

	input {
		padding: 0;
	}
</style>
