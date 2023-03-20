import * as THREE from "three";

export interface LatLng { lat: number, lng: number };

export interface Aircraft {
    start: LatLng;
    
    bearing: number;
    altitude: number;

    velocity: number;
    distanceTraveled: number;   
}