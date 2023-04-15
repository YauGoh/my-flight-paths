<script lang="ts">
	import {
		aircraftsState,
		searchAircrafts,
		selectAircraft,
		type AircraftPosition
	} from '$lib/states/aircraftsState';
	import LatLng from './latLng.svelte';

	let searchText: string;

	const onSelected = (aircraftPosition: AircraftPosition) => {
		selectAircraft(aircraftPosition);
	};

	$: searchAircrafts(searchText);
</script>

<form class="search-panel">
	<input
		class="search-panel__keyword-input"
		type="search"
		bind:value={searchText}
		placeholder="search ..."
	/>
</form>
<ul class="search-results">
	{#each $aircraftsState.searchResults as aircraftPosition}
		<li
			class="search-result__item"
			on:click={() => onSelected(aircraftPosition)}
			class:search-results__item--selected={aircraftPosition ===
				$aircraftsState.selectedAircraftPosition}
		>
			<span>{aircraftPosition.aircraft.callSign}</span>
			<LatLng latLng={aircraftPosition.currentPosition} />
		</li>
	{/each}
</ul>

<style lang="scss">
	.search-panel {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: row;

		&__keyword-input {
			flex: 1;
		}
	}

	.search-results {
		padding: 0;
		list-style: none;
		cursor: pointer;
		height: 100%;

		overflow-y: auto;

		&__item {
			&--selected {
				background: green;

				:global(*) {
					color: black !important;
				}
			}
		}
	}
</style>
