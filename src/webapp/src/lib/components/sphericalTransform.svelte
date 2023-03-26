<script lang="ts">
	import type { LatLng } from '$lib/models/aircraft';
	import Group from '$lib/sceneGraph/components/group.svelte';
	import { toRadians } from '$lib/utils/maths';

	export let position: LatLng;
	export let radius: number;
	export let bearing: number;
</script>

<Group rotation={{ x: 0, y: -1 * toRadians(position.lng), z: 0 }}>
	<Group rotation={{ x: -1 * toRadians(position.lat), y: 0, z: 0 }}>
		<Group
			translation={{
				width: 0,
				height: 0,
				depth: radius
			}}
		>
			<Group rotation={{ x: 0, y: 0, z: toRadians(bearing) }}>
				<slot />
			</Group>
		</Group>
	</Group>
</Group>
