<script lang="ts">
	import { onMount } from 'svelte';
	import Aircraft3dElement from '$lib/components/aircraftElement.svelte';
	import PlantetElement from '$lib/components/plantetElement.svelte';
	import TrackingCamera from '$lib/components/trackingCamera.svelte';
	import { earthRadius } from '$lib/models/earth';
	import AmbientLight from '$lib/sceneGraph/components/ambientLight.svelte';
	import PerspectiveCamera from '$lib/sceneGraph/components/perspectiveCamera.svelte';
	import PointLight from '$lib/sceneGraph/components/pointLight.svelte';
	import Scene from '$lib/sceneGraph/components/scene.svelte';
	import {
		aircraftsState,
		initialiseAircrafts,
		setUpdateTimeMultiplier,
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

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Scene on:animate={(event) => onAnimateAircraft(event.detail)}>
	<!-- Set up lights -->
	<PointLight position={{ x: 30000000, y: 30000000, z: 30000000 }} />
	<AmbientLight />

	<TrackingCamera lookAt={$aircraftsState.cameraPosition} />

	<!-- <PerspectiveCamera position={{ x: 0, y: 0, z: 19113000 }} near={10000000} far={30000000} /> -->

	<PlantetElement radius={earthRadius}>
		{#each $aircraftsState.aircraftPositions as position}
			<Aircraft3dElement
				aircraftPosition={position}
				isSelected={position === $aircraftsState.selectedAircraftPosition}
			/>
		{/each}
	</PlantetElement>
</Scene>
