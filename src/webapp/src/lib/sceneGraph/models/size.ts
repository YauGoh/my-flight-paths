export interface Size2d {
    width: number;
    height: number;
}

export interface Size3d {
    width: number;
    height: number;
    depth: number;
}

export const defaultSize3d = (): Size3d => ({
    width: 0, height: 0, depth: 0
});