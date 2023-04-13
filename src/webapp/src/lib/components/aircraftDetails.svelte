<script lang="ts">
	import { aircraftsState } from '$lib/states/aircraftsState';
	import LatLng from './latLng.svelte';
</script>

{#if $aircraftsState?.selectedAircraftPosition}
	<form>
		<div class="form-group">
			<label>
				ICAO 24
				<input value={$aircraftsState.selectedAircraftPosition.aircraft.id} />
			</label>
		</div>

		<div class="form-group">
			<label>
				Call Sign
				<input value={$aircraftsState.selectedAircraftPosition.aircraft.callSign} />
			</label>
		</div>

		<div class="form-group">
			<label>
				Start posiition
				<span><LatLng latLng={$aircraftsState.selectedAircraftPosition.aircraft.start} /></span>
			</label>
		</div>

		<div class="form-group">
			<label>
				Bearing
				<input value={$aircraftsState.selectedAircraftPosition.aircraft.bearing} />
			</label>
		</div>

		<div class="form-group">
			<label>
				Velocity
				<input value={$aircraftsState.selectedAircraftPosition.aircraft.velocity} />
			</label>
		</div>

		<div class="form-group">
			<label>
				Current posiition
				<span
					><LatLng bind:latLng={$aircraftsState.selectedAircraftPosition.currentPosition} /></span
				>
			</label>
		</div>
	</form>
{/if}
