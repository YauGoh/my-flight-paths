<script lang="ts">
	import { aircraftsState } from '$lib/states/aircraftsState';
	import LatLng from './latLng.svelte';
</script>

{#if $aircraftsState?.selectedAircraftPosition}
	<form>
		<label>
			ICAO 24
			<input value={$aircraftsState.selectedAircraftPosition.aircraft.id} />
		</label>
		<label>
			Call Sign
			<input value={$aircraftsState.selectedAircraftPosition.aircraft.callSign} />
		</label>

		<label>
			Start posiition
			<span><LatLng latLng={$aircraftsState.selectedAircraftPosition.aircraft.start} /></span>
		</label>

		<label>
			Bearing
			<input value={$aircraftsState.selectedAircraftPosition.aircraft.bearing} />
		</label>

		<label>
			Velocity
			<input value={$aircraftsState.selectedAircraftPosition.aircraft.velocity} />
		</label>

		<label>
			Current posiition
			<span><LatLng bind:latLng={$aircraftsState.selectedAircraftPosition.currentPosition} /></span>
		</label>
	</form>
{/if}
