<script lang="ts">
	import HelloWorld from '$lib/components/helloWorld.svelte';
	import SearchAircraft from '$lib/components/searchAircraft.svelte';
	import SheetContainer from '$lib/components/sheetContainer.svelte';
	import { showSheet } from '$lib/states/sheetState';
	import '../styles/styles.scss';
</script>

<div class="layout">
	<h1>My Flight Tracker</h1>
	<p>
		A simple Svelte wrapper on the popular
		<a href="https://threejs.org/">Three.js 3D Javascript library</a>.
	</p>
	<p>
		My hack-a-thon idea hopes to demonstrate a declarative approach to building a 3D scene using
		Svelte bindings to manipulate the objects and transformations of the scene. The simple scene
		consists of a sphere to represent the Planet Earth; and transformations and cones to represent
		aircrafts and their flight current flight paths.
	</p>
	<p>
		The lib\sceneGraph folder contains the simple Svelte wrapper against the Three.js 3D Javascript
		library. We start with the Scene context and we add Transformations (Groups); Shapes; Lights and
		Cameras elements as nested elements to our Scene. We can also build higher level components by
		composition and add those components to our Scene, see aircraftElement.svelte;
		planetElement.svelte and sphericalTransformation.svelte in the lib\copmonents folder.
	</p>
	<p>
		Each aircraft flight path is obtained using a mocked response from the <a
			href="https://opensky-network.org">OpenSky Network.</a
		> For more details checkout Matthias Schäfer, Martin Strohmeier, Vincent Lenders, Ivan Martinovic
		and Matthias Wilhelm: "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research". In
		Proceedings of the 13th IEEE/ACM International Symposium on Information Processing in Sensor Networks
		(IPSN), pages 83-94, April 2014. The response from the Opensky Api gives use useful information we
		can use to animate the movement of all returned aircrafts, including their starting position, altitude,
		direction they are facing, and speed they are travelling.
	</p>
	<p>
		The aircraft state is stored using Svelte's writeable stores. The javascript api call
		requestAnimationFrame is used to update the position of each aircraft in the store. We bind the
		aircraft position element's properties in our 3d scene graph to animate them.
	</p>
	<p>
		Each scene graph element also responds to pointer events, ie. Hovering over an Aircraft will
		change it's colour, clicking on an Aircraft will select the airacrft and display some details
		about the aircraft. If will also trigger the camera to start tracking the aircraft.
	</p>
	<div class="layout__body">
		<slot />
	</div>
	<div class="layout__footer">Somthing</div>
	<SheetContainer />
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		height: 100%;

		&__body {
			flex: 1;

			display: flex;
			flex-direction: column;
			position: relative;
		}
	}
</style>
