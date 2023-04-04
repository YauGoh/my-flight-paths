<script lang="ts">
	import { getContext } from 'svelte';
	import { type PlantContext, plantContextKey } from '$lib/contexts/planetContext';
	import PointerInteractions from '$lib/sceneGraph/components/PointerInteractions.svelte';
	import type { AircraftPosition } from '$lib/states/aircraftsState';
	import Cone from '../sceneGraph/components/cone.svelte';
	import SphericalTransform from './sphericalTransform.svelte';

	export let aircraftPosition: AircraftPosition;
	export let isSelected: boolean = false;

	const plantContext = getContext<PlantContext>(plantContextKey);
	let radiusOfPlanet = plantContext.radius;

	$: onPlantRadiusChanged(plantContext.radius);

	const onPlantRadiusChanged = (radius: number) => (radiusOfPlanet = radius);

	const onClick = () => {
		console.log('Aircraft Clicked!!!:', aircraftPosition);
	};

	const onOver = () => {
		console.log('Aircraft Over', aircraftPosition);
	};
</script>

<PointerInteractions on:click={onClick} on:over={onOver}>
	<SphericalTransform
		position={aircraftPosition.currentPosition}
		bearing={aircraftPosition.aircraft.bearing}
		radius={aircraftPosition.aircraft.altitude + radiusOfPlanet}
	>
		<Cone radius={200000} height={600000} colour={isSelected ? 0xff0000 : 0xffff00}>
			<slot />
		</Cone>
	</SphericalTransform>
</PointerInteractions>
