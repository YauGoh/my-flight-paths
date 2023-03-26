import type { LatLng } from "$lib/models/aircraft";

export const toRadians = (degrees: number) => {
    if (degrees < -180) {
        degrees = 180 - (-180 - degrees);
    }

    if (degrees > 180) {
        degrees = -180 + (degrees - 180);
    }

    return degrees * Math.PI / 180.0;
}

export const toDegrees = (radians: number) => {
    if (radians < -Math.PI) {
        radians = Math.PI - (-Math.PI - radians);
    }

    if (radians > Math.PI) {
        radians = -Math.PI + (radians - Math.PI);
    }

    return radians * 180.0 / Math.PI;
}

export const getArcAngle = (radius: number, distance: number) => {
    return distance / radius;
}

export const getNewLatLng = (time: number, radius: number, velocity: number, bearing: number, start: LatLng): LatLng => 
{
    const distance = velocity * time;
            
    const bearingRadius = toRadians(bearing);

    const lat1 = toRadians(start.lat);
    const lng1 = toRadians(start.lng);

    const newlat = Math.asin( 
          (Math.sin(lat1) * Math.cos(distance/radius)) 
        + (Math.cos(lat1) * Math.sin(distance/radius) * Math.cos(bearingRadius)));

    const newlng = 
          lng1 
        + Math.atan2(
            Math.sin(bearingRadius) * Math.sin(distance/radius) * Math.cos(lat1), 
            Math.cos(distance/radius) - Math.sin(lat1) * Math.sin(newlat));

    return { lat: toDegrees(newlat), lng: toDegrees(newlng) };
}