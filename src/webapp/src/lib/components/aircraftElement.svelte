<script lang="ts">
	import type { Aircraft } from '$lib/models/aircraft';
	import Group from '../sceneGraph/components/group.svelte';
	import { getArcAngle, toRadians } from '../sceneGraph/utils/maths';
	import Cone from '../sceneGraph/components/cone.svelte';
	import { getContext } from 'svelte';
	import { type PlantContext, plantContextKey } from '$lib/contexts/planetContext';

	export let aircraft: Aircraft;

	let plantContext = getContext<PlantContext>(plantContextKey);
	let radiusOfPlanet = plantContext.radius;

	$: onPlantRadiusChanged(plantContext.radius);

	const onPlantRadiusChanged = (radius: number) => (radiusOfPlanet = radius);
</script>

<Group rotation={{ x: 0, y: toRadians(aircraft.start.lng), z: 0 }}>
	<Group rotation={{ x: toRadians(aircraft.start.lat), y: 0, z: 0 }}>
		<Group rotation={{ x: 0, y: toRadians(aircraft.bearing), z: 0 }}>
			<Group
				rotation={{
					x: 0,
					y: getArcAngle(radiusOfPlanet + aircraft.altitude, aircraft.distanceTraveled),
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
