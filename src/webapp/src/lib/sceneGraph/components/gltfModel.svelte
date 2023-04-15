<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import type * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
	import { ParentContext, parentContextkey } from '../contexts/parentContext';
	import type { GltfFile } from '../models/gltfFile';

	export let file: GltfFile;

	const parentContext = getContext<ParentContext>(parentContextkey);

	let scene: THREE.Group | undefined = undefined;

	const loader = new GLTFLoader();

	const loadFile = (file: GltfFile) => {
		loader.load(
			file.path,
			(gltf) => {
				if (scene) parentContext.remove(scene);

				scene = gltf.scene;
				parentContext.add(scene);
			},
			undefined,
			(error) => console.error(error)
		);
	};

	$: loadFile(file);

	onDestroy(() => {
		if (scene) parentContext.remove(scene);
	});
</script>

<slot />
