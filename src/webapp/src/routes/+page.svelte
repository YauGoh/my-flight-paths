<script lang="ts">
	import { onMount } from 'svelte';
	import Aircraft3dElement from '$lib/components/aircraftElement.svelte';
	import PlantetElement from '$lib/components/plantetElement.svelte';
	import type { Aircraft } from '$lib/models/aircraft';
	import { earthRadius } from '$lib/models/earth';
	import AmbientLight from '$lib/sceneGraph/components/ambientLight.svelte';
	import PerspectiveCamera from '$lib/sceneGraph/components/perspectiveCamera.svelte';
	import PointLight from '$lib/sceneGraph/components/pointLight.svelte';
	import Scene from '$lib/sceneGraph/components/scene.svelte';
	import { getFlights } from '$lib/services/getFlights';
	import { Animation } from '$lib/utils/animation';

	const animation = new Animation();

	let aircrafts: Aircraft[] = [];

	let speed = 1000;
	// 	{
	// 		id: '1',
	// 		altitude: 200000,
	// 		bearing: 0,
	// 		distanceTraveled: 0,
	// 		start: { lat: 0, lng: 0 },
	// 		velocity: 10000
	// 	}
	// ];

	onMount(async () => {
		const flights = await getFlights();

		aircrafts = flights
			.filter((flight) => flight.baroAltitude)
			.filter((flight) => flight.velocity)
			.filter((flight) => flight.trueTrack)
			.filter((flight) => flight.longitude)
			.filter((flight) => flight.latitude)
			.slice(0, 10)
			.map((flight) => ({
				id: flight.icao24,
				callSign: flight.callsign,
				altitude: flight.baroAltitude!,
				velocity: flight.velocity!,
				bearing: flight.trueTrack!,
				distanceTraveled: 0,
				start: {
					lng: flight.longitude!,
					lat: flight.latitude!
				}
			}));
	});

	const onAnimateAircraft = (timeStamp: number) => {
		const deltaSeconds = speed * animation.getDeltaSeconds(timeStamp);

		aircrafts = aircrafts.map((a) => {
			return {
				...a,
				distanceTraveled: a.distanceTraveled + a.velocity * deltaSeconds
			};
		});
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Scene on:animate={(event) => onAnimateAircraft(event.detail)}>
	<!-- Set up lights -->
	<PointLight position={{ x: 30000000, y: 30000000, z: 30000000 }} />
	<AmbientLight />

	<PerspectiveCamera position={{ x: 0, y: 0, z: 19113000 }} near={10000000} far={30000000} />

	<PlantetElement radius={earthRadius}>
		{#each aircrafts as aircraft}
			<Aircraft3dElement {aircraft} />
		{/each}
	</PlantetElement>
</Scene>
