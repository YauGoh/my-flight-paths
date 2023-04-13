<script lang="ts">
	import { getContext } from 'svelte';
	import { type PlantContext, plantContextKey } from '$lib/contexts/planetContext';
	import PointerInteractions from '$lib/sceneGraph/components/PointerInteractions.svelte';
	import { selectAircraft, type AircraftPosition } from '$lib/states/aircraftsState';
	import Cone from '../sceneGraph/components/cone.svelte';
	import SphericalTransform from './sphericalTransform.svelte';

	export let aircraftPosition: AircraftPosition;
	export let isSelected: boolean = false;
	export let isHovered: boolean = false;

	const plantContext = getContext<PlantContext>(plantContextKey);
	let radiusOfPlanet = plantContext.radius;

	$: onPlantRadiusChanged(plantContext.radius);

	const onPlantRadiusChanged = (radius: number) => (radiusOfPlanet = radius);

	const onClick = () => {
		selectAircraft(aircraftPosition);
	};

	const onOver = () => {
		console.log('Aircraft Over', aircraftPosition);
		isHovered = true;
	};

	const onLeave = () => {
		console.log('Aircraft Left', aircraftPosition);
		isHovered = false;
	};
</script>

<PointerInteractions on:click={onClick} on:over={onOver} on:leave={onLeave}>
	<SphericalTransform
		position={aircraftPosition.currentPosition}
		bearing={aircraftPosition.aircraft.bearing}
		radius={aircraftPosition.aircraft.altitude + radiusOfPlanet}
	>
		<Cone
			radius={400000}
			height={1200000}
			colour={isHovered ? 0x0000ff : isSelected ? 0xff0000 : 0xffff00}
		>
			<slot />
		</Cone>
	</SphericalTransform>
</PointerInteractions>
