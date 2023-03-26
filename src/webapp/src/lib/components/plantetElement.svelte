<script lang="ts">
	import { setContext } from 'svelte';
	import { type PlantContext, plantContextKey } from '$lib/contexts/planetContext';
	import Sphere from '$lib/sceneGraph/components/sphere.svelte';

	export let radius: number;

	setContext<PlantContext>(plantContextKey, { radius });

	$: setContext<PlantContext>(plantContextKey, { radius });
</script>

<Sphere {radius} />
<slot />
