<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { parentContextkey, type ParentContext } from '../contexts/parentContext';

	export let radius: number = 1.0;
	export let colour: string | number = 0x0099ff;

	const geometry = new THREE.SphereGeometry(radius);
	const material = new THREE.MeshStandardMaterial({ color: colour });
	const mesh = new THREE.Mesh(geometry, material);

	const parentContext = getContext<ParentContext>(parentContextkey);
	parentContext.parent.add(mesh);

	onDestroy(() => parentContext?.remove(mesh));
</script>

<slot />
