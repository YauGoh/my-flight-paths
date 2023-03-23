export const toRadians = (degrees: number) => {
    return degrees * Math.PI / 180.0;
}

export const toDegrees = (radians: number) => {
    return radians * 180.0 / Math.PI;
}

export const getArcAngle = (radius: number, distance: number) => {
    return distance / radius;
}
