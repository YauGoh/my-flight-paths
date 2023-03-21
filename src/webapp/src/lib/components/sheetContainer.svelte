<script lang="ts">
	import { sheetState } from '$lib/states/sheetState';
</script>

<div class="sheet-container">
	{#each $sheetState.stack as sheet}
		<div class="sheet" class:sheet--hidden={!sheet.shown}>
			<svelte:component this={sheet.component} {...sheet.props} />
		</div>
	{/each}
</div>

<style lang="scss">
	.sheet-container {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
	}

	.sheet {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;

		margin: 1rem;

		width: 25vw;
		max-width: 768px;

		background: white;

		transition: transform ease-in 0.25s;
		transform: translateX(0);

		&--hidden {
			transform: translateX(calc(100% + 2rem));
		}
	}
</style>
