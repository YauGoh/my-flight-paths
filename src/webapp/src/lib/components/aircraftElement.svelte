<script lang="ts">
	import { getContext } from 'svelte';
	import { type PlantContext, plantContextKey } from '$lib/contexts/planetContext';
	import type { Aircraft } from '$lib/models/aircraft';
	import Cone from '../sceneGraph/components/cone.svelte';
	import Group from '../sceneGraph/components/group.svelte';
	import { getArcAngle, toRadians } from '../utils/maths';

	export let aircraft: Aircraft;

	const plantContext = getContext<PlantContext>(plantContextKey);
	let radiusOfPlanet = plantContext.radius;

	$: onPlantRadiusChanged(plantContext.radius);

	const onPlantRadiusChanged = (radius: number) => (radiusOfPlanet = radius);
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
					<Cone radius={100000} height={300000}>
						<slot />
					</Cone>
				</Group>
			</Group>
		</Group>
	</Group>
</Group>
