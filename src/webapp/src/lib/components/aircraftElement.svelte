<script lang="ts">
	import { getContext } from 'svelte';
	import { type PlantContext, plantContextKey } from '$lib/contexts/planetContext';
	import type { AircraftPosition } from '$lib/states/aircraftsState';
	import Cone from '../sceneGraph/components/cone.svelte';
	import Group from '../sceneGraph/components/group.svelte';
	import { getArcAngle, toRadians } from '../utils/maths';

	export let aircraftPosition: AircraftPosition;
	export let isSelected: boolean = false;

	const plantContext = getContext<PlantContext>(plantContextKey);
	let radiusOfPlanet = plantContext.radius;
	let travelSweepAngle = 0;

	$: onPlantRadiusChanged(plantContext.radius);

	$: {
		travelSweepAngle =
			-1 *
			getArcAngle(
				radiusOfPlanet + aircraftPosition.aircraft.altitude,
				aircraftPosition.distanceTraveled
			);
	}

	const onPlantRadiusChanged = (radius: number) => (radiusOfPlanet = radius);
</script>

<Group rotation={{ x: 0, y: toRadians(aircraftPosition.aircraft.start.lng), z: 0 }}>
	<Group rotation={{ x: toRadians(aircraftPosition.aircraft.start.lat), y: 0, z: 0 }}>
		<Group rotation={{ x: 0, y: 0, z: toRadians(aircraftPosition.aircraft.bearing) }}>
			<Group
				rotation={{
					x: travelSweepAngle,
					y: 0,
					z: 0
				}}
			>
				<Group
					translation={{
						width: 0,
						height: 0,
						depth: radiusOfPlanet + aircraftPosition.aircraft.altitude
					}}
				>
					<Cone radius={100000} height={300000} colour={isSelected ? 0xff0000 : 0xffff00}>
						<slot />
					</Cone>
				</Group>
			</Group>
		</Group>
	</Group>
</Group>
