<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';
	import { type PlantContext, plantContextKey } from '$lib/contexts/planetContext';
	import type { Aircraft } from '$lib/models/aircraft';
	import Cone from '../sceneGraph/components/cone.svelte';
	import Group from '../sceneGraph/components/group.svelte';
	import { getArcAngle, toRadians } from '../sceneGraph/utils/maths';

	export let aircraft: Aircraft;

	const dispatchEvent = createEventDispatcher();

	const plantContext = getContext<PlantContext>(plantContextKey);
	let radiusOfPlanet = plantContext.radius;
	let isAnimating = true;

	$: onPlantRadiusChanged(plantContext.radius);

	const onPlantRadiusChanged = (radius: number) => (radiusOfPlanet = radius);

	let lastAnimationRequestId: number = 0;
	onMount(() => {
		requestAnimationFrame(onAnimate);
	});

	const onAnimate = (timeStamp: number) => {
		dispatchEvent('animate', timeStamp);

		if (isAnimating) lastAnimationRequestId = requestAnimationFrame(onAnimate);
	};

	onDestroy(() => {
		isAnimating = false;

		if (lastAnimationRequestId) cancelAnimationFrame(lastAnimationRequestId);
	});
</script>

<Group rotation={{ x: 0, y: toRadians(aircraft.start.lng), z: 0 }}>
	<Group rotation={{ x: toRadians(aircraft.start.lat), y: 0, z: 0 }}>
		<Group rotation={{ x: 0, y: toRadians(aircraft.bearing), z: 0 }}>
			<Group
				rotation={{
					x: -1 * getArcAngle(radiusOfPlanet + aircraft.altitude, aircraft.distanceTraveled),
					y: 0,
					z: 0
				}}
			>
				<Group translation={{ width: 0, height: 0, depth: radiusOfPlanet + aircraft.altitude }}>
					<Cone radius={50000} height={150000}>
						<slot />
					</Cone>
				</Group>
			</Group>
		</Group>
	</Group>
</Group>
