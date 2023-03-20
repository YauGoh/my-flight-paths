<script lang="ts">
	import { getContext, onDestroy, setContext } from 'svelte';
	import * as THREE from 'three';
	import { ParentContext, parentContextkey } from '../contexts/parentContext';

	export let colour: string | number = 0xffffff;
	export let intensity: number = 0.5;

	const ambient = new THREE.AmbientLight(colour, intensity);

	const parentContext = getContext<ParentContext>(parentContextkey);
	parentContext.add(ambient);

	// Set new parent context for child elements
	setContext(parentContextkey, new ParentContext(ambient));

	$: {
		ambient.color.set(colour);
		ambient.intensity = intensity;
	}

	onDestroy(() => parentContext?.remove(ambient));
</script>

<slot />
