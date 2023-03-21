<script lang="ts">
	import HelloWorld from '$lib/components/helloWorld.svelte';
	import SheetContainer from '$lib/components/sheetContainer.svelte';
	import { showSheet } from '$lib/states/sheetState';
	import '../styles/styles.scss';

	const onShowSheets = () => showSheet(HelloWorld, 'Hi There');
</script>

<div class="layout">
	<div class="layout__header">
		Something
		<button on:click={onShowSheets}>Sheets</button>
	</div>
	<div class="layout__body">
		<slot />
	</div>
	<div class="layout__footer">Somthing</div>
	<SheetContainer />
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		height: 100%;

		&__body {
			flex: 1;

			display: flex;
			flex-direction: column;
		}
	}
</style>
