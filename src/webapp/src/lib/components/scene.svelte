<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let canvas: HTMLCanvasElement;

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let geometry: THREE.BoxGeometry;
	let material: THREE.MeshBasicMaterial;
	let cube: THREE.Mesh;
	let renderer: THREE.WebGLRenderer;
	let group: THREE.Group;

	onMount(() => {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
		geometry = new THREE.BoxGeometry();
		material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		cube = new THREE.Mesh(geometry, material);

		scene.add(cube);
		camera.position.setZ(5);

		renderer = new THREE.WebGLRenderer({ antialias: false, canvas });

		onResize();
		animate();
	});

	const animate = () => {
		requestAnimationFrame(animate);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render(scene, camera);
	};

	const onResize = () => {
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	};
</script>

<canvas class="scene" bind:this={canvas} on:resize={onResize} />

<style lang="scss">
	.scene {
		width: 100%;
		height: 100%;
	}
</style>
