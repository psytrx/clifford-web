<script lang="ts">
	export let name: string;
	export let value: number;
</script>

<label for="name">{name} = {value.toFixed(3)}</label>
<input type="range" {name} id={name} min="-2" max="2" step="0.001" bind:value />
