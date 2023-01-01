<script lang="ts">
	import 'bamboo.css';
</script>

<main>
	<slot />
</main>

<style>
	:global(body) {
		max-width: 100%;
		padding: 1rem;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 80rem) {
		main {
			flex-direction: row;
		}
	}
</style>
