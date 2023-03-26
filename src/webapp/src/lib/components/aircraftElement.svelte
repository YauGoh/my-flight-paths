<script lang="ts">
	import { getContext } from 'svelte';
	import { type PlantContext, plantContextKey } from '$lib/contexts/planetContext';
	import type { AircraftPosition } from '$lib/states/aircraftsState';
	import Cone from '../sceneGraph/components/cone.svelte';
	import Group from '../sceneGraph/components/group.svelte';
	import { toRadians } from '../utils/maths';
	import SphericalTransform from './sphericalTransform.svelte';

	export let aircraftPosition: AircraftPosition;
	export let isSelected: boolean = false;

	const plantContext = getContext<PlantContext>(plantContextKey);
	let radiusOfPlanet = plantContext.radius;

	$: onPlantRadiusChanged(plantContext.radius);

	const onPlantRadiusChanged = (radius: number) => (radiusOfPlanet = radius);
</script>

<SphericalTransform
	position={aircraftPosition.currentPosition}
	bearing={aircraftPosition.aircraft.bearing}
	radius={aircraftPosition.aircraft.altitude + radiusOfPlanet}
>
	<Cone radius={100000} height={300000} colour={isSelected ? 0xff0000 : 0xffff00}>
		<slot />
	</Cone>
</SphericalTransform>
