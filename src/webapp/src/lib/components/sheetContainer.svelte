<script lang="ts">
	import { dismissCurrentSheet, sheetState } from '$lib/states/sheetState';

	const onDismissClicked = () => dismissCurrentSheet();
</script>

<div class="sheet-container">
	{#each $sheetState.stack as sheet}
		<div class="sheet" class:sheet--hidden={!sheet.shown}>
			<div class="sheet__header">
				<h2 class="sheet__title">{sheet.title}</h2>
				<button class="sheet__dismiss-button" on:click={onDismissClicked}>x</button>
			</div>
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

		transition: transform ease-in 0.25s;
		transform: translateX(0);

		width: 25vw;
		max-width: 768px;

		padding: 1rem;

		background: black;
		border: 1px solid green;

		&--hidden {
			transform: translateX(calc(100% + 2rem));
		}

		&__header {
			display: flex;
			flex-direction: row;
		}

		&__title {
			flex: 1;
			margin: 0;
			color: green;
		}

		&__dismiss-button {
			border: none;
			outline: none;

			width: 2rem;
			height: 2rem;
			color: green;

			background: transparent;
		}
	}
</style>
