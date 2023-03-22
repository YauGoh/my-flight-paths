<script lang="ts">
	import { aircraftsState, searchAircrafts } from '$lib/states/aircraftsState';

	let searchText: string;

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
	{#each $aircraftsState.searchResults as aircraft}
		<li class="search-result__item">{aircraft.callSign}</li>
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
		list-style: none;

		&__item {
			&--selected {
				font-weight: bold;
			}
		}
	}
</style>
