<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy, setContext } from 'svelte';
	import { ParentContext, parentContextkey } from '../contexts/parentContext';
	import { PointerInteractableObject } from '../models/pointerInteractableObject';

	const dispatchEvent = createEventDispatcher();

	const pointerInteractable = new PointerInteractableObject();

	pointerInteractable.on('click', (e) => dispatchEvent('click', e));
	pointerInteractable.on('leave', (e) => dispatchEvent('leave', e));
	pointerInteractable.on('over', (e) => dispatchEvent('over', e));

	const parentContext = getContext<ParentContext>(parentContextkey);
	parentContext.parent.add(pointerInteractable);

	setContext<ParentContext>(parentContextkey, new ParentContext(pointerInteractable));

	onDestroy(() => parentContext?.remove(pointerInteractable));
</script>

<slot />
