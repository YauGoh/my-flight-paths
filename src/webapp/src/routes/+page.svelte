<script lang="ts">
	import Scene from '$lib/sceneGraph/components/scene.svelte';
	import PerspectiveCamera from '$lib/sceneGraph/components/perspectiveCamera.svelte';
	import PointLight from '$lib/sceneGraph/components/pointLight.svelte';
	import AmbientLight from '$lib/sceneGraph/components/ambientLight.svelte';

	import type { Aircraft } from '$lib/models/aircraft';
	import Aircraft3dElement from '$lib/components/aircraftElement.svelte';
	import PlantetElement from '$lib/components/plantetElement.svelte';

	import { earthRadius } from '$lib/models/earth';

	const aircraft: Aircraft = {
		altitude: 0,
		bearing: 0,
		distanceTraveled: 0,
		start: { lat: 0, lng: 0 },
		velocity: 0
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Scene>
	<!-- Set up lights -->
	<PointLight position={{ x: 30000000, y: 30000000, z: 30000000 }} />
	<AmbientLight />

	<PerspectiveCamera position={{ x: 0, y: 0, z: 19113000 }} near={0.1} far={30000000} />

	<PlantetElement radius={earthRadius}>
		<Aircraft3dElement {aircraft} />
	</PlantetElement>
</Scene>
