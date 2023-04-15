<script lang="ts">
	import HelloWorld from '$lib/components/helloWorld.svelte';
	import SearchAircraft from '$lib/components/searchAircraft.svelte';
	import SheetContainer from '$lib/components/sheetContainer.svelte';
	import { showSheet } from '$lib/states/sheetState';
	import '../styles/styles.scss';
</script>

<div class="layout">
	<h1>My Flight Tracker</h1>
	<p>
		A simple Svelte wrapper on the popular
		<a href="https://threejs.org/">Three.js 3D Javascript library</a>.
	</p>
	<p>
		The shrere is our planet Earth. Each moving cone represents a moving Aircraft, time has been
		sped up so we can see movement.
	</p>
	<p>
		Try clicking on the each Aircraft to get it's details. Click on the search button to find an
		aircraft.
	</p>
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
			position: relative;
		}
	}
</style>
