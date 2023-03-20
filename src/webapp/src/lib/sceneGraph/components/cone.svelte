<script lang="ts">
	import { getContext, onDestroy, setContext } from 'svelte';
	import * as THREE from 'three';
	import { ParentContext, parentContextkey } from '../contexts/parentContext';

	export let radius: number = 0.0125;
	export let height: number = 0.05;
	export let segments: number = 3;

	export let colour: number | string = 0xffff00;

	const geometry = new THREE.ConeGeometry(radius, height, segments);
	const material = new THREE.MeshStandardMaterial({ color: colour });
	const cone = new THREE.Mesh(geometry, material);

	const parentContext = getContext<ParentContext>(parentContextkey);
	parentContext.add(cone);

	setContext(parentContextkey, new ParentContext(cone));

	onDestroy(() => parentContext?.remove(cone));
</script>

<slot />
