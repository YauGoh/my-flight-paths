<script lang="ts">
	import type { LatLng } from '$lib/models/aircraft';
	import PerspectiveCamera from '$lib/sceneGraph/components/perspectiveCamera.svelte';
	import SphericalTransform from './sphericalTransform.svelte';

	export let zoom: number = 1;
	export let lookAt: LatLng = { lat: 0, lng: 0 };
</script>

<SphericalTransform position={lookAt} bearing={0} radius={19113000}>
	<PerspectiveCamera near={10000000} far={30000000} />
</SphericalTransform>
