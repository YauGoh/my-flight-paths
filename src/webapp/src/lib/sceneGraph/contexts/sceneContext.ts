import * as THREE from 'three';
import { PointerInteractable } from '../models/pointerInteractableObject';
import type { Size2d } from '../models/size';

export const key: string = 'SceneContext';

type onSizeChanged = (size: Size2d) => void;

export class SceneContext {
	_onSizeChanges: onSizeChanged[];
	_camera: THREE.Camera | undefined;
	_size: Size2d = { width: 1, height: 1 };
	_raycaster : THREE.Raycaster;
	_intersections: THREE.Intersection[];

	_hovered: PointerInteractable[];

	constructor(public readonly scene: THREE.Scene) {
		this._raycaster = new THREE.Raycaster();
		this._intersections = [];
		this._hovered = [];

		this._onSizeChanges = [];
	}

	public get camera(): THREE.Camera {
		if (!this._camera) throw new Error('Camera has not been initialized');

		return this._camera;
	}

	public set camera(value: THREE.Camera) {
		this._camera = value;

		this.changeSize(this._size);
	}

	public get hasCamera(): boolean {
		return !!this._camera;
	}

	public changeSize(size: Size2d) {
		this._size = size;

		this._onSizeChanges.forEach((callBack) => callBack(size));
	}

	public onPointerMove(pointerEvent: PointerEvent) {
		if (!this._camera) return;

		const pointer: THREE.Vector2 = new THREE.Vector2();
		pointer.set((pointerEvent.clientX / this._size.width) * 2 - 1, -(pointerEvent.clientY / this._size.height) * 2 + 1);
		this._raycaster.setFromCamera(pointer, this._camera);

		this._intersections = this._raycaster.intersectObjects(this.scene.children, true);


		let updatedHovered: PointerInteractable[] = []

		this._intersections.forEach(intersect => {

			const pointerInteractable = SceneContext.getPointerInteractable(intersect.object);

			if (!pointerInteractable) return;

			pointerInteractable.invoke("over", pointerEvent);

			updatedHovered.push(pointerInteractable);
		});

		this._hovered
			.filter(existing => updatedHovered
				.every(updated => updated.id !== existing.id))
			.forEach(old => old.invoke('leave', pointerEvent));

		this._hovered = updatedHovered;
	}

	public onPointerClicked(pointerEvent: PointerEvent) {
		if (!this._camera) return;

		this._intersections.forEach(intersect => {

			const pointerInteractable = SceneContext.getPointerInteractable(intersect.object);

			if (!pointerInteractable) return;

			pointerInteractable.invoke("click", pointerEvent);
		});
	}

	public subscribeToSizeChange(callBack: onSizeChanged) {
		this._onSizeChanges = [...this._onSizeChanges, callBack];
	}

	public unsubscribeToSizeChange(callBack: onSizeChanged) {
		this._onSizeChanges = this._onSizeChanges.filter((cb) => cb !== callBack);
	}

	private static getPointerInteractable(obj: THREE.Object3D | null) : PointerInteractable | null {
		if (!obj) return null;

		if (obj instanceof PointerInteractable)
			return obj;

		return SceneContext.getPointerInteractable(obj.parent);
	}
}
