import type * as THREE from "three";

export class ParentContext {
    constructor(public parent: THREE.Object3D) {        
    }

    public remove(child: THREE.Object3D) {
        this.parent.remove(child);
    }

    public add(child: THREE.Object3D) {
        this.parent.add(child);
    }
}

export const parentContextkey: string = "ParentContext";
