import type * as THREE from 'three';
import type { Size2d } from '../models/size';

export const key: string = 'SceneContext';

type onSizeChanged = (size: Size2d) => void;

export class SceneContext {
	_onSizeChanges: onSizeChanged[];
	_camera: THREE.Camera | undefined;
	_size: Size2d = { width: 1, height: 1 };

	constructor(public readonly scene: THREE.Scene) {
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

	public subscribeToSizeChange(callBack: onSizeChanged) {
		this._onSizeChanges = [...this._onSizeChanges, callBack];
	}

	public unsubscribeToSizeChange(callBack: onSizeChanged) {
		this._onSizeChanges = this._onSizeChanges.filter((cb) => cb !== callBack);
	}
}
