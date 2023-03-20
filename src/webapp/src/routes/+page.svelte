<script lang="ts">
	import AircraftElement from '$lib/components/aircraftElement.svelte';
	import Aircraft3dElement from '$lib/components/aircraftElement.svelte';
	import PlantetElement from '$lib/components/plantetElement.svelte';
	import type { Aircraft } from '$lib/models/aircraft';
	import { earthRadius } from '$lib/models/earth';
	import AmbientLight from '$lib/sceneGraph/components/ambientLight.svelte';
	import PerspectiveCamera from '$lib/sceneGraph/components/perspectiveCamera.svelte';
	import PointLight from '$lib/sceneGraph/components/pointLight.svelte';
	import Scene from '$lib/sceneGraph/components/scene.svelte';

	let aircrafts: Aircraft[] = [
		{
			id: '1',
			altitude: 0,
			bearing: 0,
			distanceTraveled: 10000,
			start: { lat: 0, lng: 0 },
			velocity: 0
		}
	];

	const onAnimateAircraft = (aircraft: Aircraft, timeStamp: number) => {
		aircrafts = aircrafts.map((a) => {
			if (a !== aircraft) return a;
			return {
				...aircraft,
				distanceTraveled: (aircraft.distanceTraveled += 10000.0)
			};
		});
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Scene>
	<!-- Set up lights -->
	<PointLight position={{ x: 30000000, y: 30000000, z: 30000000 }} />
	<AmbientLight />

	<PerspectiveCamera position={{ x: 0, y: 0, z: 19113000 }} near={0.1} far={30000000} />

	<PlantetElement radius={earthRadius}>
		{#each aircrafts as aircraft}
			<Aircraft3dElement
				{aircraft}
				on:animate={(event) => onAnimateAircraft(aircraft, event.detail)}
			/>
		{/each}
	</PlantetElement>
</Scene>
