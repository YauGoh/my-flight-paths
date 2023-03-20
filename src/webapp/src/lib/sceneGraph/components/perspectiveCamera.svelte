<script lang="ts">
	import { key, SceneContext } from '$lib/sceneGraph/contexts/sceneContext';
	import { getContext } from 'svelte';
	import * as THREE from 'three';
	import type { Size2d } from '../models/size';
	import type { Vector3d } from '../models/vector';

	const sceneContext = getContext<SceneContext>(key);

	export let fieldOfView: number = 75;

	export let near: number = 0.1;
	export let far: number = 1000;
	export let position: Vector3d = { x: 0, y: 0, z: 3 };

	let viewPortSize: Size2d = { width: 1, height: 1 };

	const onSizeChanged = (size: Size2d) => {
		viewPortSize = size;
	};

	const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
		fieldOfView,
		viewPortSize.width / viewPortSize.height,
		near,
		far
	);
	camera.position.set(position.x, position.y, position.z);

	sceneContext.camera = camera;
	sceneContext.subscribeToSizeChange(onSizeChanged);

	$: {
		camera.fov = fieldOfView;
		camera.aspect = viewPortSize.width / viewPortSize.height;
		camera.near = near;
		camera.far = far;
		camera.position.set(position.x, position.y, position.z);

		camera.updateProjectionMatrix();
	}
</script>

<slot />
