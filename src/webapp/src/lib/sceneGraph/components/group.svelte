<script lang="ts">
	import { getContext, onDestroy, setContext } from 'svelte';
	import * as THREE from 'three';
	import { ParentContext, parentContextkey } from '../contexts/parentContext';
	import { defaultSize3d, type Size3d } from '../models/size';
	import { defaultVector3d, type Vector3d } from '../models/vector';

	export let rotation: Vector3d = defaultVector3d();
	export let translation: Size3d = defaultSize3d();

	const group = new THREE.Group();
	group.rotateX(rotation.x);
	group.rotateY(rotation.y);
	group.rotateZ(rotation.z);

	group.translateX(translation.width);
	group.translateY(translation.height);
	group.translateZ(translation.depth);

	const parentContext = getContext<ParentContext>(parentContextkey);
	parentContext.parent.add(group);

	setContext(parentContextkey, new ParentContext(group));

	onDestroy(() => parentContext?.remove(group));

	$: {
		// Reset transform to nothing (identity matrix)
		group.matrix.identity();

		// reapply transformations in order
		group.rotateX(rotation.x);
		group.rotateY(rotation.y);
		group.rotateZ(rotation.z);

		group.translateX(translation.width);
		group.translateY(translation.height);
		group.translateZ(translation.depth);
	}
</script>

<slot />
