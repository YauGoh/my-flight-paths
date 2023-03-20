import * as THREE from 'three';

export interface LatLng {
	lat: number;
	lng: number;
}

export interface Aircraft {
    id: string;
    
	start: LatLng;

	bearing: number;
	altitude: number;

	velocity: number;
	distanceTraveled: number;
}
