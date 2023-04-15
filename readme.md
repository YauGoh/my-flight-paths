A simple Svelte wrapper on the popular [Three.js 3D Javascript Library](https://threejs.org/).

My hack-a-thon idea hopes to demonstrate a declarative approach to building a 3D scene using Svelte bindings to manipulate the objects and transformations of the scene. The simple scene consists of a sphere to represent our planet Earth; and transformations and cones to represent aircrafts and their current flight paths.

The lib\sceneGraph folder contains the simple Svelte wrapper against the Three.js 3D Javascript library. We start with the Scene context and we add Transformations (Groups); Shapes; Lights and Cameras elements as nested elements to our Scene. We can also build higher level components by composition and add those components to our Scene, see aircraftElement.svelte; planetElement.svelte and sphericalTransformation.svelte in the lib\copmonents folder.

Each aircraft flight path is obtained using a mocked response from the [OpenSky Network](https://opensky-network.org/). For more details checkout Matthias Schäfer, Martin Strohmeier, Vincent Lenders, Ivan Martinovic and Matthias Wilhelm: "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research". In Proceedings of the 13th IEEE/ACM International Symposium on Information Processing in Sensor Networks (IPSN), pages 83-94, April 2014. The response from the Opensky Api gives use useful information we can use to animate the movement of all returned aircrafts, including their starting position, altitude, direction they are facing, and speed they are travelling.

The aircraft state is stored using Svelte's writeable stores. The javascript api call requestAnimationFrame is used to update the position of each aircraft in the store. We bind the aircraft position element's properties in our 3d scene graph to animate them.

Each scene graph element also responds to pointer events, ie. Hovering over an Aircraft will change it's colour, clicking on an Aircraft will select the airacrft and display some details about the aircraft. If will also trigger the camera to start tracking the aircraft.
