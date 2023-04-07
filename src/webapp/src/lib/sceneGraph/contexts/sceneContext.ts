import * as THREE from 'three';
import { PointerInteractable } from '../models/pointerInteractableObject';
import type { Size2d } from '../models/size';

export const key: string = 'SceneContext';

type onSizeChanged = (size: Size2d) => void;

type IndexedInteractable = {
	[key: string]: PointerInteractable
};

export class SceneContext {
	_canvas: HTMLElement | undefined;
	_onSizeChanges: onSizeChanged[];
	_camera: THREE.Camera | undefined;
	_size: Size2d = { width: 1, height: 1 };
	_raycaster : THREE.Raycaster;
	_intersections: THREE.Intersection[];

	_hovered: IndexedInteractable;

	constructor(public readonly scene: THREE.Scene) {
		this._raycaster = new THREE.Raycaster();
		this._intersections = [];
		this._hovered = {};

		this._onSizeChanges = [];
	}

	public setCanvas(canvas: HTMLElement) {
		this._canvas = canvas;
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

		if (!this._canvas) return;

		const canvasViewPortRect = this._canvas.getBoundingClientRect();

		const pointerCanvas = {
			x: pointerEvent.clientX - canvasViewPortRect.x,
			y: pointerEvent.clientY - canvasViewPortRect.y
		};

		const pointer: THREE.Vector2 = new THREE.Vector2();
		pointer.set( (pointerCanvas.x / this._size.width) * 2 - 1, 
					-(pointerCanvas.y / this._size.height) * 2 + 1);
		this._raycaster.setFromCamera(pointer, this._camera);

		this._intersections = this._raycaster.intersectObjects(this.scene.children, true);

		const lastKeys = Object.keys(this._hovered);
		const lastHovered = { ... this._hovered };
		this._hovered = {};

		this._intersections.forEach(intersect => {

			const pointerInteractable = SceneContext.getPointerInteractable(intersect.object);

			if (!pointerInteractable) return;

			if (!lastKeys.includes(pointerInteractable.uuid))
			{
				pointerInteractable.invoke("over", pointerEvent);
			}

			this._hovered[pointerInteractable.uuid] = pointerInteractable;
		});

		lastKeys.forEach(key => {
			if (!this._hovered[key]) lastHovered[key].invoke("leave", pointerEvent);
		});
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
