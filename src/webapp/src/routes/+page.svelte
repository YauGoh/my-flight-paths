<script lang="ts">
	import { onMount } from 'svelte';
	import Aircraft3dElement from '$lib/components/aircraftElement.svelte';
	import PlantetElement from '$lib/components/plantetElement.svelte';
	import TrackingCamera from '$lib/components/trackingCamera.svelte';
	import { earthRadius } from '$lib/models/earth';
	import AmbientLight from '$lib/sceneGraph/components/ambientLight.svelte';
	import PointLight from '$lib/sceneGraph/components/pointLight.svelte';
	import Scene from '$lib/sceneGraph/components/scene.svelte';
	import {
		aircraftsState,
		initialiseAircrafts,
		showAircraftSearch,
		updateAircrafts
	} from '$lib/states/aircraftsState';
	import { Animation } from '$lib/utils/animation';

	const animation = new Animation();

	onMount(async () => {
		await initialiseAircrafts();
	});

	const onAnimateAircraft = (timeStamp: number) => {
		const deltaSeconds = animation.getDeltaSeconds(timeStamp);

		updateAircrafts(deltaSeconds);
	};
</script>

<Scene on:animate={(event) => onAnimateAircraft(event.detail)}>
	<!-- Set up lights -->
	<PointLight position={{ x: 30000000, y: 30000000, z: 30000000 }} />
	<AmbientLight />

	<TrackingCamera lookAt={$aircraftsState.cameraPosition} />

	<PlantetElement radius={earthRadius}>
		{#each $aircraftsState.aircraftPositions as position}
			<Aircraft3dElement
				aircraftPosition={position}
				isSelected={position === $aircraftsState.selectedAircraftPosition}
			/>
		{/each}
	</PlantetElement>
</Scene>
<button class="search-button" type="button" on:click={showAircraftSearch}>Search</button>

<style lang="scss">
	.search-button {
		position: absolute;
		top: 1em;
		left: 1em;
	}
</style>
