<script lang="ts">
	import type { LatLng } from '$lib/models/aircraft';
	import Group from '$lib/sceneGraph/components/group.svelte';
	import PerspectiveCamera from '$lib/sceneGraph/components/perspectiveCamera.svelte';
	import { toRadians } from '$lib/utils/maths';

	export let zoom: number = 1;
	export let lookAt: LatLng = { lat: 0, lng: 0 };
</script>

<Group rotation={{ x: 0, y: toRadians(lookAt.lng), z: 0 }}>
	<Group rotation={{ x: toRadians(lookAt.lat), y: 0, z: 0 }}>
		<PerspectiveCamera
			position={{ x: 0, y: 0, z: zoom * 19113000 }}
			near={10000000}
			far={30000000}
		/>
	</Group>
</Group>
