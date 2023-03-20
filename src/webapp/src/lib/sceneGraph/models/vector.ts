export interface Vector3d {
	x: number;
	y: number;
	z: number;
}

export const defaultVector3d = (): Vector3d => ({
	x: 0,
	y: 0,
	z: 0
});
