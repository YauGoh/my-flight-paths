import * as THREE from "three";

export type ObjectEvent = "click" | "over" | "leave";

export interface ObjectPointerEvent {
    pointerEvent: PointerEvent;
    object: PointerInteractable;
}

export type ObjectEventHandler = (event: ObjectPointerEvent) => void;

type ObjectEvents = {
    [key: string]: ObjectEventHandler[];
}

export abstract class PointerInteractable extends THREE.Object3D {
    constructor() {
        super();
        
    }
    abstract invoke(event: ObjectEvent, pointerEvent: PointerEvent): void;
} 

export class PointerInteractableObject extends PointerInteractable {

    private objectEvents: ObjectEvents = {};
    
    constructor() {
        super();   
    }

    public on(event: ObjectEvent, handler: ObjectEventHandler) {
        if (!this.objectEvents[event]) this.objectEvents[event] = [];

        this.objectEvents[event] = [...  this.objectEvents[event], handler];    
    }

    public invoke(event: ObjectEvent, pointerEvent: PointerEvent) {
        if (!this.objectEvents[event]) return;

        this.objectEvents[event].forEach(handler => handler(
            {
                pointerEvent,
                object: this
            }
        ));
    }
}