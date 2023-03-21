<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount, setContext } from 'svelte';
	import * as THREE from 'three';
	import { key, SceneContext } from '$lib/sceneGraph/contexts/sceneContext';
	import { ParentContext, parentContextkey } from '../contexts/parentContext';

	let animationRequestId: number = 0;
	let container: HTMLElement;
	let canvas: HTMLCanvasElement;

	const dispatchEvent = createEventDispatcher();

	const scene: THREE.Scene = new THREE.Scene();
	const sceneContext = new SceneContext(scene);
	setContext<SceneContext>(key, sceneContext);
	setContext<ParentContext>(parentContextkey, new ParentContext(scene));

	let renderer: THREE.WebGLRenderer;
	let resizeObserver: ResizeObserver;

	onMount(() => {
		renderer = new THREE.WebGLRenderer({ antialias: false, canvas });

		onResize();
		animationRequestId = requestAnimationFrame(animate);

		resizeObserver = new ResizeObserver(onResize);
		resizeObserver.observe(container);
	});

	const animate = (timeStamp: number) => {
		animationRequestId = requestAnimationFrame(animate);

		dispatchEvent('animate', timeStamp);

		if (sceneContext.hasCamera) renderer.render(scene, sceneContext.camera);
	};

	const onResize = () => {
		if (!container) return;

		renderer.setSize(container.clientWidth, container.clientHeight);
		sceneContext.changeSize({ width: container.clientWidth, height: container.clientHeight });
	};

	onDestroy(() => {
		if (animationRequestId) cancelAnimationFrame(animationRequestId);
	});
</script>

<div bind:this={container} class="scene">
	<canvas class="scene__canvas" bind:this={canvas} />
	<slot />
</div>

<style lang="scss">
	.scene {
		flex: 1;
		display: flex;
		flex-direction: column;

		&__canvas {
			flex: 1;
		}
	}
</style>
