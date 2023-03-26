<script lang="ts">
	import { getContext } from 'svelte';
	import type * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	import { ParentContext, parentContextkey } from '../contexts/parentContext';
	import type { GltfFile } from '../models/gltfFile';

	export let file: GltfFile;

	const parentContext = getContext<ParentContext>(parentContextkey);

	let scene: THREE.Group;

	const loader = new GLTFLoader();
	loader.load(
		file.path,
		(gltf) => {
			scene = gltf.scene;
			parentContext.add(scene);
		},
		undefined,
		(error) => console.error(error)
	);
</script>

<slot />
