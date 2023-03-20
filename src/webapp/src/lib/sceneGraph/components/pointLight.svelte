<script lang="ts">
	import { getContext, onDestroy, setContext } from 'svelte';
	import * as THREE from 'three';
	import { ParentContext, parentContextkey } from '../contexts/parentContext';
	import type { Vector3d } from '../models/vector';

	export let colour: number | string = 0xffffff;
	export let intensity: number = 3;
	export let position: Vector3d = { x: 5, y: 5, z: 5 };
	export let castShadow: boolean = true;

	const pointLight = new THREE.PointLight(colour, intensity);

	const parentContext = getContext<ParentContext>(parentContextkey);
	parentContext.add(pointLight);

	setContext(parentContextkey, new ParentContext(pointLight));

	$: {
		pointLight.color.set(colour);
		pointLight.intensity = intensity;

		pointLight.position.set(position.x, position.y, position.z);
		pointLight.castShadow = castShadow;
	}

	onDestroy(() => {
		parentContext?.remove(pointLight);

		console.log('>>>>>>>>>>>>>>>>>>>> REMOVED', pointLight);
	});
</script>

<slot />
